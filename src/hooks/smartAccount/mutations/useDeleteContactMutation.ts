import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { tokenverseApi } from '@lib/axios'
import { SelectedContactProps } from '@contexts/SAContactsContext'

interface DeleteContactFunctionInput {
  customerId: number
  contactId: number
}

async function deleteContactFunction(
  input: DeleteContactFunctionInput
): Promise<void> {
  await tokenverseApi.delete(`/widget/contacts/${input.contactId}`)
}

export function useDeleteContactMutation() {
  return useMutation({
    mutationKey: ['deleteContact'],
    mutationFn: (input: DeleteContactFunctionInput) =>
      deleteContactFunction(input),
    onSuccess: async (_, variables) => {
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
