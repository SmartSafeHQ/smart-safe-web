import { ReactNode } from 'react'

import { AddOwnerTxItem } from '../../Home/TransactionQueue/TransactionItemTypes/AddOwnerTxItem'
import { SendTxItem } from '../../Home/TransactionQueue/TransactionItemTypes/SendTxItem'

import { PendingAddOwnerTx } from './AddOwnerTx/PendingAddOwnerTx'
import { ToApproveAddOwnerTx } from './AddOwnerTx/ToApproveAddOwnerTx'
import { PendingSendTx } from './SendTx/PendingSendTx'
import { ToApproveSendTx } from './SendTx/ToApproveSendTx'
import { PendingChangeThresholdTx } from './ChangeThresholdTx/PendingChangeThresholdTx'
import { ToApproveChangeThresholdTx } from './ChangeThresholdTx/ToApproveChangeThresholdTx'
import { ChangeThresholdTxItem } from '../../Home/TransactionQueue/TransactionItemTypes/ChangeThresholdTxItem'
import { ScheduledTxItem } from '../../Home/TransactionQueue/TransactionItemTypes/ScheduledTxItem'
import { ToApproveScheduledTx } from './ScheduledTx/ToApproveScheduledTx'
import { PendingScheduledTx } from './ScheduledTx/PendingScheduledTx'

import { TransactionType } from '@hooks/transactions/queries/useSafeTxQueue/interfaces'

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
    ToApprove: ToApproveSendTx,
    Pending: PendingSendTx,
    HomeItem: SendTxItem
  },
  ADD_OWNER: {
    ToApprove: ToApproveAddOwnerTx,
    Pending: PendingAddOwnerTx,
    HomeItem: AddOwnerTxItem
  },
  THRESHOLD: {
    ToApprove: ToApproveChangeThresholdTx,
    Pending: PendingChangeThresholdTx,
    HomeItem: ChangeThresholdTxItem
  },
  SCHEDULED: {
    ToApprove: ToApproveScheduledTx,
    Pending: PendingScheduledTx,
    HomeItem: ScheduledTxItem
  }
}
