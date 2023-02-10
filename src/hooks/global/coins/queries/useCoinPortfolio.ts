import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { providers, utils } from 'ethers'

import { getCoinChangePercentUrl } from '@utils/global/coins'
import { queryClient } from '@lib/reactQuery'
import { FetchCoinValueInUsdResponse } from '@hooks/global/coins/queries/useCoinValueInUsd'
import { FetchCoinsBalanceInUsdResponse } from '@hooks/global/coins/queries/useCoinsBalanceInUsd'

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

export type FetchCoinPortfolioResponse = CoinProps

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

  const reqUrl = getCoinChangePercentUrl(coin.symbol)
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
    onSuccess: async data => {
      // onSuccess used to update account ballance

      const coinValueInUsd =
        await queryClient.ensureQueryData<FetchCoinValueInUsdResponse>({
          queryKey: ['coinValueInUsd', coin.symbol]
        })

      const coinUsdBalance = data.balance * coinValueInUsd.valueInUsd

      const updattedCoin = {
        coinSymbol: coin.symbol,
        amount: data.balance,
        valueInUsd: coinUsdBalance
      }

      queryClient.setQueryData<FetchCoinsBalanceInUsdResponse>(
        ['coinsBalanceInUsd'],
        prevBalance => {
          if (!prevBalance?.balanceTotal) {
            return {
              balanceTotal: coinUsdBalance,
              coinsBalance: [updattedCoin]
            }
          }

          const prevCoinIndex = prevBalance.coinsBalance.findIndex(
            prevCoin => prevCoin.coinSymbol === coin.symbol
          )

          // if coin not listed, add to coins list and balance total
          if (prevCoinIndex === -1) {
            return {
              balanceTotal: prevBalance.balanceTotal + coinUsdBalance,
              coinsBalance: [...prevBalance.coinsBalance, updattedCoin]
            }
          }

          // if coin already exists in the list and its value has been updatted
          // update coin balance amount in the listing
          // update wallet total balance using the updatted coin amount in usd

          const updattedCoins = prevBalance.coinsBalance

          const prevCoinAmountInUsd =
            prevBalance.coinsBalance[prevCoinIndex].valueInUsd

          updattedCoins[prevCoinIndex] = updattedCoin

          const updattedBalanceAmount =
            prevBalance.balanceTotal -
            prevCoinAmountInUsd +
            updattedCoin.valueInUsd

          return {
            balanceTotal: updattedBalanceAmount,
            coinsBalance: updattedCoins
          }
        }
      )
    },
    enabled: enabled && !!account,
    staleTime: 1000 * 60 * 2 // 2 minutes
  })
}
