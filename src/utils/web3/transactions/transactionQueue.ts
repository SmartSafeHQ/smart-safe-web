import { ethers, formatUnits, verifyMessage } from 'ethers'

import { createTransactionMessage } from '@utils/web3/transactions/createTransactionProposal'

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
  const signatures = transaction[6]

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

  console.log(domain)
  console.log(transactionData)

  const txMessage = createTransactionMessage({
    domain,
    transaction: transactionData
  })

  const formattedSignatures = signatures.map((signature: string) => ({
    address: verifyMessage(txMessage, signature),
    status: 'approved'
  }))

  return {
    nonce,
    amount: Number(formatUnits(value, 'ether')),
    createdAt,
    signatures: formattedSignatures,
    to,
    txHash:
      '0x5f195e0bbeb09b1bbf89b3917d57be79a9c20237379fb392af7ac6beb901de4d',
    token: {
      symbol: 'matic',
      icon: '/networks/polygon-logo.svg'
    }
  }
}
