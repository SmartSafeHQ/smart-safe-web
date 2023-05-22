import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { smartSafeApi } from '@lib/axios'

interface CreateContactFunctionInput {
  contactId: number
}

export interface DeleteContactReponse {
  id: number
}

async function deleteContactFunction(
  input: CreateContactFunctionInput
): Promise<DeleteContactReponse> {
  const response = await smartSafeApi.delete<DeleteContactReponse>(
    'addressBook',
    {
      data: { contactId: input.contactId }
    }
  )

  return { id: response.data.id }
}

export function useDeleteContact() {
  return useMutation({
    mutationKey: ['deleteContact'],
    mutationFn: (input: CreateContactFunctionInput) =>
      deleteContactFunction(input),
    onSuccess: async _ => {
      await queryClient.cancelQueries({
        queryKey: ['listContacts']
      })
    },
    onError: (_, _variables, context) => {
      queryClient.setQueryData(['listContacts'], context)
    },
    onSettled: (_data, _error, _variables) => {
      queryClient.invalidateQueries({
        queryKey: ['listContacts']
      })
    }
  })
}
