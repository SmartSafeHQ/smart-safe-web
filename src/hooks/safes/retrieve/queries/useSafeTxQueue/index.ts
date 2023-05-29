import { JsonRpcProvider } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'
import {
  FORMAT_TRANSACTION_FUCTIONS,
  formatSendTxToQueue,
  formatTransactionToQueueList
} from '@utils/web3/transactions/transactionQueue'
import {
  FetchSafeTxQueueInput,
  FetchSafeTxQueueOutput,
  TransacitonTypes
} from '@hooks/safes/retrieve/queries/useSafeTxQueue/interfaces'

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
  const contract = SmartSafe.connect(input.safeAddress, provider)

  const transactionNonce = await contract.getFunction(
    'requiredTransactionNonce'
  )()
  const currenTxQueueNonce = Number(transactionNonce)
  const transactionsQueue = await contract.getFunction('getTransactions')(0, 0)

  console.log(transactionsQueue)

  const formattedTransactionsQueue =
    transactionsQueue.reduce<FetchSafeTxQueueOutput>(
      (acc, transaction) => {
        if (!transaction[4]) {
          return acc
        }

        const parsedTransaction = contract.interface.parseTransaction({
          data: transaction[5]
        })

        const transactionData = formatTransactionToQueueList(
          transaction,
          safeChain.chainId
        )

        let formattedTransaction: TransacitonTypes

        if (parsedTransaction) {
          const formatTransactionFunction = FORMAT_TRANSACTION_FUCTIONS.get(
            parsedTransaction.name
          )

          if (!formatTransactionFunction) {
            throw new Error('transaction type not supported')
          }

          formattedTransaction = formatTransactionFunction(
            transactionData,
            parsedTransaction
          )
        } else {
          formattedTransaction = formatSendTxToQueue(transactionData)
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
