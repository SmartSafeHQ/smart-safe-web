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

export interface OwnerSignaturesProps {
  status: OwnerApproveStatus
  formattedAddress: string
  address: string
}

export interface SendTxProps {
  nonce: number
  type: 'SEND'
  amount: number
  createdAt: Date
  signatures: OwnerSignaturesProps[]
  to: string
  toFormattedAddress: string
  hash: string
  data: string
  token: {
    symbol: string
    icon: string
  }
}

export interface FetchSafeTxQueueOutput {
  toApprove?: SendTxProps
  pending: SendTxProps[]
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

  const transactionNonce = await contract.getFunction(
    'requiredTransactionNonce'
  )()
  const currenTxQueueNonce = Number(transactionNonce)
  const transactionsQueue = (await contract.getFunction('getTransactions')(
    0,
    0
  )) as []

  console.log(transactionsQueue)

  const formattedTransactionsQueue =
    transactionsQueue.reduce<FetchSafeTxQueueOutput>(
      (acc, transaction) => {
        if (!transaction[4]) {
          return acc
        }

        const transactionData = formatTransactionToQueueList(
          transaction,
          safeChain.chainId
        )

        const formattedTransaction: SendTxProps = {
          ...transactionData,
          type: 'SEND',
          toFormattedAddress: formatWalletAddress({
            walletAddress: transactionData.to
          })
        }

        if (formattedTransaction.nonce === currenTxQueueNonce) {
          acc.toApprove = formattedTransaction
          return acc
        }

        acc.pending.push(formattedTransaction)

        return acc
      },
      {
        toApprove: undefined,
        pending: []
      }
    )

  return formattedTransactionsQueue
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
