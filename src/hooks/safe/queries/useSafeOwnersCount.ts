import { JsonRpcProvider, ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface FetchSafeOwnersCountInput {
  rpcUrl?: string
  safeAddress?: string
}

async function fetchSafeOwnersCount({
  rpcUrl,
  safeAddress
}: FetchSafeOwnersCountInput) {
  if (!safeAddress || !rpcUrl) throw new Error('safe addres required')

  const provider = new JsonRpcProvider(rpcUrl)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const ownersCount = await contract.getFunction('totalOwners')()

  return Number(ownersCount)
}

export function useSafeOwnersCount(
  safeAddress?: string,
  rpcUrl?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['safeOwnersCount', safeAddress],
    queryFn: () => fetchSafeOwnersCount({ safeAddress, rpcUrl }),
    enabled,
    staleTime: 60 * 2000 // 2 minutes
  })
}
