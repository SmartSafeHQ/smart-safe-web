import { useQuery } from '@tanstack/react-query'

interface FetchSafeTokensInput {
  address?: string
}

interface FetchSafeTokensOutput {
  tokenSymbol: string
  tokenIcon: string
  balance: number
  valueInUsd: number
}

export async function fetchSafeTokens(
  input: FetchSafeTokensInput
): Promise<FetchSafeTokensOutput[]> {
  if (!input.address) {
    throw new Error('wallet address is required')
  }

  return [
    {
      tokenSymbol: 'bnb',
      tokenIcon: '/networks/bnb-logo.svg',
      balance: 0.009,
      valueInUsd: 0.03
    }
  ]
}

export function useSafeTokens(address?: string, enabled = true) {
  return useQuery({
    queryKey: ['safeTokens', address],
    queryFn: () => fetchSafeTokens({ address }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
