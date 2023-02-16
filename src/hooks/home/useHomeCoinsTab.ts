import { useIsFetching } from '@tanstack/react-query'
import { useState } from 'react'

import { queryClient } from '@lib/reactQuery'
import { FetchCustomerCoinsResponse } from '@hooks/global/coins/queries/useCustomerCoins'
import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'

export const useHomeCoinsTab = () => {
  const { t } = useI18n()
  const { customer } = useAuth()

  const [page, setPage] = useState(1)

  const coinPortfolioFetchingQueries = useIsFetching({
    queryKey: ['coinPortfolio']
  })

  const coinValueInUsdFetchingQueries = useIsFetching({
    queryKey: ['coinValueInUsd']
  })

  const isFetching =
    !!coinPortfolioFetchingQueries || !!coinValueInUsdFetchingQueries

  function handleRefetchCoins(page: number) {
    const query = queryClient.getQueryData<FetchCustomerCoinsResponse>([
      'customerCoins',
      page
    ])

    if (!query) return

    query.coins.forEach(coin => {
      queryClient.invalidateQueries({
        queryKey: ['coinPortfolio', coin.rpcUrl],
        exact: true
      })

      queryClient.invalidateQueries({
        queryKey: ['coinValueInUsd', coin.symbol],
        exact: true
      })
    })
  }

  return {
    t,
    customer,
    page,
    setPage,
    isFetching,
    handleRefetchCoins
  }
}
