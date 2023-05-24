import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface UseGetOwnersProps {
  safeAddress: string
}

interface FetchGetOwnersInput {
  safeAddress: string
}

type FetchGetOwnersResponse = string[]

export async function getOwners(
  input: FetchGetOwnersInput
): Promise<FetchGetOwnersResponse> {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const contract = new ethers.Contract(
    input.safeAddress,
    SMART_SAFE_ABI,
    provider
  )

  const owners = await contract.getFunction('getOwners')()

  return [...owners]
}

export function useGetOwners({ safeAddress }: UseGetOwnersProps) {
  return useQuery({
    queryKey: ['getOwners', safeAddress],
    queryFn: () => getOwners({ safeAddress }),
    enabled: true,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
