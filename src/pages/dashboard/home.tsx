import { useState } from 'react'
import Head from 'next/head'

import { ErrorState } from '@components/FetchingStates/ErrorState'
import { Text } from '@components/Text'
import { ScrollArea } from '@components/ScrollArea'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { PaginationFetch } from '@components/pages/home/PaginationFetch'
import { TokensTable } from '@components/pages/home/TokensTable'

import { usePortfolioTokens } from '@hooks/home/queries/usePortfolioTokens'
import { MAX_APPS_USERS_REGISTERS_PER_PAGE } from '@utils/constants/variables'

const AppUsers = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching, refetch, error } = usePortfolioTokens()

  return (
    <div className="flex flex-col px-2 pt-8 md:px-4">
      <Head>
        <title>Tokenverse | Home</title>
        <meta name="description" content="Tokenverse dashboard home" />
      </Head>

      <div className="flex flex-1 flex-col items-stretch">
        <div className="w-full pt-6 px-2 md:px-1">
          <section className="w-full h-full min-h-[30rem] p-6 flex flex-col justify-start items-stretch gap-4 bg-gray-800 rounded-md">
            {isLoading && (
              <LoadingState title="Loading networks tokens" className="mt-12" />
            )}

            {(error as Error) && (
              <ErrorState
                title="Unable to complete the process :/"
                description={
                  (error as Error)?.message ?? 'Internal server error'
                }
                className="mt-12"
              />
            )}

            {data?.tokens.length === 0 ? (
              <Text
                asChild
                className="w-full mt-5 text-center text-lg font-medium text-gray-300"
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
                    <thead className="border-b-[0.5px] border-gray-600">
                      <tr className="text-sm font-normal uppercase text-gray-500">
                        <TokensTable.Th>token</TokensTable.Th>
                        <TokensTable.Th>income</TokensTable.Th>
                        <TokensTable.Th>price</TokensTable.Th>
                        <TokensTable.Th>balance</TokensTable.Th>
                      </tr>
                    </thead>

                    <tbody>
                      {data?.tokens.map(token => (
                        <TokensTable.Tr
                          key={token.name}
                          name={token.name}
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
          </section>
        </div>
      </div>
    </div>
  )
}

export default AppUsers
