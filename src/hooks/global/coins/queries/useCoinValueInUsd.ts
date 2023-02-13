import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { getCoinPriceUrl } from '@utils/global/coins'

interface FetchCoinValueInUsdInput {
  coinSymbol?: string
}

export interface FetchCoinValueInUsdResponse {
  valueInUsd: number
}

interface GetCoinPricesResponse {
  price: string
}

async function fetchCoinValueInUsd({
  coinSymbol
}: FetchCoinValueInUsdInput): Promise<FetchCoinValueInUsdResponse> {
  if (!coinSymbol) {
    throw new Error('coinSymbol is required')
  }

  const reqUrl = getCoinPriceUrl(coinSymbol)

  const response = await axios.get<GetCoinPricesResponse>(reqUrl)

  return {
    valueInUsd: Number(response.data.price)
  }
}

export function useCoinValueInUsd(coinSymbol?: string) {
  return useQuery({
    queryKey: ['coinValueInUsd', coinSymbol],
    queryFn: () => fetchCoinValueInUsd({ coinSymbol }),
    enabled: !!coinSymbol,
    staleTime: 1000 * 60 * 2 // 2 minutes
  })
}
