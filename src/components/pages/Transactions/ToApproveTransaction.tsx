import { TransactionLayout } from './TransactionLayout'
import { transactionComponents } from '@components/pages/Transactions/TransactionLayout/TransactionTypes'

import { TransacitonTypes } from '@hooks/safes/retrieve/queries/useSafeTxQueue/interfaces'

interface ToApproveTransactionProps {
  transaction: TransacitonTypes
}

export function ToApproveTransaction({
  transaction
}: ToApproveTransactionProps) {
  const TxComponent = transactionComponents[transaction.type]

  if (!TxComponent) return null

  return (
    <TransactionLayout.Root asChild>
      <main>
        <TxComponent.ToApprove transaction={transaction} />
      </main>
    </TransactionLayout.Root>
  )
}
