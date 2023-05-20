import { useSafe } from '@contexts/SafeContext'
import { useSafeTxQueue } from '@hooks/safes/retrieve/queries/useSafeTxQueue'

export type TransactionStatus = 'ready' | 'waiting'
export type OwnerApproveStatus = 'approved' | 'rejected'
export type TransactionType = 'SEND'

export const useTransactionsQueue = () => {
  const { safe } = useSafe()
  const {
    data: transactionsQueue,
    error,
    isLoading
  } = useSafeTxQueue(safe?.address, safe?.chain.chainId, !!safe)

  return {
    safe,
    transactionsQueue,
    error,
    isLoading
  }
}
