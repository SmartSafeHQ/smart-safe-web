import { useMutation } from '@tanstack/react-query'

import { SelectedSpendingLimitsProps } from '@contexts/smart-account/SpendingLimitsAuthContext'

import { queryClient } from '@lib/reactQuery'

interface DeleteSpedingLimitsAuthFunctionInput {
  smartAccountAddress: string
  customerWalletPrivateKey: string
  withdrawalIndex: number
}

async function deleteSpendingLimitsAuthFunction(
  input: DeleteSpedingLimitsAuthFunctionInput
): Promise<void> {
  console.log(input)

  // const provider = new providers.JsonRpcProvider(CHAINS_ATTRIBUTES[0].rpcUrl)
  // const signer = new Wallet(input.customerWalletPrivateKey, provider)
  // const contract = new Contract(
  //   input.smartAccountAddress,
  //   ACCOUNT_ABSTRACTION_ABI,
  //   signer
  // )
  // await contract.functions.removeAuthorizedUser(input.withdrawalIndex)
}

export function useDeleteSpendingLimitsAuthMutation() {
  return useMutation({
    mutationKey: ['deleteSpendingLimitsAuth'],
    mutationFn: (input: DeleteSpedingLimitsAuthFunctionInput) =>
      deleteSpendingLimitsAuthFunction(input),
    onSuccess: async (_, variables) => {
      await queryClient.cancelQueries({
        queryKey: [
          'smartAccountSpendingLimitsAuths',
          variables.smartAccountAddress
        ]
      })

      const prevAuth = await queryClient.ensureQueryData<
        SelectedSpendingLimitsProps[]
      >({
        queryKey: [
          'smartAccountSpendingLimitsAuths',
          variables.smartAccountAddress
        ]
      })

      queryClient.setQueryData<SelectedSpendingLimitsProps[]>(
        ['smartAccountSpendingLimitsAuths', variables.smartAccountAddress],
        () => {
          const deletedAuthIndex = prevAuth.findIndex(
            auth => auth.index === variables.withdrawalIndex
          )

          if (deletedAuthIndex < 0) return prevAuth

          prevAuth.splice(deletedAuthIndex, 1)

          return prevAuth
        }
      )

      return prevAuth
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        ['smartAccountSpendingLimitsAuths', variables.smartAccountAddress],
        context
      )
    },
    onSettled: (_data, _error, variables) => {
      const timeout = setTimeout(
        () =>
          queryClient.invalidateQueries({
            queryKey: [
              'smartAccountSpendingLimitsAuths',
              variables.smartAccountAddress
            ]
          }),
        5000
      )

      clearTimeout(timeout)
    }
  })
}
