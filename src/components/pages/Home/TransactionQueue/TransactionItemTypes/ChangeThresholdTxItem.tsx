import { ReactNode } from 'react'

import { ChangeThresholdTx } from '@/components/pages/Transactions/TransactionsLayout/ChangeThresholdTx'

import { useSafe } from '@contexts/SafeContext'

export interface HomeChangeThresholdTxItemProps {
  nonce: number
  newThreshold: number
}

interface ChangeThresholdTxItemProps {
  transaction: HomeChangeThresholdTxItemProps
  children?: ReactNode
}

export function ChangeThresholdTxItem({
  transaction,
  children
}: ChangeThresholdTxItemProps) {
  const { safe } = useSafe()

  return (
    <ChangeThresholdTx.Header
      txNonce={transaction.nonce}
      currentThreshold={safe?.threshold}
      newThreshold={transaction.newThreshold}
      className="min-h-[2rem] py-2 px-3"
    >
      {children}
    </ChangeThresholdTx.Header>
  )
}
