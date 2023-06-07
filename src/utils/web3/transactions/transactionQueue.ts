import { TransactionDescription, ethers, formatUnits } from 'ethers'
import { formatWalletAddress } from '@utils/web3'

import { SmartSafe } from '@utils/web3/typings/SmartSafe'
import {
  ChangeOwnersTxProps,
  DefaultTxProps,
  OwnerApproveStatus,
  OwnerSignaturesProps,
  ScheduledTxProps,
  SendTxProps,
  ThresholdTxProps,
  TransacitonTypes
} from '@hooks/transactions/queries/useSafeTxQueue/interfaces'
import { TransactionApprovalStatus } from '@hooks/transactions/useTransactionsQueue'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'

export const AUTOMATION_TRIGGERS = new Map([
  [1, { title: 'every minute', description: 'Every minute' }],
  [2, { title: 'every 5 minutes', description: 'Every 5 minutes' }],
  [3, { title: 'every hour', description: 'Every hour' }],
  [4, { title: 'every day', description: 'Every day' }],
  [5, { title: 'every week', description: 'Weekly: every Monday' }],
  [
    6,
    {
      title: 'every month',
      description: 'Monthly on the first day of the month'
    }
  ],
  [
    7,
    {
      title: 'every year',
      description: 'Yearly on the first day of the year'
    }
  ]
])

export async function formatTransactionToQueueList(
  transaction: any,
  contract: SmartSafe,
  chainId: string
): Promise<DefaultTxProps> {
  const from = transaction[0]
  const to = transaction[1]
  const nonce = Number(transaction[2])
  const value = transaction[3]
  const createdAt = new Date(ethers.toNumber(transaction[4]) * 1000)
  const data = transaction[5]

  const transactionData = {
    chainId: parseInt(chainId, 16),
    from,
    to,
    transactionNonce: nonce,
    value: value.toString(),
    data: ethers.keccak256(data)
  }

  const approvals = await contract.getFunction('getTransactionApprovals')(nonce)

  const ownersSignatures: OwnerSignaturesProps[] = []
  let approvesCount = 0

  approvals.forEach(approval => {
    const signatureAddress = approval[0]
    const signatureVote = Number(approval[1])
    let signatureStatus: OwnerApproveStatus = 'rejected'

    if (typeof signatureAddress !== 'string') return

    if (signatureVote === TransactionApprovalStatus.APPROVED) {
      approvesCount++
      signatureStatus = 'approved'
    }

    ownersSignatures.push({
      address: signatureAddress,
      formattedAddress: formatWalletAddress({
        walletAddress: signatureAddress
      }),
      status: signatureStatus
    })
  })

  return {
    nonce,
    amount: Number(formatUnits(value, 'ether')),
    createdAt,
    signatures: {
      list: ownersSignatures,
      approvesCount
    },
    to,
    formattedAddress: formatWalletAddress({
      walletAddress: transactionData.to
    }),
    data,
    hash: '0x5f195e0bbeb09b1bbf89b3917d57be79a9c20237379fb392af7ac6beb901de4d'
  }
}

export function formatSafeSettingsUpdateTx(
  parsedTransaction: TransactionDescription,
  transactionData: DefaultTxProps
): TransacitonTypes {
  const formatTransactionFunction = FORMAT_TRANSACTION_FUCTIONS.get(
    parsedTransaction.name
  )

  if (!formatTransactionFunction) {
    throw new Error('transaction type not supported')
  }

  const formatedTx = formatTransactionFunction(
    transactionData,
    parsedTransaction
  )

  return formatedTx
}

export function formatSafeSendTokensTx(
  transactionData: DefaultTxProps,
  scheduledTrigger: number,
  chainId: string
): TransacitonTypes {
  const isScheduledTransaction = Number(scheduledTrigger)

  let formatedTx: TransacitonTypes

  if (isScheduledTransaction) {
    formatedTx = formatScheduledTxToQueue(
      transactionData,
      isScheduledTransaction,
      chainId
    )
  } else {
    formatedTx = formatSendTxToQueue(transactionData, chainId)
  }

  return formatedTx
}

export function formatSendTxToQueue(
  transaction: DefaultTxProps,
  chainId: string
): SendTxProps {
  const safeChain = CHAINS_ATTRIBUTES.find(chain => chain.chainId === chainId)

  return {
    ...transaction,
    type: 'SEND',
    token: {
      symbol: safeChain?.symbol ?? 'matic',
      icon: safeChain?.icon ?? '/networks/polygon-logo.svg'
    }
  }
}

export function formatAddOwnerTxToQueue(
  transaction: DefaultTxProps,
  parsedTransaction: TransactionDescription
): ChangeOwnersTxProps {
  const ownerAddress = parsedTransaction.args[0]

  return {
    ...transaction,
    type: 'ADD_OWNER',
    ownerAddress,
    formattedAddress: formatWalletAddress({
      walletAddress: ownerAddress
    })
  }
}

export function formatThresholdTxToQueue(
  transaction: DefaultTxProps,
  parsedTransaction: TransactionDescription
): ThresholdTxProps {
  const newThreshold = Number(parsedTransaction.args[0])

  return {
    ...transaction,
    type: 'THRESHOLD',
    newThreshold
  }
}

export function formatScheduledTxToQueue(
  transaction: DefaultTxProps,
  trigger: number,
  chainId: string
): ScheduledTxProps {
  const safeChain = CHAINS_ATTRIBUTES.find(chain => chain.chainId === chainId)

  const scheduledTransaction = AUTOMATION_TRIGGERS.get(trigger)

  if (!scheduledTransaction) {
    throw new Error('transaction schedule type not supported')
  }

  return {
    ...transaction,
    type: 'SCHEDULED',
    triggerTitle: scheduledTransaction.title,
    triggerType: 'time',
    token: {
      symbol: safeChain?.symbol ?? 'matic',
      icon: safeChain?.icon ?? '/networks/polygon-logo.svg'
    }
  }
}

type TxFormatFunction = (
  transaction: DefaultTxProps,
  parsedTransaction: TransactionDescription
) => TransacitonTypes

export const FORMAT_TRANSACTION_FUCTIONS = new Map<string, TxFormatFunction>([
  [
    'addNewOwner',
    (transaction: DefaultTxProps, parsedTransaction: TransactionDescription) =>
      formatAddOwnerTxToQueue(transaction, parsedTransaction)
  ],
  [
    'changeThreshold',
    (transaction: DefaultTxProps, parsedTransaction: TransactionDescription) =>
      formatThresholdTxToQueue(transaction, parsedTransaction)
  ]
])
