import { ReactNode } from 'react'

import { TransactionLayoutAddOwner } from '@components/pages/Transactions/TransactionLayout/TransactionLayoutAddOwner'

import { useGetOwnersCount } from '@hooks/transactions/queries/useGetOwnersCount'
import { useSafe } from '@contexts/SafeContext'

export interface HomeAddOwnerTxItemProps {
  nonce: number
}

interface TransactionAddOwnerItemProps {
  transaction: HomeAddOwnerTxItemProps
  children?: ReactNode
}

export function TransactionAddOwnerItem({
  transaction,
  children
}: TransactionAddOwnerItemProps) {
  const { safe } = useSafe()
  const { data: ownersCount } = useGetOwnersCount({
    safeAddress: safe?.address || '',
    enabled: !!safe
  })

  return (
    <TransactionLayoutAddOwner.Header
      txNonce={transaction.nonce}
      currentOwnersCount={ownersCount}
      newOwnersCount={(ownersCount ?? 0) + 1}
      className="min-h-[2rem] py-2 px-3"
    >
      {children}
    </TransactionLayoutAddOwner.Header>
  )
}
