import { ReactNode } from 'react'

import { AddOwnerTx } from '@components/pages/Transactions/TransactionsLayout/AddOwnerTx'

import { useSafeOwnersCount } from '@hooks/transactions/queries/useSafeOwnersCount'
import { useSafe } from '@contexts/SafeContext'

export interface HomeAddOwnerTxItemProps {
  nonce: number
}

interface AddOwnerTxItemProps {
  transaction: HomeAddOwnerTxItemProps
  children?: ReactNode
}

export function AddOwnerTxItem({ transaction, children }: AddOwnerTxItemProps) {
  const { safe } = useSafe()
  const { data: ownersCount } = useSafeOwnersCount(safe?.address, !!safe)

  return (
    <AddOwnerTx.Header
      txNonce={transaction.nonce}
      currentOwnersCount={ownersCount}
      newOwnersCount={(ownersCount ?? 0) + 1}
      className="min-h-[2rem] py-2 px-3"
    >
      {children}
    </AddOwnerTx.Header>
  )
}
