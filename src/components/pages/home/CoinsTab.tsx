import { Dispatch, SetStateAction } from 'react'

import { ErrorState } from '@components/FetchingStates/ErrorState'
import { ScrollArea } from '@components/ScrollArea'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { PaginationFetch } from '@components/pages/home/PaginationFetch'
import { CoinsTable } from '@components/pages/home/CoinsTable'

import { useAuth } from '@contexts/AuthContext'
import { MAX_APPS_USERS_REGISTERS_PER_PAGE } from '@utils/global/constants/variables'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'

interface CoinsTabProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  isTabActive?: boolean
}

export function CoinsTab({
  page,
  isTabActive = false,
  setPage
}: CoinsTabProps) {
  const { customer } = useAuth()

  const { data, isLoading, isFetching, refetch, error } = useCustomerCoins(
    customer?.wallet.address,
    isTabActive
  )

  return (
    <section className="w-full h-full min-h-[30rem] p-6 flex flex-col justify-start items-stretch gap-4 bg-white dark:bg-gray-800 rounded-md">
      {error ? (
        <ErrorState
          title="Unable to complete the process :/"
          description={(error as Error)?.message ?? 'Internal server error'}
          className="mt-12"
        />
      ) : isLoading ? (
        <LoadingState title="Loading networks coins" className="mt-12" />
      ) : (
        data && (
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
                    <CoinsTable.Th>name</CoinsTable.Th>
                    <CoinsTable.Th>change (24h)</CoinsTable.Th>
                    <CoinsTable.Th>price</CoinsTable.Th>
                    <CoinsTable.Th>balance</CoinsTable.Th>
                  </tr>
                </thead>

                <tbody>
                  {data.map(coin => {
                    return (
                      <CoinsTable.Tr
                        key={coin.symbol}
                        customerAccount={customer?.wallet.address}
                        network={coin.network}
                        symbol={coin.symbol}
                        rpcUrl={coin.rpcUrl}
                        avatar={coin.avatar}
                      />
                    )
                  })}
                </tbody>
              </table>
            </ScrollArea>
          </>
        )
      )}
    </section>
  )
}
