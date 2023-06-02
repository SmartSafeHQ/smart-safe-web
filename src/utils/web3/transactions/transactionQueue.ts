import { TransactionDescription, ethers, formatUnits } from 'ethers'
import { formatWalletAddress } from '@utils/web3'

import { SmartSafe } from '@utils/web3/typings/SmartSafe'
import {
  ChangeOwnersTxProps,
  DefaultTxProps,
  OwnerApproveStatus,
  OwnerSignaturesProps,
  SendTxProps,
  ThresholdTxProps,
  TransacitonTypes
} from '@hooks/transactions/queries/useSafeTxQueue/interfaces'
import { TransactionApprovalStatus } from '@hooks/transactions/useTransactionsQueue'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'

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
