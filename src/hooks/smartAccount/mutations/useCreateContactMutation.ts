import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { tokenverseApi } from '@lib/axios'
import { ContactProps } from '@contexts/SAContactsContext'

interface CreateContactFunctionInput {
  customerId: number
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
  const response = await tokenverseApi.post<CreateContactApiResponse>(
    '/widget/contacts',
    {
      customerId: input.customerId,
      name: input.name,
      address: input.address
    }
  )

  return { id: response.data.id }
}

export function useCreateContactMutation() {
  return useMutation({
    mutationKey: ['createContact'],
    mutationFn: (input: CreateContactFunctionInput) =>
      createContactFunction(input),
    onSuccess: async (data, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['smartAccountContacts', variables.customerId]
      })

      const prevContacts = await queryClient.ensureQueryData<ContactProps[]>({
        queryKey: ['smartAccountContacts', variables.customerId]
      })

      const createdContact = {
        id: data.id,
        name: variables.name,
        wallet: {
          address: variables.address,
          formattedAddress: `${variables.address.slice(
            0,
            6
          )}...${variables.address.slice(-4)}`
        }
      }

      queryClient.setQueryData<ContactProps[]>(
        ['smartAccountContacts', variables.customerId],
        () => {
          prevContacts?.push(createdContact)

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
