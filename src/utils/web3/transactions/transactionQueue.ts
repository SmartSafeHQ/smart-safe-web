import { ethers, formatUnits, verifyMessage } from 'ethers'

import { createTransactionMessage } from '@utils/web3/transactions/createTransactionProposal'
import { formatWalletAddress } from '@utils/web3'
import { OwnerApproveStatus } from '@/hooks/transactions/useTransactionsQueue'

export interface FormatTransactionToQueueListOutput {
  nonce: number
  amount: number
  createdAt: Date
  signatures: {
    status: OwnerApproveStatus
    formattedAddress: string
    address: string
  }[]
  to: string
  data: string
  txHash: string
  token: {
    symbol: string
    icon: string
  }
}

export function formatTransactionToQueueList(
  transaction: any,
  chainId: string
): FormatTransactionToQueueListOutput {
  const from = transaction[0]
  const to = transaction[1]
  const nonce = Number(transaction[2])
  const value = transaction[3]
  const createdAt = new Date(ethers.toNumber(transaction[4]) * 1000)
  const data = transaction[5]
  const signatures = transaction[6] as string[]

  const domain = {
    chainId: parseInt(chainId, 16),
    verifyingContract: from
  }

  const transactionData = {
    from,
    to,
    transactionNonce: nonce,
    value: value.toString(),
    data: ethers.keccak256(data)
  }

  const txMessage = createTransactionMessage({
    domain,
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
    data,
    txHash:
      '0x5f195e0bbeb09b1bbf89b3917d57be79a9c20237379fb392af7ac6beb901de4d',
    token: {
      symbol: 'matic',
      icon: '/networks/polygon-logo.svg'
    }
  }
}
