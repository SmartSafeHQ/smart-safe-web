import { JsonRpcProvider, ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface FetchSafeRequiredTxNonceInput {
  rpcUrl?: string
  safeAddress?: string
}

async function fetchSafeRequiredTxNonce({
  rpcUrl,
  safeAddress
}: FetchSafeRequiredTxNonceInput) {
  if (!safeAddress || !rpcUrl) throw new Error('safe addres required')

  const provider = new JsonRpcProvider(rpcUrl)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const requiredTransactionNonce = await contract.getFunction(
    'requiredTransactionNonce'
  )()

  return Number(requiredTransactionNonce)
}

export function useSafeRequiredTxNonce(
  safeAddress?: string,
  rpcUrl?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['safeRequiredTxNonce', safeAddress],
    queryFn: () => fetchSafeRequiredTxNonce({ safeAddress, rpcUrl }),
    staleTime: 60 * 2000, // 2 minutes
    enabled
  })
}
