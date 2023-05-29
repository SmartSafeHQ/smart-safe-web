import { TransactionLayout } from './TransactionLayout'
import { Collapsible } from '@components/Collapsible'

import { TransacitonTypes } from '@hooks/safes/retrieve/queries/useSafeTxQueue/interfaces'
import { PendingSendTransaction } from './TransactionLayout/TransactionLayoutSend/PendingSendTransaction'
import { PendingAddOwnerTransaction } from '@components/pages/Transactions/TransactionLayout/TransactionLayoutAddOwner/PendingAddOwnerTransaction'

interface PendingTransactionProps {
  transaction: TransacitonTypes
}

export function PendingTransaction({ transaction }: PendingTransactionProps) {
  return (
    <Collapsible.Root defaultOpen={false}>
      <TransactionLayout.Root className="hover:border-zinc-400 hover:dark:border-zinc-500">
        {transaction.type === 'SEND' && (
          <PendingSendTransaction transaction={transaction} />
        )}

        {transaction.type === 'ADD_OWNER' && (
          <PendingAddOwnerTransaction transaction={transaction} />
        )}
      </TransactionLayout.Root>
    </Collapsible.Root>
  )
}
