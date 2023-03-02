import { useQuery } from '@tanstack/react-query'

import { COINS_ATTRIBUTES } from '@utils/global/coins/config'
import { MAX_PAGINATION_COINS_PER_PAGE } from '@utils/global/constants/variables'

interface FetchCustomerCoinsInput {
  account?: string
  page: number
  offset: number
}

export interface FetchCustomerCoinsResponse {
  coins: {
    symbol: string
    network: string
    avatar: string
    chainId: number | null
    decimals: number
    rpcUrl: string
    explorerUrl: string
    scanUrl: string
  }[]
  totalCount: number
}

export async function fetchCustomerCoins({
  page,
  offset
}: FetchCustomerCoinsInput): Promise<FetchCustomerCoinsResponse> {
  const start = (page - 1) * offset
  const end = start + offset

  const paginattedCoins = COINS_ATTRIBUTES.slice(start, end)

  return { coins: paginattedCoins, totalCount: COINS_ATTRIBUTES.length }
}

export function useCustomerCoins(
  account?: string,
  enabled = true,
  page = 1,
  offset = MAX_PAGINATION_COINS_PER_PAGE
) {
  return useQuery({
    queryKey: ['customerCoins', page],
    queryFn: () => fetchCustomerCoins({ page, offset }),
    enabled: enabled && !!account,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
