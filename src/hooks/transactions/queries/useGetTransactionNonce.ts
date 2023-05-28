import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface GetTransactionNonceInput {
  safeAddress: string
}

async function getTransactionNonce({ safeAddress }: GetTransactionNonceInput) {
  if (!safeAddress) {
    return
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const transactionNonce = await contract.getFunction(
    'requiredTransactionNonce'
  )()

  return Number(transactionNonce)
}

interface UseGetTransactionNonceProps {
  safeAddress: string
}

export function useGetTransactionNonce({
  safeAddress
}: UseGetTransactionNonceProps) {
  return useQuery({
    queryFn: () => getTransactionNonce({ safeAddress }),
    queryKey: ['useGetTransactionNonce', safeAddress],
    staleTime: 60 * 2000 // 2 minutes
  })
}
