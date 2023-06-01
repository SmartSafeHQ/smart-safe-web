import { useQuery } from '@tanstack/react-query'
import { smartSafeApi } from '@lib/axios'
import { formatWalletAddress } from '@utils/web3'

interface FetchContactsApiResponse {
  contacts: { name: string; address: string; id: number }[]
}

interface FetchContactsInput {
  creatorId: string
}

type FetchContactsResponse =
  | {
      contactName: string
      contactAddress: string
      formattedAddress: string
      contactId: number
    }[]
  | null

export async function fetchContacts({
  creatorId
}: FetchContactsInput): Promise<FetchContactsResponse> {
  if (!creatorId) return null

  const { data } = await smartSafeApi.get<FetchContactsApiResponse>(
    `addressBook/${creatorId}`,
    {
      params: { page: 0 }
    }
  )

  if (!data?.contacts) {
    return null
  }

  const formattedContactsList = data.contacts.map(({ address, name, id }) => ({
    contactId: id,
    contactName: name,
    contactAddress: address,
    formattedAddress: formatWalletAddress({ walletAddress: address })
  }))

  return formattedContactsList
}

export function useContactsQuery(creatorId: string) {
  return useQuery({
    queryKey: ['contacts', creatorId],
    queryFn: () => fetchContacts({ creatorId }),
    staleTime: 1000 * 60 * 1 // 1 minute
  })
}
