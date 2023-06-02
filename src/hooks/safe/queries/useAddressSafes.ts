import { useQuery } from '@tanstack/react-query'

import { smartSafeApi } from '@lib/axios'
import { formatWalletAddress } from '@utils/web3'
import {
  CHAINS_ATTRIBUTES,
  ChainSettings
} from '@utils/web3/chains/supportedChains'

interface FetchAddressSafesInput {
  walletAddress?: string
}

export interface FetchAddressSafesOutput {
  ownerId: string
  ownerName: string
  safeId: string
  safeName: string
  safeAddress: string
  safeFormattedAddress: string
  chain: ChainSettings
}

interface FetchAddressSafesApiResponse {
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
  if (!input.walletAddress) {
    throw new Error('wallet address is required')
  }

  const response = await smartSafeApi.get<FetchAddressSafesApiResponse>(
    `/safe/${input.walletAddress}`
  )

  const formattedSafes = response.data.safes
    .filter(
      owner =>
        owner.safe.network === '0x41' || owner.safe.network === '0xaa36a7'
    )
    .map(owner => {
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

export function useAddressSafes(walletAddress?: string, enabled = true) {
  return useQuery({
    queryKey: ['addressSafes', walletAddress],
    queryFn: () => fetchAddressSafes({ walletAddress }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
