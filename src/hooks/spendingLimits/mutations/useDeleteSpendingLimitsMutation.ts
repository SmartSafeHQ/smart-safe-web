import { useMutation } from '@tanstack/react-query'

import { SelectedSpendingLimitsProps } from '@contexts/SpendingLimitsContext'

import { queryClient } from '@lib/reactQuery'

interface DeleteSpedingLimitsFunctionInput {
  safeAddress: string
  customerWalletPrivateKey: string
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
      queryClient.cancelQueries({
        queryKey: ['spendingLimits', variables.safeAddress]
      })

      const prev = await queryClient.ensureQueryData<
        SelectedSpendingLimitsProps[]
      >({
        queryKey: ['spendingLimits', variables.safeAddress]
      })

      queryClient.setQueryData<SelectedSpendingLimitsProps[]>(
        ['spendingLimits', variables.safeAddress],
        () => {
          // const deletedIndex = prev.findIndex(
          //   auth => auth.index === variables.withdrawalIndex
          // )

          // if (1 < 0) return prev

          prev.splice(1, 1)

          return prev
        }
      )

      return prev
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        ['spendingLimits', variables.safeAddress],
        context
      )
    },
    onSettled: (_data, _error, variables) => {
      const timeout = setTimeout(
        () =>
          queryClient.invalidateQueries({
            queryKey: ['spendingLimits', variables.safeAddress]
          }),
        5000
      )

      clearTimeout(timeout)
    }
  })
}
