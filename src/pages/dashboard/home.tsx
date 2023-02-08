import { useState } from 'react'
import Head from 'next/head'

import { Skeleton } from '@components/FetchingStates/Skeleton'
import { IncomesSummary } from '@/components/pages/home/IncomesSummary'
import { CoinsTab } from '@components/pages/home/CoinsTab'
import { TransactionsTab } from '@components/pages/home/TransactionsTab'
import { Tabs } from '@components/Tabs'

type NavTabs = 'coins' | 'transactions' | 'nfts'

const Home = () => {
  const [page, setPage] = useState(1)
  const [tab, setTab] = useState<NavTabs>('coins')

  return (
    <div className="flex flex-col px-2 pt-8">
      <Head>
        <title>Tokenverse | Home</title>
        <meta name="description" content="Tokenverse dashboard home" />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <IncomesSummary.Root>
          <IncomesSummary.Item className="gap-1 md:gap-2">
            <IncomesSummary.Title>account balance</IncomesSummary.Title>

            <Skeleton isLoading={false} className="h-12">
              <IncomesSummary.Value className="text-2xl md:text-4xl">
                ${(10).toFixed(2)}
              </IncomesSummary.Value>
            </Skeleton>
          </IncomesSummary.Item>
        </IncomesSummary.Root>

        <Tabs.Root
          defaultValue="coins"
          onValueChange={tabValue => setTab(tabValue as NavTabs)}
        >
          <Tabs.List
            aria-label="Manage your metrics"
            className="w-full max-w-lg mb-6"
          >
            <Tabs.Trigger value="coins" className="py-2 w-full max-w-[10rem]">
              coins
            </Tabs.Trigger>

            <Tabs.Trigger
              value="transactions"
              className="py-2 w-full max-w-[10rem]"
            >
              transactions
            </Tabs.Trigger>

            <Tabs.Trigger
              value="nfts"
              className="py-2 w-full max-w-[10rem]"
              disabled
            >
              NFTs
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="coins">
            <CoinsTab
              page={page}
              setPage={setPage}
              isTabActive={tab === 'coins'}
            />
          </Tabs.Content>

          <Tabs.Content value="transactions">
            <TransactionsTab
              page={page}
              setPage={setPage}
              isTabActive={tab === 'transactions'}
            />
          </Tabs.Content>

          <Tabs.Content value="nfts" className="pt-6">
            <p>coming soon</p>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default Home
