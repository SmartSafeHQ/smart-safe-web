import { useState } from 'react'

import { ErrorState } from '@components/FetchingStates/ErrorState'
import { ScrollArea } from '@components/ScrollArea'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { PaginationFetch } from '@components/pages/home/PaginationFetch'
import { CoinsTable } from '@components/pages/home/CoinsTable'

import { useAuth } from '@contexts/AuthContext'
import { MAX_PAGINATION_COINS_PER_PAGE } from '@utils/global/constants/variables'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'
import { useI18n } from '@/hooks/useI18n'

interface CoinsTabProps {
  isTabActive?: boolean
}

export function CoinsTab({ isTabActive = false }: CoinsTabProps) {
  const { customer } = useAuth()
  const { t } = useI18n()

  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching, refetch, error } = useCustomerCoins(
    customer?.wallet.address,
    isTabActive,
    page
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
        <LoadingState title={t.home.loadingNetworksCoins} className="mt-12" />
      ) : (
        data && (
          <>
            <PaginationFetch
              registersPerPage={MAX_PAGINATION_COINS_PER_PAGE}
              currentPage={page}
              onPageChange={setPage}
              totalCountOfRegisters={data.totalCount}
              isFetching={isFetching}
              handleRefetch={refetch}
            />

            <ScrollArea className="w-full max-w-full">
              <table className="w-full">
                <thead className="border-b-[0.5px] border-gray-400 dark:border-gray-600">
                  <tr className="text-sm font-normal uppercase text-gray-400 dark:text-gray-500">
                    <CoinsTable.Th>{t.home.name}</CoinsTable.Th>
                    <CoinsTable.Th>{t.home.balance}</CoinsTable.Th>
                    <CoinsTable.Th>{t.home.price}</CoinsTable.Th>
                    <CoinsTable.Th>{t.home.change24h}</CoinsTable.Th>
                  </tr>
                </thead>

                <tbody>
                  {data.coins.map(coin => {
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
