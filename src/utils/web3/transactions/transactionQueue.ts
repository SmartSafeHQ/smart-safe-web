import {
  TransactionDescription,
  ethers,
  formatUnits,
  verifyMessage
} from 'ethers'
import { formatWalletAddress } from '@utils/web3'

import { createTransactionMessage } from '@utils/web3/transactions/createTransactionProposal'
import {
  ChangeOwnersTxProps,
  DefaultTxProps,
  OwnerApproveStatus,
  SendTxProps,
  ThresholdTxProps,
  TransacitonTypes
} from '@hooks/safes/retrieve/queries/useSafeTxQueue/interfaces'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'

export function formatTransactionToQueueList(
  transaction: any,
  chainId: string
) {
  const from = transaction[0]
  const to = transaction[1]
  const nonce = Number(transaction[2])
  const value = transaction[3]
  const createdAt = new Date(ethers.toNumber(transaction[4]) * 1000)
  const data = transaction[5]
  const signatures = transaction[6] as string[]

  const transactionData = {
    chainId: parseInt(chainId, 16),
    from,
    to,
    transactionNonce: nonce,
    value: value.toString(),
    data: ethers.keccak256(data)
  }

  const txMessage = createTransactionMessage({
    transaction: transactionData
  })

  const formattedSignatures = signatures.map(signature => {
    const address = verifyMessage(txMessage, signature)

    return {
      address,
      formattedAddress: formatWalletAddress({
        walletAddress: address
      }),
      status: 'approved' as OwnerApproveStatus
    }
  })

  return {
    nonce,
    amount: Number(formatUnits(value, 'ether')),
    createdAt,
    signatures: formattedSignatures,
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
