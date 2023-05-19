import { Contract, providers, utils } from 'ethers'
import { useMutation } from '@tanstack/react-query'
import { EIP1193Provider } from '@web3-onboard/core'

import type { TransactionResponse } from '@ethersproject/abstract-provider'

import { queryClient } from '@lib/reactQuery'
import SMART_SAFE_PROXY_FACTORY_ABI from '@utils/web3/ABIs/SmartSafeProxyFactory.json'
import { SMART_SAFE_FACTORY_CHAINS_ADRESSES } from '@utils/web3/ABIs/adresses'

export type DeploySafeFunctionInput = {
  provider: EIP1193Provider
  safeName: string
  deployWalletAddress: string
  requiredSignaturesCount: number
  chain: {
    id: string
    name: string
    symbol: string
  }
  owners: {
    address: string
    name: string
  }[]
}

interface DeploySafeFunctionOutput {
  safeAddress: string
  transaction: TransactionResponse
}

async function deploySafeProxyFunction(
  input: DeploySafeFunctionInput
): Promise<DeploySafeFunctionOutput> {
  const smartSafeProxyFactoryAddress = SMART_SAFE_FACTORY_CHAINS_ADRESSES.get(
    input.chain.symbol
  )

  if (!smartSafeProxyFactoryAddress) throw new Error('Chain not supported')

  const provider = new providers.Web3Provider(input.provider, {
    chainId: parseInt(input.chain.id, 16),
    name: input.chain.name
  })

  const signer = provider.getSigner()
  const contract = new Contract(
    smartSafeProxyFactoryAddress,
    SMART_SAFE_PROXY_FACTORY_ABI,
    signer
  )

  const ownersAdressesList = input.owners.map(owner =>
    utils.getAddress(owner.address)
  )

  const computedAddress = await contract.functions.computeAddress(
    ownersAdressesList[0]
  )

  const deployContractAddress = computedAddress.toString()

  const gasPrice = await provider.getGasPrice()

  const estimatedGas = await contract.estimateGas.deploySmartSafeProxy(
    ownersAdressesList,
    input.requiredSignaturesCount
  )

  const transaction = await contract.functions.deploySmartSafeProxy(
    ownersAdressesList,
    input.requiredSignaturesCount,
    { gasLimit: estimatedGas, gasPrice }
  )

  return { transaction, safeAddress: deployContractAddress }
}

export function useDeploySafeProxyMutation() {
  return useMutation({
    mutationKey: ['deploySafe'],
    mutationFn: (input: DeploySafeFunctionInput) =>
      deploySafeProxyFunction(input),
    onSuccess: async (_, variables) => {
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
