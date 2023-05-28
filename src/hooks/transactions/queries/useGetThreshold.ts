import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface GetThresholdInput {
  safeAddress: string
}

async function getThreshold({ safeAddress }: GetThresholdInput) {
  if (!safeAddress) {
    return
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const threshold = await contract.getFunction('threshold')()

  return Number(threshold)
}

interface UseGetThresholdProps {
  safeAddress: string
}

export function useGetThreshold({ safeAddress }: UseGetThresholdProps) {
  return useQuery({
    queryFn: () => getThreshold({ safeAddress }),
    queryKey: ['useGetThreshold', safeAddress],
    staleTime: 60 * 2000 // 2 minutes
  })
}
