import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { providers, utils } from 'ethers'
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL
} from '@solana/web3.js'

import { getCoinChangePercentUrl } from '@utils/global/coins'
import { queryClient } from '@lib/reactQuery'
import { FetchCoinValueInUsdResponse } from '@hooks/global/coins/queries/useCoinValueInUsd'
import { FetchCoinsBalanceInUsdResponse } from '@hooks/global/coins/queries/useCoinsBalanceInUsd'

import type { WalletKeypair } from '@utils/global/types'

interface CoinAttributesInput {
  symbol: string
  rpcUrl: string
}

interface CoinProps {
  changePercent: number
  balance: number
}

interface FetchCoinPortfolioInput {
  coin?: CoinAttributesInput
  accounts?: { evm: WalletKeypair; solana: WalletKeypair }
}

export type FetchCoinPortfolioResponse = CoinProps

interface GetCoinChangePercentResponse {
  priceChangePercent: string
}

export async function fetchCoinPortfolio({
  accounts,
  coin
}: FetchCoinPortfolioInput): Promise<FetchCoinPortfolioResponse> {
  if (!accounts?.evm.address || !accounts?.solana.address) {
    return { balance: 0, changePercent: 0 }
  }
  if (!coin) {
    return { balance: 0, changePercent: 0 }
  }

  if (coin.symbol === 'sol') {
    const networkEnv = coin.rpcUrl.includes('test') ? 'testnet' : 'mainnet-beta'

    const client = new Connection(clusterApiUrl(networkEnv))

    const balance = await client.getBalance(
      new PublicKey(accounts.solana.address)
    )

    const reqUrl = getCoinChangePercentUrl(coin.symbol)
    const response = await axios.get<GetCoinChangePercentResponse>(reqUrl)

    const formattedChangePercent = Number(response.data.priceChangePercent)

    return {
      balance: balance / LAMPORTS_PER_SOL,
      changePercent: formattedChangePercent
    }
  }

  const provider = new providers.JsonRpcProvider(coin.rpcUrl)

  const balance = await provider.getBalance(accounts.evm.address)
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
  coin?: CoinAttributesInput,
  accounts?: { evm: WalletKeypair; solana: WalletKeypair },
  enabled = true
) {
  return useQuery({
    queryKey: ['coinPortfolio', accounts, coin?.rpcUrl],
    queryFn: () => fetchCoinPortfolio({ accounts, coin }),
    onSuccess: async data => {
      // onSuccess used to update account balance

      if (!coin) {
        throw new Error('coin is required')
      }

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
    enabled: enabled && !!accounts && !!coin,
    staleTime: 1000 * 60 * 2 // 2 minutes
  })
}
