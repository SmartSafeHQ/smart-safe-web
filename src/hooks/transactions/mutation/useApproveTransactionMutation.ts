import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { FetchSafeTxQueueOutput } from '@hooks/safes/retrieve/queries/useSafeTxQueue'

export type ApproveTransactionFunctionInput = {
  rpcUrl: string
  safeAddress: string
}

interface ApproveTransactionFunctionOutput {
  transactionHash: string
}

async function approveTransactionFunction(
  input: ApproveTransactionFunctionInput
): Promise<ApproveTransactionFunctionOutput> {
  console.log(input)

  return { transactionHash: 'hash' }
}

export function useApproveTransactionMutation() {
  return useMutation({
    mutationKey: ['approveTransaction'],
    mutationFn: (input: ApproveTransactionFunctionInput) =>
      approveTransactionFunction(input),
    onSuccess: async (_, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })

      const prevTransactions =
        await queryClient.ensureQueryData<FetchSafeTxQueueOutput>({
          queryKey: ['safeTxQueue', variables.safeAddress]
        })

      queryClient.setQueryData<FetchSafeTxQueueOutput>(
        ['safeTxQueue', variables.safeAddress],
        () => {
          const nextTransactionToApprove = prevTransactions.pending[0]

          const updattedPendingTransactionsList =
            prevTransactions.pending.slice(1)

          return {
            toApprove: nextTransactionToApprove,
            pending: updattedPendingTransactionsList
          }
        }
      )

      return prevTransactions
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(['safeTxQueue', variables.safeAddress], context)
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
    }
  })
}
