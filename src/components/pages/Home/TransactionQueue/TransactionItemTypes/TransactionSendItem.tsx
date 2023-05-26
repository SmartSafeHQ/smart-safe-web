import { ReactNode } from 'react'

import { TransactionLayoutSend } from '@components/pages/Transactions/TransactionLayout/TransactionLayoutSend'

export interface HomeSendTxItemProps {
  nonce: number
  amount: number
  token: {
    symbol: string
    icon: string
  }
}

interface TransactionSendItemProps {
  transaction: HomeSendTxItemProps
  children?: ReactNode
}

export function TransactionSendItem({
  transaction,
  children
}: TransactionSendItemProps) {
  return (
    <TransactionLayoutSend.Header
      txNonce={transaction.nonce}
      amount={transaction.amount}
      token={transaction.token}
      className="min-h-[2rem] py-2 px-3"
    >
      {children}
    </TransactionLayoutSend.Header>
  )
}
