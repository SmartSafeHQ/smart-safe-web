import { ReactNode } from 'react'

import { ScheduledTx } from '@components/pages/Transactions/TransactionsLayout/ScheduledTx'

import { SendScheduleTypes } from '@hooks/transactions/queries/useSafeTxQueue/interfaces'

export interface HomeScheduledTxItemProps {
  nonce: number
  amount: number
  triggerType: SendScheduleTypes
  triggerTitle: string
  token: {
    symbol: string
    icon: string
  }
}

interface ScheduledTxItemProps {
  transaction: HomeScheduledTxItemProps
  children?: ReactNode
}

export function ScheduledTxItem({
  transaction,
  children
}: ScheduledTxItemProps) {
  return (
    <ScheduledTx.Header
      txNonce={transaction.nonce}
      amount={transaction.amount}
      triggerType={transaction.triggerType}
      triggerTitle={transaction.triggerTitle}
      token={transaction.token}
      className="min-h-[2rem] py-2 px-3"
    >
      {children}
    </ScheduledTx.Header>
  )
}
