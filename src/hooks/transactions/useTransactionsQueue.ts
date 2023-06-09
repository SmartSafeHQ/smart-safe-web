import { useConnectWallet } from '@web3-onboard/react'

import { useSafe } from '@contexts/SafeContext'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'
import { useSafeTxQueue } from '@hooks/transactions/queries/useSafeTxQueue'
import { useApproveTransactionMutation } from '@hooks/transactions/mutation/useApproveTransactionMutation'
import { useRejectTransactionMutation } from '@hooks/transactions/mutation/useRejectTransactionMutation'

export enum TransactionApprovalStatus {
  AWAITING,
  APPROVED,
  REJECTED
}

export const useTransactionsQueue = () => {
  const { safe } = useSafe()
  const [{ wallet }] = useConnectWallet()
  const {
    data: transactionsQueue,
    error: transactionsQueueError,
    isRefetching: transactionsQueueIsRefetching,
    isLoading: transactionsQueueIsLoading
  } = useSafeTxQueue(safe?.address, safe?.chain.chainId, !!safe)

  const { mutateAsync: mutateApproveTransaction, isLoading: isLoadingApprove } =
    useApproveTransactionMutation()
  const { mutateAsync: mutateRejectTransaction, isLoading: isLoadingReject } =
    useRejectTransactionMutation()

  async function handleApproveTransaction() {
    try {
      if (!safe || !wallet || !transactionsQueue?.toApprove) {
        throw new Error('no safe and wallet infos available')
      }

      const isScheduledApprove =
        transactionsQueue.toApprove.type === 'SCHEDULED' &&
        safe.threshold <=
          transactionsQueue.toApprove.signatures.approvesCount + 1

      await mutateApproveTransaction({
        chainId: safe.chain.chainId,
        safeAddress: safe.address,
        ownerAddress: wallet.accounts[0].address,
        provider: wallet.provider,
        to: transactionsQueue.toApprove.to,
        data: transactionsQueue.toApprove.data,
        amount: transactionsQueue.toApprove.amount,
        nonce: transactionsQueue.toApprove.nonce,
        isScheduledApprove
      })
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    }
  }

  async function handleRejectTransaction() {
    try {
      if (!safe || !wallet || !transactionsQueue?.toApprove) {
        throw new Error('no safe and wallet infos available')
      }

      await mutateRejectTransaction({
        chainId: safe.chain.chainId,
        safeAddress: safe.address,
        ownerAddress: wallet.accounts[0].address,
        provider: wallet.provider,
        to: transactionsQueue.toApprove.to,
        data: transactionsQueue.toApprove.data,
        amount: transactionsQueue.toApprove.amount
      })
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    }
  }

  return {
    safe,
    transactionsQueue,
    transactionsQueueError,
    transactionsQueueIsLoading,
    transactionsQueueIsRefetching,
    handleApproveTransaction,
    handleRejectTransaction,
    isLoadingApprove,
    isLoadingReject
  }
}
