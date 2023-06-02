import { JsonRpcProvider, ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface FetchSafeThresholdInput {
  rpcUrl?: string
  safeAddress?: string
}

async function fetchSafeThreshold({
  rpcUrl,
  safeAddress
}: FetchSafeThresholdInput) {
  if (!safeAddress || !rpcUrl) throw new Error('safe addres required')

  const provider = new JsonRpcProvider(rpcUrl)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const threshold = await contract.getFunction('threshold')()

  return Number(threshold)
}

export function useSafeThreshold(
  safeAddress?: string,
  rpcUrl?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['safeThreshold', safeAddress],
    queryFn: () => fetchSafeThreshold({ safeAddress, rpcUrl }),
    staleTime: 60 * 2000, // 2 minutes
    enabled
  })
}
