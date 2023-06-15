import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { smartSafeApi } from '@lib/axios'

interface CreateContactFunctionInput {
  ownerId: string
  name: string
  address: string
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
    'contacts',
    {
      ownerId: input.ownerId,
      name: input.name,
      address: input.address
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
      queryClient.cancelQueries({
        queryKey: ['contacts', variables.ownerId]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(['contacts', variables.ownerId], context)
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['contacts', variables.ownerId]
      })
    }
  })
}
