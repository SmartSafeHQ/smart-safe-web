import { useQuery } from '@tanstack/react-query'
import { smartSafeApi } from '@lib/axios'
import { formatWalletAddress } from '@utils/web3'

interface FetchContactsApiResponse {
  name: string
  address: string
  id: number
}

interface FetchContactsInput {
  walletAddress?: string
}

export interface FetchContactsResponse {
  id: number
  name: string
  address: string
  formattedAddress: string
}

export async function fetchContacts({
  walletAddress
}: FetchContactsInput): Promise<FetchContactsResponse[]> {
  if (!walletAddress) throw new Error('wallet address required')

  const { data } = await smartSafeApi.get<FetchContactsApiResponse[]>(
    `contacts/${walletAddress}`,
    {
      params: { page: 0 }
    }
  )

  if (!data) {
    return []
  }

  const formattedContactsList = data.map(contact => ({
    ...contact,
    formattedAddress: formatWalletAddress({ walletAddress: contact.address })
  }))

  return formattedContactsList
}

export function useContactsQuery(walletAddress?: string, enabled = true) {
  return useQuery({
    queryKey: ['contacts', walletAddress],
    queryFn: () => fetchContacts({ walletAddress }),
    enabled,
    staleTime: 1000 * 60 * 2 // 2 minute
  })
}
