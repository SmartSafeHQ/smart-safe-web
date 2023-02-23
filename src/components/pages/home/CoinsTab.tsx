import { ErrorState } from '@components/FetchingStates/ErrorState'
import { ScrollArea } from '@components/ScrollArea'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { PaginationFetch } from '@components/pages/home/PaginationFetch'
import { CoinsTable } from '@components/pages/home/CoinsTable'

import { queryClient } from '@lib/reactQuery'
import { MAX_PAGINATION_COINS_PER_PAGE } from '@utils/global/constants/variables'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'
import { useHomeCoinsTab } from '@hooks/home/useHomeCoinsTab'
import { FetchCoinPortfolioResponse } from '@hooks/global/coins/queries/useCoinPortfolio'

interface CoinsTabProps {
  isFetching: boolean
  isTabActive?: boolean
}

export function CoinsTab({ isFetching, isTabActive = false }: CoinsTabProps) {
  const { t, customer, page, setPage, handleRefetchCoins } = useHomeCoinsTab()

  const { data, isLoading, error } = useCustomerCoins(
    customer?.wallet.address,
    isTabActive,
    page,
    MAX_PAGINATION_COINS_PER_PAGE
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
              handleRefetch={() => handleRefetchCoins(page)}
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
                  {data.coins
                    .sort((a, b) => {
                      const coinBalanceA =
                        queryClient.getQueryData<FetchCoinPortfolioResponse>([
                          'coinPortfolio',
                          a.rpcUrl
                        ])?.balance ?? 0

                      const coinBalanceB =
                        queryClient.getQueryData<FetchCoinPortfolioResponse>([
                          'coinPortfolio',
                          b.rpcUrl
                        ])?.balance ?? 0

                      return coinBalanceB - coinBalanceA
                    })
                    .map(coin => {
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
