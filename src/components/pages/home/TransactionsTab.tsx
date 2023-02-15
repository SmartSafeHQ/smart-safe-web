import { Dispatch, SetStateAction } from 'react'

import { ErrorState } from '@components/FetchingStates/ErrorState'
import { Text } from '@components/Text'
import { ScrollArea } from '@components/ScrollArea'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { PaginationFetch } from '@components/pages/home/PaginationFetch'
import { TransactionsTable } from '@components/pages/home/TransactionsTable'

import { MAX_APPS_USERS_REGISTERS_PER_PAGE } from '@utils/global/constants/variables'
import { useAllNetworksTransactions } from '@hooks/home/queries/useAllNetworksTransactions'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'
import { useAuth } from '@contexts/AuthContext'
import { useI18n } from '@hooks/useI18n'

interface TransactionsTabProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  isTabActive?: boolean
}

export function TransactionsTab({
  page,
  isTabActive = false,
  setPage
}: TransactionsTabProps) {
  const { customer } = useAuth()
  const { t } = useI18n()

  const { data: customerCoinsData } = useCustomerCoins(
    customer?.wallet.address,
    isTabActive
  )

  const { data, isLoading, isFetching, refetch, error } =
    useAllNetworksTransactions(
      customerCoinsData,
      customer?.wallet.address,
      isTabActive
    )

  return (
    <section className="w-full h-full min-h-[30rem] p-6 flex flex-col justify-start items-stretch gap-4 bg-white dark:bg-gray-800 rounded-md">
      {error ? (
        <ErrorState
          title={t.home.errorState}
          description={(error as Error)?.message ?? 'Internal server error'}
          className="mt-12"
        />
      ) : isLoading ? (
        <LoadingState title={t.home.loadingTransactions} className="mt-12" />
      ) : (
        data && (
          <>
            {data?.length === 0 ? (
              <Text
                asChild
                className="w-full mt-5 text-center text-lg font-medium text-gray-800 dark:text-gray-300"
              >
                <strong>{t.home.noTransactions}</strong>
              </Text>
            ) : (
              <>
                <PaginationFetch
                  registersPerPage={MAX_APPS_USERS_REGISTERS_PER_PAGE}
                  currentPage={page}
                  onPageChange={setPage}
                  totalCountOfRegisters={data?.length ?? 1}
                  isFetching={isFetching}
                  handleRefetch={refetch}
                />

                <ScrollArea className="w-full max-w-full">
                  <table className="w-full">
                    <thead className="border-b-[0.5px] border-gray-400 dark:border-gray-600">
                      <tr className="text-sm font-normal uppercase text-gray-400 dark:text-gray-500">
                        <TransactionsTable.Th>
                          {t.home.sender}
                        </TransactionsTable.Th>

                        <TransactionsTable.Th>
                          {t.home.receiver}
                        </TransactionsTable.Th>

                        <TransactionsTable.Th>
                          {t.home.value}
                        </TransactionsTable.Th>

                        <TransactionsTable.Th>
                          {t.home.category}
                        </TransactionsTable.Th>

                        <TransactionsTable.Th>
                          {t.home.madeAt}
                        </TransactionsTable.Th>

                        <TransactionsTable.Th>
                          {t.home.goToInvoice}
                        </TransactionsTable.Th>
                      </tr>
                    </thead>

                    <tbody>
                      {data?.map(transaction => (
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
        )
      )}
    </section>
  )
}
