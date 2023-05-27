import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { HomeTransactionItem } from '@components/pages/Home/TransactionQueue/HomeTransactionItem'

import { useTransactionsQueue } from '@hooks/transactions/useTransactionsQueue'

export function TransactionQueue() {
  const {
    safe,
    transactionsQueue,
    transactionsQueueError,
    transactionsQueueIsLoading
  } = useTransactionsQueue()

  const transactionsQueueCount = transactionsQueue?.toApprove
    ? transactionsQueue.pending.length + 1
    : 0

  return (
    <section className="min-w-[20rem] flex flex-col flex-1 items-stretch justify-start gap-3 relative p-4 shadow-none rounded-lg ring-zinc-900 dark:ring-zinc-100 focus-within:ring-1 bg-zinc-100 dark:bg-zinc-900 border-1 border-zinc-200 dark:border-zinc-700 sm:min-w-[25rem]">
      <Heading className="text-lg font-semibold">
        Transaction queue ({transactionsQueueCount})
      </Heading>

      <div className="w-full flex flex-col items-center justify-center gap-5">
        {transactionsQueue && !transactionsQueue.toApprove && (
          <ErrorState
            title="You have no pending transactions"
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
        ) : (
          <Skeleton
            isLoading={transactionsQueueIsLoading}
            totalOfLines={3}
            className="w-full h-36"
          >
            {transactionsQueue?.toApprove && (
              <section className="w-full flex flex-col items-stretch justify-start gap-2">
                <HomeTransactionItem transaction={transactionsQueue.toApprove}>
                  <Text className="h-min py-1 px-2 text-yellow-500 border-1 border-yellow-500 font-medium rounded-full text-xs">
                    Approves {transactionsQueue.toApprove.signatures.length}/
                    {safe?.threshold}
                  </Text>
                </HomeTransactionItem>

                <ul className="flex flex-col items-stretch justify-start gap-2">
                  {transactionsQueue.pending.slice(0, 3).map(transaction => (
                    <HomeTransactionItem
                      key={transaction.nonce}
                      transaction={transaction}
                    >
                      <Text className="h-min py-1 px-2 text-yellow-500 border-1 border-yellow-500 font-medium rounded-full text-xs">
                        pending
                      </Text>
                    </HomeTransactionItem>
                  ))}
                </ul>
              </section>
            )}
          </Skeleton>
        )}
      </div>
    </section>
  )
}
