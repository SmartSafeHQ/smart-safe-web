import Head from 'next/head'

import { Skeleton } from '@components/FetchingStates/Skeleton'
import { IncomesSummary } from '@components/pages/home/IncomesSummary'
import { CoinsTab } from '@components/pages/home/CoinsTab'
import { TransactionsTab } from '@components/pages/home/TransactionsTab'
import { Tabs } from '@components/Tabs'

import { NavTabs, useHome } from '@hooks/home/useHome'

const Home = () => {
  const {
    t,
    isAccountBalanceLoading,
    isFetching,
    coinsBalanceData,
    tab,
    setTab
  } = useHome()

  return (
    <div className="flex flex-col px-2 pt-8">
      <Head>
        <title>InWallet | Home</title>
        <meta name="description" content="InWallet dashboard home" />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <IncomesSummary.Root>
          <IncomesSummary.Item className="gap-1 md:gap-2">
            <IncomesSummary.Title>{t.home.accountBalance}</IncomesSummary.Title>

            <Skeleton isLoading={isAccountBalanceLoading} className="w-40 h-10">
              {coinsBalanceData?.balanceTotal !== undefined && (
                <IncomesSummary.Value
                  isFetching={isFetching}
                  className="text-2xl md:text-5xl"
                >
                  ${coinsBalanceData.balanceTotal.toFixed(2)}
                </IncomesSummary.Value>
              )}
            </Skeleton>
          </IncomesSummary.Item>
        </IncomesSummary.Root>

        <Tabs.Root
          defaultValue="coins"
          onValueChange={tabValue => setTab(tabValue as NavTabs)}
        >
          <Tabs.List
            aria-label={t.home.manageMetrics}
            className="w-full max-w-lg mb-6"
          >
            <Tabs.Trigger value="coins" className="py-2 w-full max-w-[10rem]">
              {t.home.coins}
            </Tabs.Trigger>

            <Tabs.Trigger
              value="transactions"
              className="py-2 w-full max-w-[10rem]"
            >
              {t.home.transactions}
            </Tabs.Trigger>

            <Tabs.Trigger
              value="nfts"
              className="py-2 w-full max-w-[10rem]"
              disabled
            >
              {t.home.nfts}
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="coins">
            <CoinsTab isFetching={isFetching} isTabActive={tab === 'coins'} />
          </Tabs.Content>

          <Tabs.Content value="transactions">
            <TransactionsTab isTabActive={tab === 'transactions'} />
          </Tabs.Content>

          <Tabs.Content value="nfts" className="pt-6">
            <p>{t.home.comingSoon}</p>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default Home
