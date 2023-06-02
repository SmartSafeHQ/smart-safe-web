import { JsonRpcProvider, ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface FetchSafeTxNonceInput {
  rpcUrl?: string
  safeAddress?: string
}

async function fetchSafeTxNonce({
  rpcUrl,
  safeAddress
}: FetchSafeTxNonceInput) {
  if (!safeAddress || !rpcUrl) throw new Error('safe address is required')

  const provider = new JsonRpcProvider(rpcUrl)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const transactionNonce = await contract.getFunction('transactionNonce')()

  return Number(transactionNonce)
}

export function useSafeTxNonce(
  safeAddress?: string,
  rpcUrl?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['safeTxNonce', safeAddress],
    queryFn: () => fetchSafeTxNonce({ safeAddress, rpcUrl }),
    staleTime: 60 * 2000, // 2 minutes
    enabled
  })
}
