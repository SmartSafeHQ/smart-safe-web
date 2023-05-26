import { TransactionLayout } from './TransactionLayout'

import { SendTxProps } from '@hooks/safes/retrieve/queries/useSafeTxQueue'
import { ToApproveSendTransaction } from './TransactionLayout/TransactionLayoutSend/ToApproveSendTransaction'

interface ToApproveTransactionProps {
  transaction: SendTxProps
}

export function ToApproveTransaction({
  transaction
}: ToApproveTransactionProps) {
  return (
    <TransactionLayout.Root asChild>
      <main>
        <ToApproveSendTransaction transaction={transaction} />
      </main>
    </TransactionLayout.Root>
  )
}
