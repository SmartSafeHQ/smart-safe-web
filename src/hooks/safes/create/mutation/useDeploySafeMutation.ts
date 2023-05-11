import { Contract, providers, utils } from 'ethers'
import { useMutation } from '@tanstack/react-query'
import { EIP1193Provider } from '@web3-onboard/core'

import { smartSafeApi } from '@lib/axios'
import { queryClient } from '@lib/reactQuery'
import SMART_SAFE_FACTORY_ABI from '@utils/web3/ABIs/SmartSafeFactory.json'
import { SMART_SAFE_FACTORY_ADDRESS } from '@utils/web3/ABIs/adresses'

export type DeploySafeFunctionInput = {
  provider: EIP1193Provider
  safeName: string
  deployWalletAddress: string
  requiredSignaturesCount: number
  chain: {
    id: string
    name: string
  }
  owners: {
    address: string
    name: string
  }[]
}

interface DeploySafeFunctionOutput {
  safeAddress: string
}

export interface DeploySafeApiResponse {
  id: string
}

async function deploySafeFunction(
  input: DeploySafeFunctionInput
): Promise<DeploySafeFunctionOutput> {
  const provider = new providers.Web3Provider(input.provider, {
    chainId: parseInt(input.chain.id, 16),
    name: input.chain.name
  })

  const signer = provider.getSigner()
  const contract = new Contract(
    SMART_SAFE_FACTORY_ADDRESS,
    SMART_SAFE_FACTORY_ABI,
    signer
  )

  const ownersAdressesList = input.owners.map(owner =>
    utils.getAddress(owner.address)
  )

  const computedAddress = await contract.functions.computeAddress(
    ownersAdressesList,
    input.requiredSignaturesCount
  )
  const deployContractAddress = computedAddress.toString()

  const gasPrice = await provider.getGasPrice()

  await contract.functions.deploySmartSafe(
    ownersAdressesList,
    input.requiredSignaturesCount,
    { gasLimit: 3000000, gasPrice }
  )

  await smartSafeApi.post<DeploySafeApiResponse>('/safe', {
    safeName: input.safeName,
    safeAddress: deployContractAddress,
    safeNetwork: input.chain.id,
    owners: input.owners
  })

  return { safeAddress: deployContractAddress }
}

export function useDeploySafeMutation() {
  return useMutation({
    mutationKey: ['deploySafe'],
    mutationFn: (input: DeploySafeFunctionInput) => deploySafeFunction(input),
    onSuccess: async (data, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['addressSafes', variables.deployWalletAddress]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        ['addressSafes', variables.deployWalletAddress],
        context
      )
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['addressSafes', variables.deployWalletAddress]
      })
    }
  })
}
