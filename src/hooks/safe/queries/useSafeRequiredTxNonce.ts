import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface FetchSafeRequiredTxNonceInput {
  safeAddress?: string
}

async function fetchSafeRequiredTxNonce({
  safeAddress
}: FetchSafeRequiredTxNonceInput) {
  if (!safeAddress) throw new Error('safe addres required')

  const provider = new ethers.BrowserProvider(window.ethereum)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const requiredTransactionNonce = await contract.getFunction(
    'requiredTransactionNonce'
  )()

  return Number(requiredTransactionNonce)
}

export function useSafeRequiredTxNonce(safeAddress?: string, enabled = true) {
  return useQuery({
    queryFn: () => fetchSafeRequiredTxNonce({ safeAddress }),
    queryKey: ['safeRequiredTxNonce', safeAddress],
    staleTime: 60 * 2000, // 2 minutes
    enabled
  })
}
