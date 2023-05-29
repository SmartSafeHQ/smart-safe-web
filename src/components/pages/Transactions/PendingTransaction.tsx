import { TransactionLayout } from './TransactionLayout'
import { Collapsible } from '@components/Collapsible'
import { transactionComponents } from '@components/pages/Transactions/TransactionLayout/TransactionTypes'

import { TransacitonTypes } from '@hooks/safes/retrieve/queries/useSafeTxQueue/interfaces'

interface PendingTransactionProps {
  transaction: TransacitonTypes
}

export function PendingTransaction({ transaction }: PendingTransactionProps) {
  const TxComponent = transactionComponents[transaction.type]

  if (!TxComponent) return null

  return (
    <Collapsible.Root defaultOpen={false}>
      <TransactionLayout.Root className="hover:border-zinc-400 hover:dark:border-zinc-500">
        <TxComponent.Pending transaction={transaction} />
      </TransactionLayout.Root>
    </Collapsible.Root>
  )
}
