import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { smartSafeApi } from '@lib/axios'

interface UpdateContactFunctionInput {
  contactId: number
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
      queryClient.cancelQueries({
        queryKey: ['contacts', variables.contactId]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(['contacts', variables.contactId], context)
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['contacts', variables.contactId]
      })
    }
  })
}
