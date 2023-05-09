import { Contract, providers } from 'ethers'
import { useMutation } from '@tanstack/react-query'

import { smartSafeApi } from '@lib/axios'
import SMART_SAFE_FACTORY_ABI from '@utils/web3/ABIs/SmartSafeFactory.json'
import { SMART_SAFE_FACTORY_ADDRESS } from '@utils/web3/ABIs/adresses'

export type DeploySafeFunctionInput = {
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
  if (!window.ethereum) {
    throw new Error('no ethereum on the window')
  }

  const provider = new providers.Web3Provider(window.ethereum, {
    chainId: parseInt(input.chain.id, 16),
    name: input.chain.name
  })

  const signer = provider.getSigner()
  const contract = new Contract(
    SMART_SAFE_FACTORY_ADDRESS,
    SMART_SAFE_FACTORY_ABI,
    signer
  )

  const ownersAdressesList = input.owners.map(owner => owner.address)

  const computedAddress = await contract.functions.computeAddress(
    ownersAdressesList,
    input.requiredSignaturesCount
  )
  const deployContractAddress = computedAddress.toString()

  await contract.functions.deploySmartSafe(
    ownersAdressesList,
    input.requiredSignaturesCount
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
    mutationFn: (input: DeploySafeFunctionInput) => deploySafeFunction(input)
  })
}
