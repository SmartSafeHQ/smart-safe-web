import { useMutation } from '@tanstack/react-query'

import { SelectedWithdrawalProps } from '@contexts/SAWithdrawalAuthContext'

import { queryClient } from '@lib/reactQuery'

interface DeleteWithdrawalAuthFunctionInput {
  smartAccountAddress: string
  customerWalletPrivateKey: string
  withdrawalIndex: number
}

async function deleteWithdrawalAuthFunction(
  input: DeleteWithdrawalAuthFunctionInput
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

export function useDeleteWithdrawalAuthMutation() {
  return useMutation({
    mutationKey: ['deleteWithdrawalAuth'],
    mutationFn: (input: DeleteWithdrawalAuthFunctionInput) =>
      deleteWithdrawalAuthFunction(input),
    onSuccess: async (_, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['smartAccountWithdrawalAuths', variables.smartAccountAddress]
      })

      const prevAuth = await queryClient.ensureQueryData<
        SelectedWithdrawalProps[]
      >({
        queryKey: ['smartAccountWithdrawalAuths', variables.smartAccountAddress]
      })

      queryClient.setQueryData<SelectedWithdrawalProps[]>(
        ['smartAccountWithdrawalAuths', variables.smartAccountAddress],
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
        ['smartAccountWithdrawalAuths', variables.smartAccountAddress],
        context
      )
    },
    onSettled: (_data, _error, variables) => {
      const timeout = setTimeout(
        () =>
          queryClient.invalidateQueries({
            queryKey: [
              'smartAccountWithdrawalAuths',
              variables.smartAccountAddress
            ]
          }),
        5000
      )

      clearTimeout(timeout)
    }
  })
}
