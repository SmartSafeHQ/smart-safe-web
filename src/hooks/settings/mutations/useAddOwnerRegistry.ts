import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { smartSafeApi } from '@lib/axios'

interface AddOwnerRegistryFunctionInput {
  name: string
  address: string
  safeAddress: string
  creatorOwnerAddress: string
}

interface AddOwnerRegistryFunctionOutput {
  id: number
}

export interface AddOwnerRegistryApiResponse {
  id: number
}

async function addOwnerRegistryFunction(
  input: AddOwnerRegistryFunctionInput
): Promise<AddOwnerRegistryFunctionOutput> {
  const response = await smartSafeApi.post<AddOwnerRegistryApiResponse>(
    'owners',
    {
      name: input.name,
      address: input.address,
      safeAddress: input.safeAddress,
      creatorOwnerAddress: input.creatorOwnerAddress
    }
  )

  return { id: response.data.id }
}

export function useAddOwnerRegistry() {
  return useMutation({
    mutationKey: ['addOwnerRegistry'],
    mutationFn: (input: AddOwnerRegistryFunctionInput) =>
      addOwnerRegistryFunction(input),
    onSuccess: async (data, variables) => {
      queryClient.cancelQueries({
        queryKey: ['contacts', variables.creatorOwnerAddress]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        ['contacts', variables.creatorOwnerAddress],
        context
      )
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['contacts', variables.creatorOwnerAddress]
      })
    }
  })
}
