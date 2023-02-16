import { useEffect, useState } from 'react'

import { useCoinsBalanceInUsd } from '@hooks/global/coins/queries/useCoinsBalanceInUsd'
import { queryClient } from '@lib/reactQuery'
import { FetchCoinPortfolioResponse } from '@hooks/global/coins/queries/useCoinPortfolio'

export type NavTabs = 'coins' | 'transactions' | 'nfts'

export const useHome = () => {
  const [tab, setTab] = useState<NavTabs>('coins')
  const [isAccountBalanceLoading, setIsAccountBalanceLoading] = useState(false)

  const { data: coinsBalanceData } = useCoinsBalanceInUsd()

  const coinPortfolioQueries =
    queryClient.getQueriesData<FetchCoinPortfolioResponse>(['coinPortfolio'])

  useEffect(() => {
    if (coinPortfolioQueries.length === 0) {
      setIsAccountBalanceLoading(true)
      return
    }

    const isSomeQueryLoading = coinPortfolioQueries.some(query => {
      const isNoArgsQuery = query[0][1]

      return !!isNoArgsQuery && !query[1]
    })

    setIsAccountBalanceLoading(isSomeQueryLoading)
  }, [coinPortfolioQueries])

  return {
    tab,
    setTab,
    isAccountBalanceLoading,
    coinsBalanceData
  }
}
