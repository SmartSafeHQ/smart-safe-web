import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { SelectedContactProps } from '@hooks/smart-account/useSAContacts'

interface CreateContactFunctionInput {
  customerId: number
  name: string
  address: string
}

interface CreateContactFunctionOutput {
  id: number
}

async function createContactFunction(
  input: CreateContactFunctionInput
): Promise<CreateContactFunctionOutput> {
  console.log(input)

  return { id: Math.random() }
}

export function useCreateContactMutation() {
  return useMutation({
    mutationKey: ['createContact'],
    mutationFn: (input: CreateContactFunctionInput) =>
      createContactFunction(input),
    onSuccess: async (data, variables) => {
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

      const currentContacts = await queryClient.ensureQueryData<
        SelectedContactProps[]
      >({
        queryKey: ['smartAccountContacts', variables.customerId]
      })

      queryClient.setQueryData<SelectedContactProps[]>(
        ['smartAccountContacts', variables.customerId],
        () => {
          currentContacts.push(createdContact)

          return currentContacts
        }
      )

      await queryClient.invalidateQueries(['createContact'])
    }
  })
}
