import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface GetOwnersCountInput {
  safeAddress: string
}

async function getOwnersCount({ safeAddress }: GetOwnersCountInput) {
  if (!safeAddress) {
    return
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const ownersCount = await contract.getFunction('totalOwners')()

  return Number(ownersCount)
}

interface UseGetOwnersCountProps {
  safeAddress: string
}

export function useGetOwnersCount({ safeAddress }: UseGetOwnersCountProps) {
  return useQuery({
    queryFn: () => getOwnersCount({ safeAddress }),
    queryKey: ['useGetOwnersCount', safeAddress],
    staleTime: 60 * 2000 // 2 minutes
  })
}
