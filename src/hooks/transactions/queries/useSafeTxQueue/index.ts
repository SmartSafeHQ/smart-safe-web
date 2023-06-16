import { JsonRpcProvider } from 'ethers'
import { useQuery } from '@tanstack/react-query'

import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'
import {
  formatSafeSendTokensTx,
  formatSafeSettingsUpdateTx,
  formatTransactionToQueueList
} from '@utils/web3/transactions/transactionQueue'
import {
  FetchSafeTxQueueInput,
  FetchSafeTxQueueOutput,
  TransacitonTypes
} from '@hooks/transactions/queries/useSafeTxQueue/interfaces'

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
  const currentTxQueueNonce = Number(transactionNonce)
  const transactionsQueue = await contract.getFunction('getTransactions')(0, 0)

  console.log(transactionsQueue)

  let toApprove: TransacitonTypes | undefined

  const txQueuePromise = transactionsQueue.map(async transaction => {
    if (!transaction[4]) {
      return
    }

    const parsedTransaction = contract.interface.parseTransaction({
      data: transaction[5]
    })

    const transactionData = await formatTransactionToQueueList(
      transaction,
      contract,
      safeChain.chainId
    )

    let formattedTransaction: TransacitonTypes

    if (parsedTransaction) {
      formattedTransaction = formatSafeSettingsUpdateTx(
        parsedTransaction,
        transactionData
      )
    } else {
      formattedTransaction = formatSafeSendTokensTx(
        transactionData,
        Number(transaction[7]),
        safeChain.chainId
      )
    }

    if (formattedTransaction.nonce === currentTxQueueNonce) {
      toApprove = formattedTransaction
      return
    }

    return formattedTransaction
  })

  const resolvedTxQueue = await Promise.all(txQueuePromise)
  const formattedTxQueue = resolvedTxQueue.filter(
    (tx: TransacitonTypes | undefined): tx is TransacitonTypes => {
      return tx !== undefined
    }
  )

  return {
    toApprove,
    pending: formattedTxQueue
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
