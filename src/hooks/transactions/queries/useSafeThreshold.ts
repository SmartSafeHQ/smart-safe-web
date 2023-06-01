import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface FetchSafeThresholdInput {
  safeAddress?: string
}

async function fetchSafeThreshold({ safeAddress }: FetchSafeThresholdInput) {
  if (!safeAddress) throw new Error('safe addres required')

  const provider = new ethers.BrowserProvider(window.ethereum)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const threshold = await contract.getFunction('threshold')()

  return Number(threshold)
}

export function useSafeThreshold(safeAddress?: string, enabled = true) {
  return useQuery({
    queryKey: ['safeThreshold', safeAddress],
    queryFn: () => fetchSafeThreshold({ safeAddress }),
    staleTime: 60 * 2000, // 2 minutes
    enabled
  })
}
