import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { smartSafeApi } from '@lib/axios'
import { FetchContactsResponse } from '@hooks/contacts/queries/useContactsQuery'

interface CreateContactFunctionInput {
  ownerId: string
  ownerAddress: string
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
    onSuccess: async (data, variables) => {
      queryClient.cancelQueries({
        queryKey: ['contacts', variables.ownerAddress]
      })

      const prevContacts = await queryClient.ensureQueryData<
        FetchContactsResponse[]
      >({
        queryKey: ['contacts', variables.ownerAddress]
      })

      const createdContact = {
        id: data.id,
        name: variables.name,
        address: variables.address,
        formattedAddress: `${variables.address.slice(
          0,
          6
        )}...${variables.address.slice(-4)}`
      }

      queryClient.setQueryData<FetchContactsResponse[]>(
        ['contacts', variables.ownerAddress],
        () => {
          prevContacts?.push(createdContact)

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
