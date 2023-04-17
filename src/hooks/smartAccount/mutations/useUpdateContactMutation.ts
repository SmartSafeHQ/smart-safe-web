import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { tokenverseApi } from '@lib/axios'
import { SelectedContactProps } from '@contexts/SAContactsContext'

interface UpdateContactFunctionInput {
  customerId: number
  contactId: number
  name: string
}

async function updateContactFunction(
  input: UpdateContactFunctionInput
): Promise<void> {
  await tokenverseApi.patch(`/widget/contacts/${input.contactId}`, {
    customerId: input.customerId,
    name: input.name
  })
}

export function useUpdateContactMutation() {
  return useMutation({
    mutationKey: ['updateContact'],
    mutationFn: (input: UpdateContactFunctionInput) =>
      updateContactFunction(input),
    onSuccess: async (data, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['smartAccountContacts', variables.customerId]
      })

      const prevContacts = await queryClient.ensureQueryData<
        SelectedContactProps[]
      >({
        queryKey: ['smartAccountContacts', variables.customerId]
      })

      queryClient.setQueryData<SelectedContactProps[]>(
        ['smartAccountContacts', variables.customerId],
        () => {
          const updatedContactIndex = prevContacts.findIndex(
            contact => contact.id === variables.contactId
          )

          if (updatedContactIndex < 0) return prevContacts

          const updatedContact = {
            ...prevContacts[updatedContactIndex],
            name: variables.name
          }

          prevContacts.splice(updatedContactIndex, 1, updatedContact)

          return prevContacts
        }
      )

      return prevContacts
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        ['smartAccountContacts', variables.customerId],
        context
      )
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['smartAccountContacts', variables.customerId]
      })
    }
  })
}
