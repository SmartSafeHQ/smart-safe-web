import { useState } from 'react'
import Head from 'next/head'

import { Skeleton } from '@components/FetchingStates/Skeleton'
import { IncomesSummary } from '@/components/pages/home/IncomesSummary'
import { TokensTab } from '@components/pages/home/TokensTab'
import { TransactionsTab } from '@components/pages/home/TransactionsTab'
import { Tabs } from '@components/Tabs'

import { usePortfolioTokens } from '@hooks/home/queries/usePortfolioTokens'

type NavTabs = 'tokens' | 'transactions' | 'nfts'

const Home = () => {
  const [page, setPage] = useState(1)
  const [tab, setTab] = useState<NavTabs>('tokens')

  const { data, isLoading: tokensIsLoading } = usePortfolioTokens()

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

            <Skeleton isLoading={tokensIsLoading} className="h-12">
              <IncomesSummary.Value className="text-2xl md:text-4xl">
                ${data?.tokensNetWorth}
              </IncomesSummary.Value>
            </Skeleton>
          </IncomesSummary.Item>
        </IncomesSummary.Root>

        <Tabs.Root
          defaultValue="tokens"
          onValueChange={tabValue => setTab(tabValue as NavTabs)}
        >
          <Tabs.List
            aria-label="Manage your metrics"
            className="w-full max-w-lg mb-6"
          >
            <Tabs.Trigger value="tokens" className="py-2 w-full max-w-[10rem]">
              tokens
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

          <Tabs.Content value="tokens">
            <TokensTab
              page={page}
              setPage={setPage}
              isEnabled={tab === 'tokens'}
            />
          </Tabs.Content>

          <Tabs.Content value="transactions">
            <TransactionsTab
              page={page}
              setPage={setPage}
              isEnabled={tab === 'transactions'}
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
