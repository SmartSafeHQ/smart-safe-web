import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'

import {
  FetchTokenUsdValueResponse,
  fetchTokenUsdValue
} from '@hooks/chains/queries/useTokenUsdValue'
import { queryClient } from '@lib/reactQuery'

interface FetchSafeTokenBalanceInput {
  address?: string
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
  if (!input.address || !input.rpcUrl || !input.symbol) {
    throw new Error('wallet address and chain required')
  }

  const provider = new ethers.JsonRpcProvider(input.rpcUrl)

  const data = await queryClient.ensureQueryData<FetchTokenUsdValueResponse>({
    queryKey: ['tokenUsdValue', input.symbol],
    queryFn: () => fetchTokenUsdValue({ symbol: input.symbol })
  })

  const balance = await provider.getBalance(input.address)
  const balanceInTokens = +ethers.formatUnits(balance, 18)

  const usdBalance = balanceInTokens * data.usdValue

  return {
    balance: balanceInTokens,
    usdBalance
  }
}

export function useSafeTokenBalance(
  address?: string,
  symbol?: string,
  rpcUrl?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['safeTokenBalance', address, symbol],
    queryFn: () => fetchSafeTokenBalance({ address, symbol, rpcUrl }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 3 // 3 minutes
  })
}
