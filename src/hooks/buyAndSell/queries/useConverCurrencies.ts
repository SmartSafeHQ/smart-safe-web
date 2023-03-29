import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import { getConvertCurrencyUrl } from '@utils/global/coins'

export interface FetchConverCurrenciesInput {
  symbol: string
  tsym: string
}

export interface FetchConverCurrenciesResponse {
  value: number
}

export interface FetchConverCurrenciesAPIResponse {
  [key: string]: string
}

async function fetchConverCurrencies({
  symbol,
  tsym
}: FetchConverCurrenciesInput): Promise<FetchConverCurrenciesResponse> {
  if (symbol === tsym) return { value: 1 }

  const url = getConvertCurrencyUrl(symbol, tsym)

  const response = await axios<FetchConverCurrenciesAPIResponse>(url)

  if (response.data.Response === 'Error') {
    throw Error('invalid inputs')
  }

  const value = Number(response.data[tsym])

  return {
    value
  }
}

export function useConverCurrencies(
  symbol: string,
  tsym = 'BRL',
  enabled = true
) {
  return useQuery({
    queryKey: ['converCurrencies', symbol, tsym],
    queryFn: () => fetchConverCurrencies({ symbol, tsym }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 10 // 1 minutes
  })
}
