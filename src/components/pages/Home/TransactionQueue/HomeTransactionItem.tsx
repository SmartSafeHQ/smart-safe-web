import { ReactNode } from 'react'
import Link from 'next/link'

import {
  HomeSendTxItemProps,
  TransactionSendItem
} from '@components/pages/Home/TransactionQueue/TransactionItemTypes/TransactionSendItem'
import { TransactionLayout } from '@components/pages/Transactions/TransactionLayout'

import { useSafe } from '@contexts/SafeContext'

interface HomeTransactionItemProps {
  transaction: HomeSendTxItemProps
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
        <TransactionSendItem transaction={transaction}>
          {children}
        </TransactionSendItem>
      </TransactionLayout.Root>
    </Link>
  )
}
