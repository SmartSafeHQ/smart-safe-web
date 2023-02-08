import { Dispatch, SetStateAction } from 'react'

import { ErrorState } from '@components/FetchingStates/ErrorState'
import { Text } from '@components/Text'
import { ScrollArea } from '@components/ScrollArea'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { PaginationFetch } from '@components/pages/home/PaginationFetch'
import { TokensTable } from '@components/pages/home/TokensTable'

import { MAX_APPS_USERS_REGISTERS_PER_PAGE } from '@/utils/global/constants/variables'
import { usePortfolioTokens } from '@hooks/home/queries/usePortfolioTokens'

interface TokensTabProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  isEnabled?: boolean
}

export function TokensTab({
  page,
  isEnabled = false,
  setPage
}: TokensTabProps) {
  const { data, isLoading, isFetching, refetch, error } =
    usePortfolioTokens(isEnabled)

  return (
    <section className="w-full h-full min-h-[30rem] p-6 flex flex-col justify-start items-stretch gap-4 bg-white dark:bg-gray-800 rounded-md">
      {isLoading && (
        <LoadingState title="Loading networks tokens" className="mt-12" />
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
          {data?.tokens.length === 0 ? (
            <Text
              asChild
              className="w-full mt-5 text-center text-lg font-medium text-gray-800 dark:text-gray-300"
            >
              <strong>No tokens registered in the account</strong>
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
                    <tr className="text-sm font-normal uppercase text-gray-400 dark:text-gray-500">
                      <TokensTable.Th>name</TokensTable.Th>
                      <TokensTable.Th>income</TokensTable.Th>
                      <TokensTable.Th>price</TokensTable.Th>
                      <TokensTable.Th>balance</TokensTable.Th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.tokens.map(token => (
                      <TokensTable.Tr
                        key={token.symbol}
                        name={token.name}
                        symbol={token.symbol}
                        avatar={token.avatar}
                        income={token.income}
                        price={token.price}
                        balance={token.balance}
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
