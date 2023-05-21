import { useQuery } from '@tanstack/react-query'
import { smartSafeApi } from '@lib/axios'

interface FetchContactsList {
  contacts: { name: string; address: string }[]
}

interface ListContactsInput {
  creatorAddress: string
}

type ListContactsResponse = { name: string; address: string }[]

async function listContacts({
  creatorAddress
}: ListContactsInput): Promise<ListContactsResponse> {
  const { data } = await smartSafeApi.get<FetchContactsList>(
    `addressBook/${creatorAddress}`,
    {
      params: { page: 0 }
    }
  )

  if (!data.contacts) {
    return []
  }

  return data.contacts
}

export function useListContacts(creatorAddress: string) {
  return useQuery({
    queryKey: ['listContacts', creatorAddress],
    queryFn: () => listContacts({ creatorAddress }),
    staleTime: 1000 * 60 * 1 // 1 minute
  })
}
