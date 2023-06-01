import { Transaction } from './TransactionsLayout'
import { Collapsible } from '@components/Collapsible'
import { transactionComponents } from '@components/pages/Transactions/TransactionsLayout/TransactionTypes'

import { TransacitonTypes } from '@hooks/safe/queries/useSafeTxQueue/interfaces'

interface PendingTransactionProps {
  transaction: TransacitonTypes
}

export function PendingTransaction({ transaction }: PendingTransactionProps) {
  const TxComponent = transactionComponents[transaction.type]

  if (!TxComponent) return null

  return (
    <Collapsible.Root defaultOpen={false}>
      <Transaction.Root className="hover:border-zinc-400 hover:dark:border-zinc-500">
        <TxComponent.Pending transaction={transaction} />
      </Transaction.Root>
    </Collapsible.Root>
  )
}
