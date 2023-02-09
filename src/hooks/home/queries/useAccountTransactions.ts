import { useQuery } from '@tanstack/react-query'

interface TransactionProps {
  transactionLink: string
  transactedAt: Date
  category: 'debit' | 'credit'
  sender: {
    name: string
    walletAddress: string
  }
  receiver: {
    name: string
    walletAddress: string
  }
  token: {
    symbol: string
    avatar: string
  }
  value: {
    valueInDollar: number
    valueInTokens: number
  }
}

interface FetchAccountTransactionsInput {
  account?: string
}

type FetchAccountTransactionsResponse = TransactionProps[]

async function fetchAccountTransactions({
  account
}: FetchAccountTransactionsInput): Promise<FetchAccountTransactionsResponse> {
  if (!account) {
    throw new Error('account is required')
  }

  return [
    {
      transactedAt: new Date(),
      category: 'credit',
      transactionLink: 'http',
      sender: {
        name: 'Paulo Reis 2',
        walletAddress: '0xFAfF8e4A458EAB9Df7364fd24ab65492aA973A83'
      },
      receiver: {
        name: 'Paulo Reis',
        walletAddress: '0xFAfF8e4A458EAB9Df7364fd24ab65492aA973A83'
      },
      token: {
        symbol: 'bnb',
        avatar:
          'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/binanceCoin.svg'
      },
      value: {
        valueInDollar: 110.5,
        valueInTokens: 0.562
      }
    }
  ]
}

export function useAccountTransactions(account?: string, enabled = true) {
  return useQuery({
    queryKey: ['accountTransactions', account],
    queryFn: () => fetchAccountTransactions({ account }),
    enabled: enabled && !!account,
    staleTime: 1000 * 60 * 4 // 4 minutes
  })
}
