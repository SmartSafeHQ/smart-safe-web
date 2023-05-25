import { TransactionLayout } from './TransactionLayout'
import { Collapsible } from '@components/Collapsible'

import { SendTxProps } from '@hooks/safes/retrieve/queries/useSafeTxQueue'
import { PendingSendTransaction } from './TransactionLayout/TransactionLayoutSend/PendingSendTransaction'

interface PendingTransactionProps {
  transaction: SendTxProps
}

export function PendingTransaction({ transaction }: PendingTransactionProps) {
  return (
    <Collapsible.Root defaultOpen={false}>
      <TransactionLayout.Root className="hover:border-zinc-400 hover:dark:border-zinc-500">
        <PendingSendTransaction transaction={transaction} />
      </TransactionLayout.Root>
    </Collapsible.Root>
  )
}
