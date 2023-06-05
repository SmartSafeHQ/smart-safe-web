import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'

import {
  FetchTokenUsdValueResponse,
  fetchTokenUsdValue
} from '@hooks/chains/queries/useTokenUsdValue'
import { queryClient } from '@lib/reactQuery'

interface FetchSafeTokenBalanceInput {
  safeAddress?: string
  symbol?: string
  rpcUrl?: string
}

export interface FetchSafeTokenBalanceOutput {
  balance: number
  usdBalance: number
}

export async function fetchSafeTokenBalance(
  input: FetchSafeTokenBalanceInput
): Promise<FetchSafeTokenBalanceOutput> {
  if (!input.safeAddress || !input.rpcUrl || !input.symbol) {
    throw new Error('safe address and chain required')
  }

  const provider = new ethers.JsonRpcProvider(input.rpcUrl)

  const data = await queryClient.ensureQueryData<FetchTokenUsdValueResponse>({
    queryKey: ['tokenUsdValue', input.symbol],
    queryFn: () => fetchTokenUsdValue({ symbol: input.symbol })
  })

  const balance = await provider.getBalance(input.safeAddress)
  const balanceInTokens = +ethers.formatUnits(balance, 18)

  const usdBalance = balanceInTokens * data.usdValue

  return {
    balance: balanceInTokens,
    usdBalance
  }
}

export function useSafeTokenBalance(
  safeAddress?: string,
  symbol?: string,
  rpcUrl?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['safeTokenBalance', safeAddress, symbol],
    queryFn: () => fetchSafeTokenBalance({ safeAddress, symbol, rpcUrl }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 3, // 3 seconds
    retry: 3,
    retryDelay: 1000 * 3 // 3 seconds
  })
}
