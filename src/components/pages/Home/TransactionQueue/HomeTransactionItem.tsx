import { ReactNode } from 'react'
import Link from 'next/link'

import { TransactionLayout } from '@components/pages/Transactions/TransactionLayout'
import { transactionComponents } from '@components/pages/Transactions/TransactionLayout/TransactionTypes'

import { useSafe } from '@contexts/SafeContext'
import { TransacitonTypes } from '@hooks/safes/retrieve/queries/useSafeTxQueue/interfaces'

interface HomeTransactionItemProps {
  transaction: TransacitonTypes
  children?: ReactNode
}

export function HomeTransactionItem({
  transaction,
  children
}: HomeTransactionItemProps) {
  const { safe } = useSafe()

  const TxComponent = transactionComponents[transaction.type]

  if (!TxComponent) return null

  return (
    <Link href={`/dashboard/${safe?.address}/transactions/queue`}>
      <TransactionLayout.Root className="hover:border-zinc-400 hover:dark:border-zinc-500">
        <TxComponent.HomeItem transaction={transaction}>
          {children}
        </TxComponent.HomeItem>
      </TransactionLayout.Root>
    </Link>
  )
}
