import { useQuery } from '@tanstack/react-query'
import { providers, utils } from 'ethers'

import {
  FetchTokenUsdValueResponse,
  fetchTokenUsdValue
} from '@hooks/chains/queries/useTokenUsdValue'
import { queryClient } from '@lib/reactQuery'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'

interface FetchSafeTokensInput {
  address?: string
  chainId?: string
}

interface FetchSafeTokensOutput {
  tokenSymbol: string
  tokenIcon: string
  balance: number
  valueInUsd: number
}

export async function fetchSafeTokens(
  input: FetchSafeTokensInput
): Promise<FetchSafeTokensOutput[]> {
  if (!input.address || !input.chainId) {
    throw new Error('wallet address and chain id required')
  }

  const safeChain = CHAINS_ATTRIBUTES.find(
    chain => chain.chainId === input.chainId
  )

  if (!safeChain) throw new Error('Chain not supported')

  const provider = new providers.JsonRpcProvider(safeChain.rpcUrl)

  const data = await queryClient.ensureQueryData<FetchTokenUsdValueResponse>({
    queryKey: ['tokenUsdValue', safeChain.symbol],
    queryFn: () => fetchTokenUsdValue({ symbol: safeChain.symbol })
  })

  const balance = await provider.getBalance(input.address)
  const balanceInMatic = +utils.formatUnits(balance, 18)

  const usdBalanceOfToken = balanceInMatic * data.usdValue

  return [
    {
      tokenSymbol: safeChain.symbol,
      tokenIcon: safeChain.icon,
      balance: balanceInMatic,
      valueInUsd: usdBalanceOfToken
    }
  ]
}

export function useSafeTokens(
  address?: string,
  chainId?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['safeTokens', address],
    queryFn: () => fetchSafeTokens({ address, chainId }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
