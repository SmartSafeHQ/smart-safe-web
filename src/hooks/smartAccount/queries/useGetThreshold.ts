import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface UseGetThresholdProps {
  safeAddress: string
}

interface FetchGetThresholdInput {
  safeAddress: string
}

type FetchGetThresholdResponse = number

export async function getThreshold(
  input: FetchGetThresholdInput
): Promise<FetchGetThresholdResponse> {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const contract = new ethers.Contract(
    input.safeAddress,
    SMART_SAFE_ABI,
    provider
  )

  const threshold = await contract.getFunction('threshold')()

  return Number(threshold)
}

export function useGetThreshold({ safeAddress }: UseGetThresholdProps) {
  return useQuery({
    queryKey: ['getThreshold', safeAddress],
    queryFn: () => getThreshold({ safeAddress }),
    enabled: true,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
