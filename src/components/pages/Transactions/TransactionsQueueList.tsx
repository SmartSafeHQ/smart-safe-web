import { ScrollArea } from '@components/ScrollArea'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { ToApproveTransaction } from '@components/pages/Transactions/ToApproveTransaction'
import { PendingTransaction } from '@components/pages/Transactions/PendingTransaction'
import { Text } from '@components/Text'

import { useTransactionsQueue } from '@hooks/transactions/useTransactionsQueue'

export function TransactionsQueueList() {
  const {
    safe,
    transactionsQueue,
    transactionsQueueError,
    transactionsQueueIsLoading
  } = useTransactionsQueue()

  return (
    <ScrollArea className="px-2">
      {transactionsQueue && !transactionsQueue.toApprove && (
        <ErrorState
          title="You have no transactions on the queue"
          className="pt-2"
        />
      )}

      {transactionsQueueError ? (
        <ErrorState
          title="Unable to load safe transactions, please try again"
          description={
            (transactionsQueueError as Error)?.message ??
            'An unknown error occurred. Please try again later.'
          }
        />
      ) : transactionsQueueIsLoading ? (
        <LoadingState title="Loading safe transactions queue" />
      ) : (
        transactionsQueue?.toApprove &&
        safe && (
          <section className="w-full flex flex-col items-stretch justify-start gap-2">
            <Text
              asChild
              className="text-sm leading-7 text-zinc-500 font-medium text-start"
            >
              <strong>To approve</strong>
            </Text>

            <ToApproveTransaction
              nonce={transactionsQueue.toApprove.nonce}
              type={transactionsQueue.toApprove.type}
              amount={transactionsQueue.toApprove.amount}
              createdAt={transactionsQueue.toApprove.createdAt}
              signatures={transactionsQueue.toApprove.signatures}
              toAddress={transactionsQueue.toApprove.toAddress}
              threshold={safe.threshold}
              toFormattedAddress={
                transactionsQueue.toApprove.toFormattedAddress
              }
              txHash={transactionsQueue.toApprove.txHash}
              token={transactionsQueue.toApprove.token}
            />

            <Text
              asChild
              className="text-sm leading-7 text-zinc-500 font-medium text-start"
            >
              <strong>
                Pending Queue ({transactionsQueue.pending.length})
              </strong>
            </Text>

            <ul>
              {transactionsQueue.pending.map(transaction => (
                <PendingTransaction
                  key={transaction.nonce}
                  nonce={transaction.nonce}
                  type={transaction.type}
                  amount={transaction.amount}
                  threshold={safe.threshold}
                  createdAt={transaction.createdAt}
                  signatures={transaction.signatures}
                  toAddress={transaction.toAddress}
                  toFormattedAddress={transaction.toFormattedAddress}
                  txHash={transaction.txHash}
                  token={transaction.token}
                />
              ))}
            </ul>
          </section>
        )
      )}
    </ScrollArea>
  )
}
