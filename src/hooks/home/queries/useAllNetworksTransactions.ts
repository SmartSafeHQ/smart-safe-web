import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import {
  FetchAllNetworksTransactionsInput,
  FetchAllNetworksTransactionsResponse,
  GetCoinWindowPriceResponse,
  GetNetworkTrasactionResponse,
  TransactionProps,
  TransactionCoinProps
} from '@hooks/home/queries/interfaces'
import {
  getCoinWindowPriceUrl,
  getTransactionTimestampDate,
  getWeiToCoinValue
} from '@utils/global/coins'

import type { WalletKeypair } from '@utils/global/types'

async function fetchAllNetworksTransactions({
  accounts,
  coins
}: FetchAllNetworksTransactionsInput): Promise<FetchAllNetworksTransactionsResponse> {
  if (!accounts?.evm.address || !accounts.solana.address) {
    throw new Error('account is required')
  }

  if (!coins) {
    throw new Error('coins are required')
  }

  const formattedTransactions: TransactionProps[] = []

  const transactionsPromise = coins.map(async coin => {
    if (coin.symbol === 'sol') {
      return
      // const { data } = await axios.get<GetNetworkTrasactionResponse>(
      //   `${coin.scanUrl}account/transactions`,
      //   {
      //     params: {
      //       account: accounts.solana.address,
      //       offset: 10
      //     }
      //   }
      // )

      // console.log({ data })

      // return
    }

    const { data } = await axios.get<GetNetworkTrasactionResponse>(
      coin.scanUrl,
      {
        params: {
          module: 'account',
          action: 'txlist',
          address: accounts.evm.address,
          page: 1,
          offset: 10,
          sort: 'desc'
        }
      }
    )

    const transactionsPromise = data.result.map<Promise<TransactionProps>>(
      async tx => {
        const transactedAt = getTransactionTimestampDate(tx.timeStamp)

        const coinWindowPriceUrl = getCoinWindowPriceUrl(
          coin.symbol,
          transactedAt
        )

        let transactionUsdValue = 0

        if (coinWindowPriceUrl) {
          try {
            const { data } = await axios.get<GetCoinWindowPriceResponse>(
              coinWindowPriceUrl
            )

            transactionUsdValue = data.market_data.current_price.usd
          } catch (error) {
            console.log(error)
          }
        }

        const txCategory =
          tx.from.toLowerCase() === accounts.evm.address.toLowerCase()
            ? 'debit'
            : 'credit'

        return {
          transactedAt,
          category: txCategory,
          transactionLink: `${coin.explorerUrl}/tx/${tx.hash}`,
          sender: tx.from,
          receiver: tx.to,
          token: {
            symbol: coin.symbol,
            avatar: coin.avatar
          },
          value: {
            valueInDollar: Number(transactionUsdValue.toFixed(2)),
            valueInTokens: getWeiToCoinValue(tx.value, coin.decimals)
          }
        }
      }
    )

    const transactions = await Promise.all(transactionsPromise)

    formattedTransactions.push(...transactions)
  })

  await Promise.all(transactionsPromise)

  return {
    transactions: formattedTransactions,
    totalCount: formattedTransactions.length
  }
}

export function useAllNetworksTransactions(
  coins?: TransactionCoinProps[],
  accounts?: { evm: WalletKeypair; solana: WalletKeypair },
  enabled = true
) {
  return useQuery({
    queryKey: ['allNetworksTransactions', accounts],
    queryFn: () => fetchAllNetworksTransactions({ accounts, coins }),
    enabled: enabled && !!accounts && !!coins,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
