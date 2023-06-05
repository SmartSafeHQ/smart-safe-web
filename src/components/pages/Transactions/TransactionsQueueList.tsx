import { ScrollArea } from '@components/ScrollArea'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { ToApproveTransaction } from '@components/pages/Transactions/ToApproveTransaction'
import { PendingTransaction } from '@components/pages/Transactions/PendingTransaction'
import { LoadingSpinner } from '@components/FetchingStates/LoadingSpinner'
import { Text } from '@components/Text'

import { useTransactionsQueue } from '@hooks/transactions/useTransactionsQueue'

export function TransactionsQueueList() {
  const {
    safe,
    transactionsQueue,
    transactionsQueueError,
    transactionsQueueIsRefetching,
    transactionsQueueIsLoading
  } = useTransactionsQueue()

  return (
    <ScrollArea className="px-2">
      {transactionsQueue && !transactionsQueue.toApprove && (
        <ErrorState title="You have no pending transactions" className="pt-2" />
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
          <section className="w-full flex flex-col items-stretch justify-start gap-2 px-4">
            <div className=" flex items-center justify-start gap-2">
              <Text
                asChild
                className="text-sm leading-7 text-zinc-500 font-medium text-start"
              >
                <strong>To approve</strong>
              </Text>

              {transactionsQueueIsRefetching && (
                <LoadingSpinner className="h-4 w-4" />
              )}
            </div>

            <ToApproveTransaction transaction={transactionsQueue.toApprove} />

            <Text
              asChild
              className="text-sm leading-7 text-zinc-500 font-medium text-start"
            >
              <strong>
                Pending Queue ({transactionsQueue.pending.length})
              </strong>
            </Text>

            <ul className="flex flex-col items-stretch justify-start gap-4">
              {transactionsQueue.pending.map(transaction => (
                <PendingTransaction
                  key={transaction.nonce}
                  transaction={transaction}
                />
              ))}
            </ul>
          </section>
        )
      )}
    </ScrollArea>
  )
}
