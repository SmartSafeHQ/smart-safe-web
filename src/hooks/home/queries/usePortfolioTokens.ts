import { useQuery } from '@tanstack/react-query'

interface TokenProps {
  name: string
  income: number
  price: number
  balance: number
}

interface FetchAppResponse {
  inbound: number
  outbound: number
  total: number
  count: number
  tokens: TokenProps[]
}

async function fetchPortfolioTokens(): Promise<FetchAppResponse> {
  return {
    inbound: 0,
    outbound: 0,
    total: 0,
    count: 0,
    tokens: [
      {
        balance: 10,
        income: 20,
        name: 'BNB',
        price: 30.4
      }
    ]
  }
}

export function usePortfolioTokens() {
  return useQuery({
    queryKey: ['portfolioTokens'],
    queryFn: () => fetchPortfolioTokens(),
    staleTime: 1000 * 60 * 10 // 10 minutes
  })
}
