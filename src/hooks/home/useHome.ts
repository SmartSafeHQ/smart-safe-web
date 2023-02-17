import { useIsFetching } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import {
  FetchCoinsBalanceInUsdResponse,
  useCoinsBalanceInUsd
} from '@hooks/global/coins/queries/useCoinsBalanceInUsd'
import { queryClient } from '@lib/reactQuery'
import {
  fetchCoinPortfolio,
  FetchCoinPortfolioResponse
} from '@hooks/global/coins/queries/useCoinPortfolio'
import {
  fetchCustomerCoins,
  FetchCustomerCoinsResponse
} from '@hooks/global/coins/queries/useCustomerCoins'
import { useAuth } from '@contexts/AuthContext'
import {
  fetchCoinValueInUsd,
  FetchCoinValueInUsdResponse
} from '@hooks/global/coins/queries/useCoinValueInUsd'
import { useI18n } from '@hooks/useI18n'

export type NavTabs = 'coins' | 'transactions' | 'nfts'

export const useHome = () => {
  const [tab, setTab] = useState<NavTabs>('coins')
  const [isAccountBalanceLoading, setIsAccountBalanceLoading] = useState(false)

  const coinPortfolioFetchingQueries = useIsFetching({
    queryKey: ['coinPortfolio']
  })

  const coinValueInUsdFetchingQueries = useIsFetching({
    queryKey: ['coinValueInUsd']
  })

  const isFetching =
    !!coinPortfolioFetchingQueries || !!coinValueInUsdFetchingQueries

  const { t } = useI18n()
  const { data: coinsBalanceData } = useCoinsBalanceInUsd()
  const { customer } = useAuth()

  useEffect(() => {
    setIsAccountBalanceLoading(true)

    if (!customer) return

    queryClient
      .ensureQueryData<FetchCustomerCoinsResponse>({
        queryKey: ['customerCoins', 1],
        queryFn: () =>
          fetchCustomerCoins({
            account: customer.wallet.address,
            page: 1,
            offset: 10
          })
      })
      .then(async result => {
        let balanceAmount = 0

        const balancePromise = result.coins.map(async coin => {
          const coinPortfolioResponse =
            await queryClient.ensureQueryData<FetchCoinPortfolioResponse>({
              queryKey: ['coinPortfolio', coin.rpcUrl],
              queryFn: () =>
                fetchCoinPortfolio({
                  account: customer.wallet.address,
                  coin: {
                    symbol: coin.symbol,
                    rpcUrl: coin.rpcUrl
                  }
                })
            })

          const coinValueInUsd =
            await queryClient.ensureQueryData<FetchCoinValueInUsdResponse>({
              queryKey: ['coinValueInUsd', coin.symbol],
              queryFn: () => fetchCoinValueInUsd({ coinSymbol: coin.symbol })
            })

          const coinUsdBalance =
            coinPortfolioResponse.balance * coinValueInUsd.valueInUsd

          balanceAmount += coinUsdBalance

          return {
            coinSymbol: coin.symbol,
            amount: coinPortfolioResponse.balance,
            valueInUsd: coinUsdBalance
          }
        })

        const balance = await Promise.all(balancePromise)

        queryClient.setQueryData<FetchCoinsBalanceInUsdResponse>(
          ['coinsBalanceInUsd'],
          () => ({
            balanceTotal: balanceAmount,
            coinsBalance: balance
          })
        )
      })
      .finally(() => setIsAccountBalanceLoading(false))
  }, [customer])

  return {
    t,
    tab,
    setTab,
    isFetching,
    isAccountBalanceLoading,
    coinsBalanceData
  }
}
