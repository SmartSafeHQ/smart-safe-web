import { useQuery } from '@tanstack/react-query'

import { smartSafeApi } from '@lib/axios'
import { formatWalletAddress } from '@utils/web3'
import {
  CHAINS_ATTRIBUTES,
  ChainSettings
} from '@utils/web3/chains/supportedChains'

interface FetchAddressSafesInput {
  address?: string
}

interface FetchAddressSafesOutput {
  ownerId: string
  ownerName: string
  safeId: string
  safeName: string
  safeAddress: string
  safeFormattedAddress: string
  chain: ChainSettings
}

export interface FetchAddressSafesApiResponse {
  safes: {
    id: string
    name: string
    address: string
    safeId: string
    safe: {
      id: string
      name: string
      address: string
      network: string
    }
  }[]
}

export async function fetchAddressSafes(
  input: FetchAddressSafesInput
): Promise<FetchAddressSafesOutput[]> {
  if (!input.address) {
    throw new Error('wallet address is required')
  }

  const response = await smartSafeApi.get<FetchAddressSafesApiResponse>(
    `/safe/${input.address}`
  )

  const formattedSafes = response.data.safes.map(owner => {
    const deployedChain = CHAINS_ATTRIBUTES.find(
      chain => owner.safe.network === chain.chainId
    )

    if (!deployedChain) {
      throw new Error(
        `chain id ${owner.safe.network} not found in supported chains`
      )
    }

    return {
      ownerId: owner.id,
      ownerName: owner.name,
      safeId: owner.safe.id,
      safeName: owner.safe.name,
      safeAddress: owner.safe.address,
      safeFormattedAddress: formatWalletAddress({
        walletAddress: owner.safe.address
      }),
      chain: deployedChain
    }
  })

  return formattedSafes
}

export function useAddressSafes(address?: string, enabled = true) {
  return useQuery({
    queryKey: ['addressSafes', address],
    queryFn: () => fetchAddressSafes({ address }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
