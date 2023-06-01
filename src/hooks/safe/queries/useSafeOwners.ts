import { JsonRpcProvider, ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'
import { formatWalletAddress } from '@utils/web3'

interface FetchSafeOwnersInput {
  rpcUrl?: string
  safeAddress?: string
}

export interface FetchSafeOwnersOutput {
  address: string
  formattedAddress: string
}

async function fetchSafeOwners({
  rpcUrl,
  safeAddress
}: FetchSafeOwnersInput): Promise<FetchSafeOwnersOutput[]> {
  if (!safeAddress || !rpcUrl) throw new Error('safe address is required')

  const provider = new JsonRpcProvider(rpcUrl)
  const contract = new ethers.Contract(safeAddress, SMART_SAFE_ABI, provider)

  const owners = await contract.getFunction('getOwners')()

  const formattedOwners = [...owners].map(owner => ({
    address: owner,
    formattedAddress: formatWalletAddress({
      walletAddress: owner
    })
  }))

  return formattedOwners
}

export function useSafeOwners(
  safeAddress?: string,
  rpcUrl?: string,
  enabled = true
) {
  return useQuery({
    queryFn: () => fetchSafeOwners({ safeAddress, rpcUrl }),
    queryKey: ['safeOwners', safeAddress],
    staleTime: 60 * 2000, // 2 minutes
    enabled
  })
}
