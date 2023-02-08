import { useQuery } from '@tanstack/react-query'

import { DEFAULT_COINS_ATTRIBUTES } from '@utils/global/coins'

interface FetchCustomerCoinsInput {
  account?: string
}

type FetchCustomerCoinsResponse = {
  symbol: string
  network: string
  avatar: string
  chainId: number
  decimals: number
  rpcUrl: string
  explorerUrl: string
}[]

async function fetchCustomerCoins(
  account: FetchCustomerCoinsInput
): Promise<FetchCustomerCoinsResponse> {
  if (!account) {
    throw new Error('account is required')
  }

  return DEFAULT_COINS_ATTRIBUTES
}

export function useCustomerCoins(account?: string, enabled = true) {
  return useQuery({
    queryKey: ['customerCoins'],
    queryFn: () => fetchCustomerCoins({ account }),
    enabled: enabled && !!account,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
