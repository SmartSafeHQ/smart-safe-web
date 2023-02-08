import { Dispatch, SetStateAction } from 'react'

import { ErrorState } from '@components/FetchingStates/ErrorState'
import { Text } from '@components/Text'
import { ScrollArea } from '@components/ScrollArea'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { PaginationFetch } from '@components/pages/home/PaginationFetch'
import { TransactionsTable } from '@components/pages/home/TransactionsTable'

import { MAX_APPS_USERS_REGISTERS_PER_PAGE } from '@/utils/global/constants/variables'
import { usePortfolioTransactions } from '@hooks/home/queries/usePortfolioTransactions'

interface TransactionsTabProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  isEnabled?: boolean
}

export function TransactionsTab({
  page,
  isEnabled = false,
  setPage
}: TransactionsTabProps) {
  const { data, isLoading, isFetching, refetch, error } =
    usePortfolioTransactions(isEnabled)

  return (
    <section className="w-full h-full min-h-[30rem] p-6 flex flex-col justify-start items-stretch gap-4 bg-white dark:bg-gray-800 rounded-md">
      {isLoading && (
        <LoadingState title="Loading transactions" className="mt-12" />
      )}

      {(error as Error) && (
        <ErrorState
          title="Unable to complete the process :/"
          description={(error as Error)?.message ?? 'Internal server error'}
          className="mt-12"
        />
      )}

      {data && (
        <>
          {data?.transactions.length === 0 ? (
            <Text
              asChild
              className="w-full mt-5 text-center text-lg font-medium text-gray-800 dark:text-gray-300"
            >
              <strong>No transactions registered in the account</strong>
            </Text>
          ) : (
            <>
              <PaginationFetch
                registersPerPage={MAX_APPS_USERS_REGISTERS_PER_PAGE}
                currentPage={page}
                onPageChange={setPage}
                totalCountOfRegisters={data?.count ?? 1}
                isFetching={isFetching}
                handleRefetch={refetch}
              />

              <ScrollArea className="w-full max-w-full">
                <table className="w-full">
                  <thead className="border-b-[0.5px] border-gray-400 dark:border-gray-600">
                    <tr className="text-sm font-normal uppercase text-gray-500">
                      <TransactionsTable.Th>sender</TransactionsTable.Th>
                      <TransactionsTable.Th>receiver</TransactionsTable.Th>
                      <TransactionsTable.Th>value</TransactionsTable.Th>
                      <TransactionsTable.Th>category</TransactionsTable.Th>
                      <TransactionsTable.Th>made at</TransactionsTable.Th>
                      <TransactionsTable.Th>Go to invoice</TransactionsTable.Th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.transactions.map(transaction => (
                      <TransactionsTable.Tr
                        key={transaction.transactionLink}
                        transactionLink={transaction.transactionLink}
                        sender={transaction.sender}
                        transactedAt={transaction.transactedAt}
                        receiver={transaction.receiver}
                        token={transaction.token}
                        category={transaction.category}
                        value={transaction.value}
                      />
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </>
          )}
        </>
      )}
    </section>
  )
}
