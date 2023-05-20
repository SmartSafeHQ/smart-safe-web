import { ScrollArea } from '@components/ScrollArea'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { ToApproveTransaction } from '@components/pages/Transactions/ToApproveTransaction'
import { PendingTransaction } from '@components/pages/Transactions/PendingTransaction'
import { Text } from '@components/Text'

import { useTransactionsQueue } from '@hooks/transactions/useTransactionsQueue'

export function TransactionsQueueList() {
  const { safe, transactionsQueue, error, isLoading } = useTransactionsQueue()

  return (
    <ScrollArea className="w-full max-w-full px-2">
      {error ? (
        <ErrorState
          title="Unable to load safe transactions, please try again"
          description={
            (error as Error)?.message ??
            'An unknown error occurred. Please try again later.'
          }
        />
      ) : isLoading ? (
        <LoadingState title="Loading safe transactions queue" />
      ) : (
        transactionsQueue &&
        safe && (
          <section className="w-full flex flex-col items-stretch justify-start gap-2">
            <Text
              asChild
              className="text-sm leading-7 text-zinc-500 font-medium text-start"
            >
              <strong>To approve</strong>
            </Text>

            <ToApproveTransaction
              nonce={3}
              type="SEND"
              amount={0.002}
              createdAt={new Date()}
              signatures={[
                {
                  address: '0x45e99255C041b69C8e3771b286Cae2EDA5622fA1',
                  status: 'approved'
                },
                {
                  address: '0x45e99255C041b69G8e3771b286Cae2EDA5622fA1',
                  status: 'rejected'
                }
              ]}
              toAddress="0x45e99255C041b69C8e3771b286Cae2EDA5622fA1"
              toFormattedAddress="0x45e...2fA1"
              txHash="0x45e...2fA1"
              token={{
                symbol: 'matic',
                icon: '/networks/polygon-logo.svg'
              }}
            />

            <Text
              asChild
              className="text-sm leading-7 text-zinc-500 font-medium text-start"
            >
              <strong>Pending Queue (1)</strong>
            </Text>

            <ul>
              <PendingTransaction
                nonce={4}
                type="SEND"
                amount={0.002}
                createdAt={new Date()}
                signatures={['0x45e99255C041b69C8e3771b286Cae2EDA5622fA1']}
                toAddress="0x45e99255C041b69C8e3771b286Cae2EDA5622fA1"
                toFormattedAddress="0x45e...2fA1"
                txHash="0x45e...2fA1"
                token={{
                  symbol: 'matic',
                  icon: '/networks/polygon-logo.svg'
                }}
              />
            </ul>
          </section>
        )
      )}
    </ScrollArea>
  )
}
