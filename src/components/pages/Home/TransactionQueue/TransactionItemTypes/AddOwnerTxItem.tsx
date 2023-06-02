import { ReactNode } from 'react'

import { AddOwnerTx } from '@components/pages/Transactions/TransactionsLayout/AddOwnerTx'

import { useSafe } from '@contexts/SafeContext'
import { useSafeOwners } from '@hooks/safe/queries/useSafeOwners'

export interface HomeAddOwnerTxItemProps {
  nonce: number
}

interface AddOwnerTxItemProps {
  transaction: HomeAddOwnerTxItemProps
  children?: ReactNode
}

export function AddOwnerTxItem({ transaction, children }: AddOwnerTxItemProps) {
  const { safe } = useSafe()
  const { data: safeOwners } = useSafeOwners(
    safe?.address,
    safe?.chain.rpcUrl,
    !!safe
  )

  return (
    <AddOwnerTx.Header
      txNonce={transaction.nonce}
      currentOwnersCount={safeOwners?.length}
      newOwnersCount={(safeOwners?.length ?? 0) + 1}
      className="min-h-[2rem] py-2 px-3"
    >
      {children}
    </AddOwnerTx.Header>
  )
}
