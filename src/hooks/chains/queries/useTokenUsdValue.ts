import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface FetchTokenUsdValueInput {
  symbol?: string
}

export interface FetchTokenUsdValueResponse {
  usdValue: number
}

interface GetTokenPricesResponse {
  price: string
}

export async function fetchTokenUsdValue({
  symbol
}: FetchTokenUsdValueInput): Promise<FetchTokenUsdValueResponse> {
  if (!symbol) {
    throw new Error('Token symbol is required')
  }

  const reqUrl = `https://api.binance.us/api/v3/ticker/price?symbol=${symbol.toUpperCase()}USDT`

  const response = await axios.get<GetTokenPricesResponse>(reqUrl)

  return {
    usdValue: Number(response.data.price)
  }
}

export function useTokenUsdValue(symbol?: string) {
  return useQuery({
    queryKey: ['tokenUsdValue', symbol],
    queryFn: () => fetchTokenUsdValue({ symbol }),
    enabled: !!symbol,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
