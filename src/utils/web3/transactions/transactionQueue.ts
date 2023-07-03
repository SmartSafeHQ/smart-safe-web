import {
  JsonRpcProvider,
  TransactionDescription,
  ethers,
  formatUnits
} from 'ethers'
import { formatWalletAddress, getTokenIconUrl } from '@utils/web3'

import { SmartSafe } from '@utils/web3/typings/SmartSafe'
import {
  ChangeOwnersTxProps,
  DefaultTxProps,
  OwnerApproveStatus,
  OwnerSignaturesProps,
  ThresholdTxProps,
  TransacitonTypes,
  SendScheduleTypes
} from '@hooks/transactions/queries/useSafeTxQueue/interfaces'
import { TransactionApprovalStatus } from '@hooks/transactions/useTransactionsQueue'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'

export const AUTOMATION_TIME_TRIGGERS = new Map([
  [60, { title: 'every minute', description: 'Every minute' }],
  [300, { title: 'every 5 minutes', description: 'Every 5 minutes' }],
  [3600, { title: 'every hour', description: 'Every hour' }],
  [86400, { title: 'every day', description: 'Every day' }],
  [604800, { title: 'every week', description: 'Weekly: every Monday' }],
  [
    2592000,
    {
      title: 'every month',
      description: 'Monthly on the first day of the month'
    }
  ],
  [
    31536000,
    {
      title: 'every year',
      description: 'Yearly on the first day of the year'
    }
  ]
])

export async function formatTransactionToQueueList(
  transaction: any,
  contract: SmartSafe
): Promise<DefaultTxProps> {
  const to = transaction[1]
  const nonce = Number(transaction[2])
  const value = transaction[3]
  const createdAt = new Date(ethers.toNumber(transaction[4]) * 1000)
  const data = transaction[5]

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
      formattedAddress: formatWalletAddress(signatureAddress),
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
    formattedAddress: formatWalletAddress(to),
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

export async function formatSafeSendTokensTx(
  transactionData: DefaultTxProps,
  scheduledTrigger: number,
  chainId: string
): Promise<TransacitonTypes> {
  const safeChain = CHAINS_ATTRIBUTES.find(chain => chain.chainId === chainId)

  if (!safeChain) throw new Error('chain not supported')

  const isScheduledTransaction = Number(scheduledTrigger)

  const token = {
    symbol: safeChain.symbol,
    icon: safeChain.icon
  }

  if (transactionData.data !== '0x') {
    const provider = new JsonRpcProvider(safeChain.rpcUrl)
    const erc20ABI = ['function symbol() view returns (string)']
    const contract = new ethers.Contract(transactionData.to, erc20ABI, provider)

    const symbol = await contract.getFunction('symbol')()

    const IERC20 = ['function transfer(address _to, uint256 _amount)']
    const transferDecodedData = new ethers.Interface(IERC20).decodeFunctionData(
      'transfer',
      transactionData.data
    )

    token.symbol = symbol
    token.icon = getTokenIconUrl(symbol)

    transactionData.amount = Number(
      formatUnits(transferDecodedData[1], 'ether')
    )
    transactionData.to = transferDecodedData[0]
    transactionData.formattedAddress = formatWalletAddress(
      transferDecodedData[0]
    )
  }

  if (isScheduledTransaction) {
    const scheduleData = formatScheduledTxToQueue(isScheduledTransaction)

    return {
      ...transactionData,
      ...scheduleData,
      type: 'SCHEDULED',
      token
    }
  } else {
    return {
      ...transactionData,
      type: 'SEND',
      token
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
    formattedAddress: formatWalletAddress(ownerAddress)
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

export function formatScheduledTxToQueue(trigger: number) {
  const scheduledTransaction = AUTOMATION_TIME_TRIGGERS.get(trigger)

  if (!scheduledTransaction) {
    throw new Error('transaction schedule type not supported')
  }

  return {
    triggerTitle: scheduledTransaction.title,
    triggerType: 'time' as SendScheduleTypes
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
