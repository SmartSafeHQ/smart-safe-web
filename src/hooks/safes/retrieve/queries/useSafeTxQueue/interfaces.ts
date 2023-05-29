import { OwnerApproveStatus } from '@hooks/transactions/useTransactionsQueue'

export interface FetchSafeTxQueueInput {
  safeAddress?: string
  chainId?: string
}

export interface OwnerSignaturesProps {
  status: OwnerApproveStatus
  formattedAddress: string
  address: string
}

export interface DefaultTxProps {
  nonce: number
  amount: number
  createdAt: Date
  signatures: OwnerSignaturesProps[]
  to: string
  formattedAddress: string
  hash: string
  data: string
}

export interface SendTxProps extends DefaultTxProps {
  type: 'SEND'
  token: {
    symbol: string
    icon: string
  }
}

export interface ChangeOwnersTxProps extends DefaultTxProps {
  type: 'ADD_OWNER'
  ownerAddress: string
}

export type TransacitonTypes = SendTxProps | ChangeOwnersTxProps

export interface FetchSafeTxQueueOutput {
  toApprove?: TransacitonTypes
  pending: TransacitonTypes[]
}
