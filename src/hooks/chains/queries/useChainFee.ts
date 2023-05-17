import { useQuery } from '@tanstack/react-query'
import { providers } from 'ethers'

interface FetchChainFeeInput {
  rpcUrl?: string
}

export interface FetchChainFeeResponse {
  valueInCoin: string
  valueInWei: string
}

async function fetchChainFee({
  rpcUrl
}: FetchChainFeeInput): Promise<FetchChainFeeResponse> {
  if (!rpcUrl) {
    throw new Error('rpcUrl required')
  }

  const provider = new providers.JsonRpcProvider(rpcUrl)

  const gasEstimate = await provider.getGasPrice()

  const gasCostInWei = gasEstimate.mul(21000)
  const gasCostInCoin = gasCostInWei.toNumber() / 10 ** 18

  return {
    valueInWei: gasCostInWei.toString(),
    valueInCoin: gasCostInCoin.toString()
  }
}

export function useChainFee(rpcUrl?: string, enabled = true) {
  return useQuery({
    queryKey: ['chainFee', rpcUrl],
    queryFn: () => fetchChainFee({ rpcUrl }),
    enabled,
    staleTime: 1000 * 60 * 1 // 1 minute
  })
}
