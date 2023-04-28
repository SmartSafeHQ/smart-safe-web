import { useMutation } from '@tanstack/react-query'
import { Contract, Wallet, providers } from 'ethers'

import { queryClient } from '@lib/reactQuery'
import { STABLE_COINS } from '@utils/global/coins/stableCoinsConfig'
import ACCOUNT_ABSTRACTION_ABI from '@utils/web3/ABIs/AccountAbstraction.json'
import { SelectedWithdrawalProps } from '@contexts/SAWithdrawalAuthContext'

interface DeleteWithdrawalAuthFunctionInput {
  smartAccountAddress: string
  customerWalletPrivateKey: string
  withdrawalIndex: number
}

async function deleteWithdrawalAuthFunction(
  input: DeleteWithdrawalAuthFunctionInput
): Promise<void> {
  const provider = new providers.JsonRpcProvider(STABLE_COINS[0].rpcUrl)
  const signer = new Wallet(input.customerWalletPrivateKey, provider)

  const contract = new Contract(
    input.smartAccountAddress,
    ACCOUNT_ABSTRACTION_ABI,
    signer
  )

  await contract.functions.removeAuthorizedUser(input.withdrawalIndex)
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
