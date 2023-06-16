import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { smartSafeApi } from '@lib/axios'
import { FetchContactsResponse } from '@hooks/contacts/queries/useContactsQuery'

interface CreateContactFunctionInput {
  contactId: number
  ownerAddress: string
}

export interface DeleteContactReponse {
  id: number
}

async function deleteContactFunction(
  input: CreateContactFunctionInput
): Promise<DeleteContactReponse> {
  const response = await smartSafeApi.delete<DeleteContactReponse>('contacts', {
    data: { id: input.contactId }
  })

  return { id: response.data.id }
}

export function useDeleteContact() {
  return useMutation({
    mutationKey: ['deleteContact'],
    mutationFn: (input: CreateContactFunctionInput) =>
      deleteContactFunction(input),
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
          const deletedContactIndex = prevContacts.findIndex(
            contact => contact.id === variables.contactId
          )

          if (deletedContactIndex < 0) return prevContacts

          prevContacts.splice(deletedContactIndex, 1)

          return prevContacts
        }
      )

      return prevContacts
    },
    onError: (_, _variables, context) => {
      queryClient.setQueryData(['contacts'], context)
    }
  })
}
