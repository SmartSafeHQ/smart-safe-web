import { useQuery } from '@tanstack/react-query'

import { ContactProps } from '@contexts/SAContactsContext'

import { smartSafeApi } from '@lib/axios'
import { formatWalletAddress } from '@utils/web3'

interface FetchSmartAccountContactsInput {
  customerId: number
}

export interface FetchContactsResponse {
  id: number
  name: string
  evmAddress: string
}

export async function fetchSmartAccountContacts(
  input: FetchSmartAccountContactsInput
): Promise<ContactProps[]> {
  const response = await smartSafeApi.get<FetchContactsResponse[]>(
    `/widget/contacts/${input.customerId}`
  )

  const formattedContacts = response.data.map(contact => ({
    id: contact.id,
    name: contact.name,
    wallet: {
      address: contact.evmAddress,
      formattedAddress: formatWalletAddress({
        walletAddress: contact.evmAddress
      })
    }
  }))

  return formattedContacts
}

export function useSmartAccountContacts(id = 0, enabled = true) {
  return useQuery({
    queryKey: ['smartAccountContacts', id],
    queryFn: () => fetchSmartAccountContacts({ customerId: id }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
