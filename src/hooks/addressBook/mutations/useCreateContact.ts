import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { smartSafeApi } from '@lib/axios'

import { ContactProps } from '@contexts/SAContactsContext'
import { formatWalletAddress } from '@/utils/web3'

interface CreateContactFunctionInput {
  creatorAddress: string
  contactName: string
  contactAddress: string
}

interface CreateContactFunctionOutput {
  id: number
}

export interface CreateContactApiResponse {
  id: number
}

async function createContactFunction(
  input: CreateContactFunctionInput
): Promise<CreateContactFunctionOutput> {
  const response = await smartSafeApi.post<CreateContactApiResponse>(
    'addressBook',
    {
      creatorAddress: input.creatorAddress,
      contactName: input.contactName,
      contactAddress: input.contactAddress
    }
  )

  return { id: response.data.id }
}

export function useCreateContact() {
  return useMutation({
    mutationKey: ['createContact'],
    mutationFn: (input: CreateContactFunctionInput) =>
      createContactFunction(input),
    onSuccess: async (_, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['listContacts', variables.creatorAddress]
      })

      const prevContacts = await queryClient.ensureQueryData<ContactProps[]>({
        queryKey: ['listContacts', variables.creatorAddress]
      })

      const createdContact = {
        contactName: variables.contactName,
        contactAddress: variables.contactAddress,
        formattedAddress: formatWalletAddress({
          walletAddress: variables.contactAddress
        })
      }

      queryClient.setQueryData<ContactProps[]>(
        ['listContacts', variables.creatorAddress],
        () => {
          prevContacts?.push(createdContact)

          return prevContacts
        }
      )

      return prevContacts
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        ['listContacts', variables.creatorAddress],
        context
      )
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['listContacts', variables.creatorAddress]
      })
    }
  })
}
