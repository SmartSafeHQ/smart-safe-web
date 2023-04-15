import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { SelectedContactProps } from '@contexts/SAContactsContext'

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
  const isAddressValid = ethers.utils.isAddress(input.address)

  if (!isAddressValid) {
    throw new Error('invalid wallet address')
  }

  console.log(input)

  return { id: Math.random() }
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

      const prevContacts = await queryClient.ensureQueryData<
        SelectedContactProps[]
      >({
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

      queryClient.setQueryData<SelectedContactProps[]>(
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
