import { useMutation } from '@tanstack/react-query'

import { SelectedSpendingLimitsProps } from '@contexts/SpendingLimitsContext'

import { queryClient } from '@lib/reactQuery'

interface DeleteSpedingLimitsFunctionInput {
  address: string
  customerWalletPrivateKey: string
  withdrawalIndex: number
}

async function deleteSpendingLimitsFunction(
  input: DeleteSpedingLimitsFunctionInput
): Promise<void> {
  console.log(input)

  // const provider = new providers.JsonRpcProvider(CHAINS_ATTRIBUTES[0].rpcUrl)
  // const signer = new Wallet(input.customerWalletPrivateKey, provider)
  // const contract = new Contract(
  //   input.address,
  //   ACCOUNT_ABSTRACTION_ABI,
  //   signer
  // )
  // await contract.functions.removeAuthorizedUser(input.withdrawalIndex)
}

export function useDeleteSpendingLimitsMutation() {
  return useMutation({
    mutationKey: ['deleteSpendingLimits'],
    mutationFn: (input: DeleteSpedingLimitsFunctionInput) =>
      deleteSpendingLimitsFunction(input),
    onSuccess: async (_, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['spendingLimits', variables.address]
      })

      const prev = await queryClient.ensureQueryData<
        SelectedSpendingLimitsProps[]
      >({
        queryKey: ['spendingLimits', variables.address]
      })

      queryClient.setQueryData<SelectedSpendingLimitsProps[]>(
        ['spendingLimits', variables.address],
        () => {
          const deletedIndex = prev.findIndex(
            auth => auth.index === variables.withdrawalIndex
          )

          if (deletedIndex < 0) return prev

          prev.splice(deletedIndex, 1)

          return prev
        }
      )

      return prev
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(['spendingLimits', variables.address], context)
    },
    onSettled: (_data, _error, variables) => {
      const timeout = setTimeout(
        () =>
          queryClient.invalidateQueries({
            queryKey: ['spendingLimits', variables.address]
          }),
        5000
      )

      clearTimeout(timeout)
    }
  })
}
