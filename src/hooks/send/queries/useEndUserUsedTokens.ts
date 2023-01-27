import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { getTokenPriceUrl } from '@utils/sendUtils'

interface FetchEndUserUsedTokenInput {
  feeEthValue: number
}

interface FetchEndUserUsedTokenResponse {
  id: string
  price: number
  feeUsdPrice: number
}

interface GetTokenPricesResponse {
  USD: number
}

async function fetchEndUserUsedTokens({
  feeEthValue
}: FetchEndUserUsedTokenInput): Promise<FetchEndUserUsedTokenResponse[]> {
  const getMaticPriceUrl = getTokenPriceUrl('MATIC', 'USD')
  const getEthPriceUrl = getTokenPriceUrl('ETH', 'USD')

  const [maticPrice, ethPrice] = await Promise.all([
    axios.get<GetTokenPricesResponse>(getMaticPriceUrl),
    axios.get<GetTokenPricesResponse>(getEthPriceUrl)
  ])

  // Convert ETH to USD
  const usdPrice = feeEthValue * ethPrice.data.USD

  return [{ id: 'matic', price: maticPrice.data.USD, feeUsdPrice: usdPrice }]
}

export function useEndUserUsedTokens(enabled = true, feeEthValue = 0) {
  return useQuery({
    queryKey: ['endUserUsedTokens', feeEthValue],
    queryFn: () => fetchEndUserUsedTokens({ feeEthValue }),
    enabled,
    staleTime: 1000 * 60 * 2 // 2 minutes
  })
}
