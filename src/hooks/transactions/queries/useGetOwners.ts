import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface GetOwnersInput {
  safeAddress: string
}

async function getOwners({ safeAddress }: GetOwnersInput): Promise<string[]> {
  if (!safeAddress) {
    throw new Error('safe address is required')
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const owners = await contract.getFunction('getOwners')()

  return [...owners]
}

interface UseGetOwnersProps {
  safeAddress: string
  enabled: boolean
}

export function useGetOwners({
  safeAddress,
  enabled = true
}: UseGetOwnersProps) {
  return useQuery({
    queryFn: () => getOwners({ safeAddress }),
    queryKey: ['useGetOwners', safeAddress],
    staleTime: 60 * 2000, // 2 minutes
    enabled
  })
}
