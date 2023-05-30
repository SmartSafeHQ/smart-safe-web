import { ReactNode } from 'react'

import { TransactionAddOwnerItem } from '@components/pages/Home/TransactionQueue/TransactionItemTypes/TransactionAddOwnerItem'
import { TransactionSendItem } from '@components/pages/Home/TransactionQueue/TransactionItemTypes/TransactionSendItem'

import { PendingAddOwnerTransaction } from '@components/pages/Transactions/TransactionLayout/TransactionLayoutAddOwner/PendingAddOwnerTransaction'
import { ToApproveAddOwnerTransaction } from '@components/pages/Transactions/TransactionLayout/TransactionLayoutAddOwner/ToApproveAddOwnerTransaction'
import { PendingSendTransaction } from '@components/pages/Transactions/TransactionLayout/TransactionLayoutSend/PendingSendTransaction'
import { ToApproveSendTransaction } from '@components/pages/Transactions/TransactionLayout/TransactionLayoutSend/ToApproveSendTransaction'
import { PendingChangeThresholdTransaction } from '@components/pages/Transactions/TransactionLayout/TransactionLayoutChangeThreshold/PendingChangeThresholdTransaction'
import { ToApproveChangeThresholdTransaction } from '@components/pages/Transactions/TransactionLayout/TransactionLayoutChangeThreshold/ToApproveChangeThresholdTransaction'
import { TransactionChangeThresholdItem } from '@components/pages/Home/TransactionQueue/TransactionItemTypes/TransactionChangeThresholdItem'

import { TransactionType } from '@hooks/safes/retrieve/queries/useSafeTxQueue/interfaces'

type TransactionComponentProps = React.ComponentType<{
  transaction: any
  children?: ReactNode
}>

export const transactionComponents: Record<
  TransactionType,
  {
    ToApprove: TransactionComponentProps
    Pending: TransactionComponentProps
    HomeItem: TransactionComponentProps
  }
> = {
  SEND: {
    ToApprove: ToApproveSendTransaction,
    Pending: PendingSendTransaction,
    HomeItem: TransactionSendItem
  },
  ADD_OWNER: {
    ToApprove: ToApproveAddOwnerTransaction,
    Pending: PendingAddOwnerTransaction,
    HomeItem: TransactionAddOwnerItem
  },
  THRESHOLD: {
    ToApprove: ToApproveChangeThresholdTransaction,
    Pending: PendingChangeThresholdTransaction,
    HomeItem: TransactionChangeThresholdItem
  }
}
