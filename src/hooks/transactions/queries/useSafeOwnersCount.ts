import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface FetchSafeOwnersCountInput {
  safeAddress?: string
}

async function fetchSafeOwnersCount({
  safeAddress
}: FetchSafeOwnersCountInput) {
  if (!safeAddress) throw new Error('safe addres required')

  const provider = new ethers.BrowserProvider(window.ethereum)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const ownersCount = await contract.getFunction('totalOwners')()

  return Number(ownersCount)
}

export function useSafeOwnersCount(safeAddress?: string, enabled = true) {
  return useQuery({
    queryKey: ['safeOwnersCount', safeAddress],
    queryFn: () => fetchSafeOwnersCount({ safeAddress }),
    enabled,
    staleTime: 60 * 2000 // 2 minutes
  })
}
