import { ReactNode } from 'react'

import { TransactionLayoutChangeThreshold } from '@components/pages/Transactions/TransactionLayout/TransactionLayoutChangeThreshold'

import { useSafe } from '@contexts/SafeContext'

export interface HomeChangeThresholdTxItemProps {
  nonce: number
  newThreshold: number
}

interface TransactionChangeThresholdItemProps {
  transaction: HomeChangeThresholdTxItemProps
  children?: ReactNode
}

export function TransactionChangeThresholdItem({
  transaction,
  children
}: TransactionChangeThresholdItemProps) {
  const { safe } = useSafe()

  return (
    <TransactionLayoutChangeThreshold.Header
      txNonce={transaction.nonce}
      currentThreshold={safe?.threshold}
      newThreshold={transaction.newThreshold}
      className="min-h-[2rem] py-2 px-3"
    >
      {children}
    </TransactionLayoutChangeThreshold.Header>
  )
}
