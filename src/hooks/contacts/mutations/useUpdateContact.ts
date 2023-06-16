import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { smartSafeApi } from '@lib/axios'
import { FetchContactsResponse } from '@hooks/contacts/queries/useContactsQuery'

interface UpdateContactFunctionInput {
  contactId: number
  ownerAddress: string
  newData: {
    contactName: string
  }
}

export interface UpdateContactResponse {
  id: number
}

async function updateContactFunction(
  input: UpdateContactFunctionInput
): Promise<UpdateContactResponse> {
  const response = await smartSafeApi.patch<UpdateContactResponse>('contacts', {
    contactId: input.contactId,
    newData: {
      name: input.newData.contactName
    }
  })

  return { id: response.data.id }
}

export function useUpdateContact() {
  return useMutation({
    mutationKey: ['updateContact'],
    mutationFn: (input: UpdateContactFunctionInput) =>
      updateContactFunction(input),
    onSuccess: async (_, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['contacts', variables.ownerAddress]
      })

      const prevContacts = await queryClient.ensureQueryData<
        FetchContactsResponse[]
      >({
        queryKey: ['contacts', variables.ownerAddress]
      })

      queryClient.setQueryData<FetchContactsResponse[]>(
        ['contacts', variables.ownerAddress],
        () => {
          const updatedContactIndex = prevContacts.findIndex(
            contact => contact.id === variables.contactId
          )

          if (updatedContactIndex < 0) return prevContacts

          const updatedContact = {
            ...prevContacts[updatedContactIndex],
            name: variables.newData.contactName
          }

          prevContacts.splice(updatedContactIndex, 1, updatedContact)

          return prevContacts
        }
      )

      return prevContacts
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(['contacts', variables.ownerAddress], context)
    }
  })
}
