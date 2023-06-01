import { Transaction } from './TransactionsLayout'
import { transactionComponents } from '@components/pages/Transactions/TransactionsLayout/TransactionTypes'

import { TransacitonTypes } from '@hooks/transactions/queries/useSafeTxQueue/interfaces'

interface ToApproveTransactionProps {
  transaction: TransacitonTypes
}

export function ToApproveTransaction({
  transaction
}: ToApproveTransactionProps) {
  const TxComponent = transactionComponents[transaction.type]

  if (!TxComponent) return null

  return (
    <Transaction.Root asChild>
      <main>
        <TxComponent.ToApprove transaction={transaction} />
      </main>
    </Transaction.Root>
  )
}
