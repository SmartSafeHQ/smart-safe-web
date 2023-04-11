import { useState } from 'react'

import { queryClient } from '@lib/reactQuery'
import { FetchCustomerCoinsResponse } from '@hooks/global/coins/queries/useCustomerCoins'
import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'

export const useHomeCoinsTab = () => {
  const { t } = useI18n()
  const { customer } = useAuth()

  const [page, setPage] = useState(1)

  function handleRefetchCoins(page: number) {
    const query = queryClient.getQueryData<FetchCustomerCoinsResponse>([
      'customerCoins',
      page
    ])

    if (!query) return

    query.nativeTokens.forEach(coin => {
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
    handleRefetchCoins
  }
}
