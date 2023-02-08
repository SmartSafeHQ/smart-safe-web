import { useQuery } from '@tanstack/react-query'

interface TokenProps {
  name: string
  symbol: string
  avatar: string
  change: {
    stockStatus: 'up' | 'down'
    percentage: number
  }
  price: number
  balance: {
    valueInDollar: number
    valueInTokens: number
  }
}

interface FetchPortfolioTokensResponse {
  tokensIncome: string
  tokensOut: string
  tokensNetWorth: string
  count: number
  tokens: TokenProps[]
}

async function fetchPortfolioTokens(): Promise<FetchPortfolioTokensResponse> {
  return {
    tokensIncome: Number(50).toFixed(2),
    tokensOut: Number(20.04).toFixed(2),
    tokensNetWorth: Number(220.64).toFixed(2),
    count: 0,
    tokens: [
      {
        name: 'Binance coin',
        symbol: 'bnb',
        avatar:
          'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/binanceCoin.svg',
        balance: {
          valueInDollar: 110.5,
          valueInTokens: 0.562
        },
        change: {
          stockStatus: 'up',
          percentage: 20
        },
        price: 30.4
      },
      {
        name: 'Ethereum',
        symbol: 'eth',
        avatar:
          'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/ethereum.svg',
        balance: {
          valueInDollar: 15.6,
          valueInTokens: 0.009
        },
        change: {
          stockStatus: 'down',
          percentage: 5
        },
        price: 130.12
      }
    ]
  }
}

export function usePortfolioTokens(enabled = true) {
  return useQuery({
    queryKey: ['portfolioTokens'],
    queryFn: () => fetchPortfolioTokens(),
    enabled,
    staleTime: 1000 * 60 * 10 // 10 minutes
  })
}
