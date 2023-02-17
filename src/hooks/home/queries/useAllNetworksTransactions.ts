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

async function fetchAllNetworksTransactions({
  account,
  coins
}: FetchAllNetworksTransactionsInput): Promise<FetchAllNetworksTransactionsResponse> {
  if (!account) {
    throw new Error('account is required')
  }

  if (!coins) {
    throw new Error('coins are required')
  }

  const formattedTransactions: TransactionProps[] = []

  const transactionsPromise = coins.map(async coin => {
    const { data } = await axios.get<GetNetworkTrasactionResponse>(
      coin.scanUrl,
      {
        params: {
          module: 'account',
          action: 'txlist',
          address: account,
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
          tx.from.toLowerCase() === account.toLowerCase() ? 'debit' : 'credit'

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
  account?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['allNetworksTransactions', account],
    queryFn: () => fetchAllNetworksTransactions({ account, coins }),
    enabled: enabled && !!account && !!coins,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
