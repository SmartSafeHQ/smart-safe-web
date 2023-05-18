import { useQuery } from '@tanstack/react-query'

import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'

interface FetchSafeTokensInput {
  address?: string
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
  if (!input.address || !input.chainId) {
    throw new Error('wallet address and chain id required')
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
  address?: string,
  chainId?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['safeTokens', address],
    queryFn: () => fetchSafeTokens({ address, chainId }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
