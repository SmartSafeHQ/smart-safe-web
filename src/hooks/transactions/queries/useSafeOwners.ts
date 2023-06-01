import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface FetchSafeOwnersInput {
  safeAddress?: string
}

async function fetchSafeOwners({
  safeAddress
}: FetchSafeOwnersInput): Promise<string[]> {
  if (!safeAddress) throw new Error('safe address is required')

  const provider = new ethers.BrowserProvider(window.ethereum)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const owners = await contract.getFunction('getOwners')()

  return [...owners]
}

export function useSafeOwners(safeAddress?: string, enabled = true) {
  return useQuery({
    queryFn: () => fetchSafeOwners({ safeAddress }),
    queryKey: ['safeOwners', safeAddress],
    staleTime: 60 * 2000, // 2 minutes
    enabled
  })
}
