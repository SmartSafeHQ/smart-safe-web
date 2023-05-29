import { ReactNode } from 'react'
import Link from 'next/link'

import { TransactionSendItem } from '@components/pages/Home/TransactionQueue/TransactionItemTypes/TransactionSendItem'
import { TransactionAddOwnerItem } from '@components/pages/Home/TransactionQueue/TransactionItemTypes/TransactionAddOwnerItem'
import { TransactionLayout } from '@components/pages/Transactions/TransactionLayout'
import { TransacitonTypes } from '@hooks/safes/retrieve/queries/useSafeTxQueue'

import { useSafe } from '@contexts/SafeContext'

interface HomeTransactionItemProps {
  transaction: TransacitonTypes
  children?: ReactNode
}

export function HomeTransactionItem({
  transaction,
  children
}: HomeTransactionItemProps) {
  const { safe } = useSafe()

  return (
    <Link href={`/dashboard/${safe?.address}/transactions/queue`}>
      <TransactionLayout.Root className="hover:border-zinc-400 hover:dark:border-zinc-500">
        {transaction.type === 'SEND' && (
          <TransactionSendItem transaction={transaction}>
            {children}
          </TransactionSendItem>
        )}

        {transaction.type === 'ADD_OWNER' && (
          <TransactionAddOwnerItem transaction={transaction}>
            {children}
          </TransactionAddOwnerItem>
        )}
      </TransactionLayout.Root>
    </Link>
  )
}
