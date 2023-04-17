import { useQuery } from '@tanstack/react-query'

import { SelectedContactProps } from '@contexts/SAContactsContext'
import { tokenverseApi } from '@lib/axios'
import { formatWalletAddress } from '@/utils/web3Utils'

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
): Promise<SelectedContactProps[]> {
  const response = await tokenverseApi.get<FetchContactsResponse[]>(
    `/widget/contacts/${input.customerId}`
  )

  const formattedContacts = response.data.map(contact => ({
    id: contact.id,
    name: contact.name,
    wallet: {
      address: contact.evmAddress,
      formattedAddress: formatWalletAddress({
        network: 'evm',
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
