import { useMutation } from '@tanstack/react-query'

// import { queryClient } from '@lib/reactQuery'
import { smartSafeApi } from '@lib/axios'

// import { ContactProps } from '@contexts/SAContactsContext'

interface DeleteContactFunctionInput {
  customerId: number
  contactAddress: string
}

async function deleteContactFunction(
  input: DeleteContactFunctionInput
): Promise<void> {
  await smartSafeApi.delete(`/widget/contacts/${input.contactAddress}`)
}

export function useDeleteContactMutation() {
  return useMutation({
    mutationKey: ['deleteContact'],
    mutationFn: (input: DeleteContactFunctionInput) =>
      deleteContactFunction(input)
    // onSuccess: async (_, variables) => {
    //   await queryClient.cancelQueries({
    //     queryKey: ['smartAccountContacts', variables.customerId]
    //   })

    //   const prevContacts = await queryClient.ensureQueryData<ContactProps[]>({
    //     queryKey: ['smartAccountContacts', variables.customerId]
    //   })

    //   queryClient.setQueryData<ContactProps[]>(
    //     ['smartAccountContacts', variables.customerId],
    //     () => {
    //       const deletedContactIndex = prevContacts.findIndex(
    //         contact => contact.id === variables.contactId
    //       )

    //       if (deletedContactIndex < 0) return prevContacts

    //       prevContacts.splice(deletedContactIndex, 1)

    //       return prevContacts
    //     }
    //   )

    //   return prevContacts
    // },
    // onError: (_, variables, context) => {
    //   queryClient.setQueryData(
    //     ['smartAccountContacts', variables.customerId],
    //     context
    //   )
    // },
    // onSettled: (_data, _error, variables) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ['smartAccountContacts', variables.customerId]
    //   })
    // }
  })
}
