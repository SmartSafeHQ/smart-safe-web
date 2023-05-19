import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'

interface FetchChainFeeInput {
  rpcUrl?: string
}

export interface FetchChainFeeResponse {
  valueInToken: string
  valueInWei: string
}

async function fetchChainFee({
  rpcUrl
}: FetchChainFeeInput): Promise<FetchChainFeeResponse> {
  if (!rpcUrl) {
    throw new Error('rpcUrl required')
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl)

  const { gasPrice } = await provider.getFeeData()

  const gasCostInWei = gasPrice! * 21000n
  const gasCostInToken = Number(gasCostInWei.toString()) / 10 ** 18

  return {
    valueInWei: gasCostInWei.toString(),
    valueInToken: gasCostInToken.toString()
  }
}

export function useChainFee(rpcUrl?: string, enabled = true) {
  return useQuery({
    queryKey: ['chainFee', rpcUrl],
    queryFn: () => fetchChainFee({ rpcUrl }),
    enabled,
    staleTime: 1000 * 60 * 1, // 1 minute
    retry: 3,
    retryDelay: 5000
  })
}
