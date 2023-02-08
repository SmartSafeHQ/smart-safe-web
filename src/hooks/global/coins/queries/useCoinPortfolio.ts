import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { providers, utils } from 'ethers'

import { getCoinChangePercentUrl } from '@utils/global/coins'

interface CoinAttributesInput {
  symbol: string
  rpcUrl: string
}

interface CoinProps {
  changePercent: number
  balance: number
}

interface FetchCoinPortfolioInput {
  coin: CoinAttributesInput
  account?: string
}

type FetchCoinPortfolioResponse = CoinProps

interface GetCoinChangePercentResponse {
  priceChangePercent: string
}

async function fetchCoinPortfolio({
  account,
  coin
}: FetchCoinPortfolioInput): Promise<FetchCoinPortfolioResponse> {
  if (!account) {
    throw new Error('account is required')
  }

  const provider = new providers.JsonRpcProvider(coin.rpcUrl)

  const balance = await provider.getBalance(account)
  const formattedBalance = utils.formatEther(balance)

  const reqUrl = getCoinChangePercentUrl(coin.symbol.toUpperCase())
  const response = await axios.get<GetCoinChangePercentResponse>(reqUrl)

  const formattedChangePercent = Number(response.data.priceChangePercent)

  return {
    balance: Number(formattedBalance.slice(0, 6)),
    changePercent: formattedChangePercent
  }
}

export function useCoinPortfolio(
  coin: CoinAttributesInput,
  account?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['coinPortfolio', coin.rpcUrl],
    queryFn: () => fetchCoinPortfolio({ account, coin }),
    enabled: enabled && !!account,
    staleTime: 1000 * 60 * 2 // 2 minutes
  })
}
