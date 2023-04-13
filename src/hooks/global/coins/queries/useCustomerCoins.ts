import { useQuery } from '@tanstack/react-query'

import {
  COINS_ATTRIBUTES,
  type NetworkSettings
} from '@utils/global/coins/config'
import {
  STABLE_COINS,
  type StableCoinsProps
} from '@utils/global/coins/stableCoinsConfig'
import { MAX_PAGINATION_COINS_PER_PAGE } from '@utils/global/constants/variables'

interface FetchCustomerCoinsInput {
  page: number
  offset: number
}

export interface FetchCustomerCoinsResponse {
  nativeTokens: NetworkSettings[]
  stableCoins: StableCoinsProps[]
  totalCount: number
}

export async function fetchCustomerCoins(
  _data: FetchCustomerCoinsInput
): Promise<FetchCustomerCoinsResponse> {
  return {
    nativeTokens: COINS_ATTRIBUTES,
    stableCoins: STABLE_COINS,
    totalCount: COINS_ATTRIBUTES.length + STABLE_COINS.length
  }
}

export function useCustomerCoins(
  enabled = true,
  page = 1,
  offset = MAX_PAGINATION_COINS_PER_PAGE
) {
  return useQuery({
    queryKey: ['customerCoins', page],
    queryFn: () => fetchCustomerCoins({ page, offset }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
