import { useQuery } from '@tanstack/react-query'

import { DEFAULT_COINS_ATTRIBUTES } from '@utils/global/coins'
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
    chainId: number
    decimals: number
    rpcUrl: string
    explorerUrl: string
    scanUrl: string
  }[]
  totalCount: number
}

async function fetchCustomerCoins({
  page,
  offset,
  account
}: FetchCustomerCoinsInput): Promise<FetchCustomerCoinsResponse> {
  if (!account) {
    throw new Error('account is required')
  }

  const start = (page - 1) * offset
  const end = start + offset

  const paginattedCoins = DEFAULT_COINS_ATTRIBUTES.slice(start, end)

  return { coins: paginattedCoins, totalCount: DEFAULT_COINS_ATTRIBUTES.length }
}

export function useCustomerCoins(
  account?: string,
  enabled = true,
  page = 1,
  offset = MAX_PAGINATION_COINS_PER_PAGE
) {
  return useQuery({
    queryKey: ['customerCoins', page],
    queryFn: () => fetchCustomerCoins({ account, page, offset }),
    enabled: enabled && !!account,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
