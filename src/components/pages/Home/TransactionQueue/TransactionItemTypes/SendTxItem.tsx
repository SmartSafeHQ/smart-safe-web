import { ReactNode } from 'react'

import { SendTx } from '@components/pages/Transactions/TransactionsLayout/SendTx'

export interface HomeSendTxItemProps {
  nonce: number
  amount: number
  token: {
    symbol: string
    icon: string
  }
}

interface SendTxItemProps {
  transaction: HomeSendTxItemProps
  children?: ReactNode
}

export function SendTxItem({ transaction, children }: SendTxItemProps) {
  return (
    <SendTx.Header
      txNonce={transaction.nonce}
      amount={transaction.amount}
      token={transaction.token}
      className="min-h-[2rem] py-2 px-3"
    >
      {children}
    </SendTx.Header>
  )
}
