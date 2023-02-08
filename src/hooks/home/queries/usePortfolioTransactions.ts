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
    type: 'debit' | 'credit'
    valueInDollar: number
    valueInTokens: number
  }
}

interface FetchPortfolioTransactionsResponse {
  transactionsIncome: string
  transactionsOut: string
  transactionsNetWorth: string
  count: number
  transactions: TransactionProps[]
}

async function fetchPortfolioTransactions(): Promise<FetchPortfolioTransactionsResponse> {
  return {
    transactionsIncome: Number(21).toFixed(2),
    transactionsOut: Number(40.04).toFixed(2),
    transactionsNetWorth: Number(420.64).toFixed(2),
    count: 0,
    transactions: [
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
          type: 'credit',
          valueInDollar: 110.5,
          valueInTokens: 0.562
        }
      }
    ]
  }
}

export function usePortfolioTransactions(enabled = true) {
  return useQuery({
    queryKey: ['portfolioTransactions'],
    queryFn: () => fetchPortfolioTransactions(),
    enabled,
    staleTime: 1000 * 60 * 10 // 10 minutes
  })
}
