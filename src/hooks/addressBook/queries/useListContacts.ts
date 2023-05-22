import { useQuery } from '@tanstack/react-query'
import { smartSafeApi } from '@lib/axios'
import { formatWalletAddress } from '@/utils/web3'

interface FetchContactsList {
  contacts: { name: string; address: string; id: number }[]
}

interface ListContactsInput {
  creatorAddress: string
}

type ListContactsResponse =
  | {
      contactName: string
      contactAddress: string
      formattedAddress: string
      contactId: number
    }[]
  | null

export async function listContacts({
  creatorAddress
}: ListContactsInput): Promise<ListContactsResponse> {
  const { data } = await smartSafeApi.get<FetchContactsList>(
    `addressBook/${creatorAddress}`,
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

export function useListContacts(creatorAddress: string) {
  return useQuery({
    queryKey: ['listContacts', creatorAddress],
    queryFn: () => listContacts({ creatorAddress }),
    staleTime: 1000 * 60 * 1 // 1 minute
  })
}
