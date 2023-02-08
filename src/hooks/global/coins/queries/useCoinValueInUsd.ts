import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { getCoinPriceUrl } from '@utils/global/coins'

interface FetchCoinValueInUsdInput {
  coinId: string
}

interface FetchCoinValueInUsdResponse {
  valueInUsd: number
}

interface GetCoinPricesResponse {
  USD: number
}

async function fetchCoinValueInUsd({
  coinId
}: FetchCoinValueInUsdInput): Promise<FetchCoinValueInUsdResponse> {
  const reqUrl = getCoinPriceUrl(coinId.toUpperCase(), 'USD')

  const response = await axios.get<GetCoinPricesResponse>(reqUrl)

  return {
    valueInUsd: response.data.USD
  }
}

export function useCoinValueInUsd(coinId: string) {
  return useQuery({
    queryKey: ['coinValueInUsd', coinId],
    queryFn: () => fetchCoinValueInUsd({ coinId }),
    staleTime: 1000 * 60 * 2 // 2 minutes
  })
}
