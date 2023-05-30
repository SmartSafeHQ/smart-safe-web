import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface GetRequiredTransactionNonceInput {
  safeAddress: string
}

async function getRequiredTransactionNonce({
  safeAddress
}: GetRequiredTransactionNonceInput) {
  if (!safeAddress) {
    return
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const requiredTransactionNonce = await contract.getFunction(
    'requiredTransactionNonce'
  )()

  return Number(requiredTransactionNonce)
}

interface UseGetRequiredTransactionNonce {
  safeAddress: string
  enabled: boolean
}

export function useGetRequiredTransactionNonce({
  safeAddress,
  enabled = true
}: UseGetRequiredTransactionNonce) {
  return useQuery({
    queryFn: () => getRequiredTransactionNonce({ safeAddress }),
    queryKey: ['useGetRequiredTransactionNonce', safeAddress],
    staleTime: 60 * 2000, // 2 minutes
    enabled
  })
}
