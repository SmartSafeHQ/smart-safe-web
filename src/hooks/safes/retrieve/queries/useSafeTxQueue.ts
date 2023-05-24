import { Contract, JsonRpcProvider } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { formatWalletAddress } from '@utils/web3'
import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'
import { OwnerApproveStatus } from '@hooks/transactions/useTransactionsQueue'
import { formatTransactionToQueueList } from '@utils/web3/transactions/transactionQueue'

interface FetchSafeTxQueueInput {
  safeAddress?: string
  chainId?: string
}

export interface FetchSafeSendTxProps {
  nonce: number
  type: 'SEND'
  amount: number
  createdAt: Date
  signatures: { status: OwnerApproveStatus; address: string }[]
  toAddress: string
  toFormattedAddress: string
  txHash: string
  token: {
    symbol: string
    icon: string
  }
}

export interface FetchSafeTxQueueOutput {
  toApprove?: FetchSafeSendTxProps
  pending: FetchSafeSendTxProps[]
}

export async function fetchSafeTxQueue(
  input: FetchSafeTxQueueInput
): Promise<FetchSafeTxQueueOutput> {
  if (!input.safeAddress || !input.chainId) {
    throw new Error('safe address and chain id required')
  }

  const safeChain = CHAINS_ATTRIBUTES.find(
    chain => chain.chainId === input.chainId
  )

  if (!safeChain) throw new Error('Chain not supported')

  const provider = new JsonRpcProvider(safeChain.rpcUrl)
  const contract = new Contract(input.safeAddress, SMART_SAFE_ABI, provider)

  const transactionNonce = await contract.getFunction('transactionNonce')()
  const currenTxQueueNonce = Number(transactionNonce) - 1
  const transactionsQueue = await contract.getFunction('getTransactions')(0, 0)

  const findTxToApprove = transactionsQueue.find(
    (transaction: any) => Number(transaction[2]) === currenTxQueueNonce
  )

  const txToApprove = formatTransactionToQueueList(
    findTxToApprove,
    input.chainId
  )

  console.log(txToApprove)
  console.log(transactionsQueue)

  return {
    toApprove: {
      nonce: txToApprove.nonce,
      type: 'SEND',
      amount: txToApprove.amount,
      createdAt: txToApprove.createdAt,
      signatures: txToApprove.signatures,
      toAddress: txToApprove.to,
      toFormattedAddress: formatWalletAddress({
        walletAddress: txToApprove.to
      }),
      txHash: txToApprove.txHash,
      token: txToApprove.token
    },
    pending: [
      {
        nonce: 2,
        type: 'SEND',
        amount: 0.2,
        createdAt: new Date(),
        signatures: [
          {
            address: '0x45e99255C041b69C8e3771b286Cae2EDA5622fA1',
            status: 'approved'
          },
          {
            address: '0x45e99255C041b69G8e3771b286Cae2EDA5622fA1',
            status: 'approved'
          }
        ],
        toAddress: '0x7f79b85B062a81197196b33EB573D0B98973781A',
        toFormattedAddress: '0x7f7...781A',
        txHash:
          '0x5f195e0bbeb09b1bbf89b3917d57be79a9c20237379fb392af7ac6beb901de4d',
        token: {
          symbol: 'matic',
          icon: '/networks/polygon-logo.svg'
        }
      }
    ]
  }
}

export function useSafeTxQueue(
  safeAddress?: string,
  chainId?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['safeTxQueue', safeAddress],
    queryFn: () => fetchSafeTxQueue({ safeAddress, chainId }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
