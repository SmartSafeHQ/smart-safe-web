import { useQuery } from '@tanstack/react-query'

import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'

interface FetchSafeTokensInput {
  safeAddress?: string
  chainId?: string
}

export interface FetchSafeTokensOutput {
  rpcUrl: string
  explorerUrl: string
  symbol: string
  icon: string
}

export async function fetchSafeTokens(
  input: FetchSafeTokensInput
): Promise<FetchSafeTokensOutput[]> {
  if (!input.safeAddress || !input.chainId) {
    throw new Error('safe address and chain id required')
  }

  const safeChain = CHAINS_ATTRIBUTES.find(
    chain => chain.chainId === input.chainId
  )

  if (!safeChain) throw new Error('Chain not supported')

  return [
    {
      symbol: safeChain.symbol,
      rpcUrl: safeChain.rpcUrl,
      explorerUrl: safeChain.explorerUrl,
      icon: safeChain.icon
    }
  ]
}

export function useSafeTokens(
  safeAddress?: string,
  chainId?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['safeTokens', safeAddress],
    queryFn: () => fetchSafeTokens({ safeAddress, chainId }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
