import { useEffect, useState } from 'react'

import { useCoinsBalanceInUsd } from '@hooks/global/coins/queries/useCoinsBalanceInUsd'
import { queryClient } from '@lib/reactQuery'
import { FetchCoinPortfolioResponse } from '@hooks/global/coins/queries/useCoinPortfolio'

export type NavTabs = 'coins' | 'transactions' | 'nfts'

export const useHome = () => {
  const [page, setPage] = useState(1)
  const [tab, setTab] = useState<NavTabs>('coins')
  const [isAccountBalanceLoading, setIsAccountBalance] = useState(false)

  const { data: coinsBalanceData } = useCoinsBalanceInUsd()

  const coinPortfolioQueries =
    queryClient.getQueriesData<FetchCoinPortfolioResponse>(['coinPortfolio'])

  useEffect(() => {
    if (coinPortfolioQueries.length === 0) {
      setIsAccountBalance(true)
      return
    }

    const isSomeQueryLoading = coinPortfolioQueries.some(query => !query[1])

    setIsAccountBalance(isSomeQueryLoading)
  }, [coinPortfolioQueries])

  return {
    page,
    setPage,
    tab,
    setTab,
    isAccountBalanceLoading,
    coinsBalanceData
  }
}
