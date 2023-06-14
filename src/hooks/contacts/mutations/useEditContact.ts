import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { smartSafeApi } from '@lib/axios'

interface UpdateContactFunctionInput {
  creatorId: string
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
  const response = await smartSafeApi.patch<UpdateContactResponse>(
    'addressBook',
    {
      contactId: input.contactId,
      newData: input.newData
    }
  )

  return { id: response.data.id }
}

export function useEditContact() {
  return useMutation({
    mutationKey: ['editContact'],
    mutationFn: (input: UpdateContactFunctionInput) =>
      updateContactFunction(input),
    onSuccess: async (_, variables) => {
      queryClient.cancelQueries({
        queryKey: ['contacts', variables.creatorId]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(['contacts', variables.creatorId], context)
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['contacts', variables.creatorId]
      })
    }
  })
}
