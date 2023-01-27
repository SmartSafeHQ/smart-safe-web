import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { getTokenPriceUrl } from '@utils/sendUtils'

interface FetchEndUserUsedTokenResponse {
  id: string
  price: number
}

interface GetTokenPricesResponse {
  USD: number
}

async function fetchEndUserUsedTokens(): Promise<
  FetchEndUserUsedTokenResponse[]
> {
  const getMaticPriceUrl = getTokenPriceUrl('MATIC', 'USD')

  const response = await axios.get<GetTokenPricesResponse>(getMaticPriceUrl)

  return [{ id: 'matic', price: response.data.USD }]
}

export function useEndUserUsedTokens(enabled = true) {
  return useQuery({
    queryKey: ['endUserUsedTokens'],
    queryFn: () => fetchEndUserUsedTokens(),
    enabled,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
