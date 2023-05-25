import { useConnectWallet } from '@web3-onboard/react'

import { useSafe } from '@contexts/SafeContext'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'
import { useSafeTxQueue } from '@hooks/safes/retrieve/queries/useSafeTxQueue'
import { useApproveTransactionMutation } from '@hooks/transactions/mutation/useApproveTransactionMutation'
import { useRejectTransactionMutation } from '@hooks/transactions/mutation/useRejectTransactionMutation'

export type TransactionStatus = 'ready' | 'waiting'
export type OwnerApproveStatus = 'approved' | 'rejected'
export type TransactionType = 'SEND'

export const useTransactionsQueue = () => {
  const { safe } = useSafe()
  const [{ wallet }] = useConnectWallet()
  const {
    data: transactionsQueue,
    error: transactionsQueueError,
    isLoading: transactionsQueueIsLoading
  } = useSafeTxQueue(safe?.address, safe?.chain.chainId, !!safe)

  const { mutateAsync: mutateApproveTransaction, isLoading: isLoadingApprove } =
    useApproveTransactionMutation()
  const { mutateAsync: mutateRejectTransaction, isLoading: isLoadingReject } =
    useRejectTransactionMutation()

  async function handleApproveTransaction(
    to: string,
    data: string,
    amount: number
  ) {
    try {
      if (!safe || !wallet) {
        throw new Error('no safe and wallet infos available')
      }

      await mutateApproveTransaction({
        chainId: safe.chain.chainId,
        fromSafe: safe.address,
        ownerAddress: wallet.accounts[0].address,
        provider: wallet.provider,
        to,
        data,
        amount
      })
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    }
  }

  async function handleRejectTransaction(
    to: string,
    data: string,
    amount: number
  ) {
    try {
      if (!safe || !wallet) {
        throw new Error('no safe and wallet infos available')
      }

      await mutateRejectTransaction({
        chainId: safe.chain.chainId,
        fromSafe: safe.address,
        ownerAddress: wallet.accounts[0].address,
        provider: wallet.provider,
        to,
        data,
        amount
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
    handleApproveTransaction,
    handleRejectTransaction,
    isLoadingApprove,
    isLoadingReject
  }
}