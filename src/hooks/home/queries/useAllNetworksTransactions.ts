import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface TransactionCoinProps {
  scanUrl: string
  explorerUrl: string
  symbol: string
  avatar: string
  decimals: number
}

interface TransactionProps {
  transactionLink: string
  transactedAt: Date
  category: 'debit' | 'credit'
  sender: string
  receiver: string
  token: {
    symbol: string
    avatar: string
  }
  value: {
    valueInDollar: number
    valueInTokens: number
  }
}

interface FetchAllNetworksTransactionsInput {
  coins?: TransactionCoinProps[]
  page: number
  offset: number
  account?: string
}

interface GetNetworkTrasactionResponse {
  result: {
    timeStamp: string
    hash: string
    from: string
    to: string
    value: string
  }[]
}

type FetchAllNetworksTransactionsResponse = TransactionProps[]

async function fetchAllNetworksTransactions({
  account,
  coins,
  page,
  offset
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
          page,
          offset,
          sort: 'desc'
        }
      }
    )

    data.result.forEach(tx => {
      formattedTransactions.push({
        transactedAt: new Date(Number(tx.timeStamp) * 1000),
        category:
          tx.from.toLowerCase() === account.toLowerCase() ? 'debit' : 'credit',
        transactionLink: `${coin.explorerUrl}/tx/${tx.hash}`,
        sender: tx.from,
        receiver: tx.to,
        token: {
          symbol: coin.symbol,
          avatar: coin.avatar
        },
        value: {
          valueInDollar: 0.1,
          valueInTokens: Number(tx.value) / Math.pow(10, coin.decimals)
        }
      })
    })
  })

  await Promise.all(transactionsPromise)

  return formattedTransactions
}

export function useAllNetworksTransactions(
  coins?: TransactionCoinProps[],
  account?: string,
  enabled = true,
  page = 1,
  offset = 2
) {
  return useQuery({
    queryKey: ['allNetworksTransactions', account],
    queryFn: () =>
      fetchAllNetworksTransactions({ account, coins, page, offset }),
    enabled: enabled && !!account && !!coins,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
