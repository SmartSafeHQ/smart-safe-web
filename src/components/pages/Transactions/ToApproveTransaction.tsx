import { TransactionLayout } from './TransactionLayout'

import { TransacitonTypes } from '@hooks/safes/retrieve/queries/useSafeTxQueue'
import { ToApproveSendTransaction } from './TransactionLayout/TransactionLayoutSend/ToApproveSendTransaction'
import { ToApproveAddOwnerTransaction } from './TransactionLayout/TransactionLayoutAddOwner/ToApproveAddOwnerTransaction'

interface ToApproveTransactionProps {
  transaction: TransacitonTypes
}

export function ToApproveTransaction({
  transaction
}: ToApproveTransactionProps) {
  return (
    <TransactionLayout.Root asChild>
      <main>
        {transaction.type === 'SEND' && (
          <ToApproveSendTransaction transaction={transaction} />
        )}

        {transaction.type === 'ADD_OWNER' && (
          <ToApproveAddOwnerTransaction transaction={transaction} />
        )}
      </main>
    </TransactionLayout.Root>
  )
}
