import { useQuery } from '@tanstack/react-query'
import { smartSafeApi } from '@lib/axios'
import { formatWalletAddress } from '@utils/web3'

interface FetchContactsApiResponse {
  contacts: { name: string; address: string; id: number }[]
}

interface FetchContactsInput {
  creatorId?: string
}

export interface FetchContactsResponse {
  contactName: string
  contactAddress: string
  formattedAddress: string
  contactId: number
}

export async function fetchContacts({
  creatorId
}: FetchContactsInput): Promise<FetchContactsResponse[]> {
  if (!creatorId) throw new Error('creator id required')

  const { data } = await smartSafeApi.get<FetchContactsApiResponse | null>(
    `addressBook/${creatorId}`,
    {
      params: { page: 0 }
    }
  )

  if (!data) {
    return []
  }

  const formattedContactsList = data.contacts.map(({ address, name, id }) => ({
    contactId: id,
    contactName: name,
    contactAddress: address,
    formattedAddress: formatWalletAddress({ walletAddress: address })
  }))

  return formattedContactsList
}

export function useContactsQuery(creatorId?: string, enabled = true) {
  return useQuery({
    queryKey: ['contacts', creatorId],
    queryFn: () => fetchContacts({ creatorId }),
    staleTime: 1000 * 60 * 1, // 1 minute
    enabled
  })
}
