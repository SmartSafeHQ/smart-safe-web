import { useQuery } from '@tanstack/react-query'

export interface FetchCoinsBalanceInUsdResponse {
  balanceTotal?: number
  coinsBalance: {
    coinSymbol: string
    amount: number
    valueInUsd: number
  }[]
}

async function fetchCoinsBalanceInUsd(): Promise<FetchCoinsBalanceInUsdResponse> {
  return { coinsBalance: [] }
}

export function useCoinsBalanceInUsd(enabled = true) {
  return useQuery({
    queryKey: ['coinsBalanceInUsd'],
    queryFn: () => fetchCoinsBalanceInUsd(),
    enabled,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
