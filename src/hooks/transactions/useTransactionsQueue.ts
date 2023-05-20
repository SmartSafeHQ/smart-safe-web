import { useSafe } from '@contexts/SafeContext'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'
import { useSafeTxQueue } from '@hooks/safes/retrieve/queries/useSafeTxQueue'
import { useApproveTransactionMutation } from '@hooks/transactions/mutation/useApproveTransactionMutation'

export type TransactionStatus = 'ready' | 'waiting'
export type OwnerApproveStatus = 'approved' | 'rejected'
export type TransactionType = 'SEND'

export const useTransactionsQueue = () => {
  const { safe } = useSafe()
  const {
    data: transactionsQueue,
    error: transactionsQueueError,
    isLoading: transactionsQueueIsLoading
  } = useSafeTxQueue(safe?.address, safe?.chain.chainId, !!safe)

  const { mutateAsync: mutateApproveTransaction, isLoading: isLoadingApprove } =
    useApproveTransactionMutation()

  async function handleApproveTransaction() {
    try {
      if (!safe) throw new Error('no safe infos available')

      const { transactionHash } = await mutateApproveTransaction({
        rpcUrl: safe.chain.rpcUrl,
        safeAddress: safe.address
      })

      console.log('transactionHash =>', transactionHash)
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    }
  }

  return {
    safe,
    transactionsQueue,
    transactionsQueueError,
    transactionsQueueIsLoading,
    handleApproveTransaction,
    isLoadingApprove
  }
}
