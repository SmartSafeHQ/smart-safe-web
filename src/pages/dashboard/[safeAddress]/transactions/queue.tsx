import Head from 'next/head'

import {
  TransactionsTabsList,
  SAFE_TRANSACTIONS_TABS_VALUES
} from '@components/pages/Transactions/TransactionsTabsList'
import { Tabs } from '@components/Tabs'
import { PageLayout } from '@components/pages/Layouts/PageLayout'
import { TransactionsQueueList } from '@components/pages/Transactions/TransactionsQueueList'

const TransactionsQueue = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe | Transactions Queue</title>
        <meta name="description" content="SmartSafe transactions queue" />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <Tabs.Root defaultValue={SAFE_TRANSACTIONS_TABS_VALUES.QUEUE}>
          <TransactionsTabsList />

          <Tabs.Content value={SAFE_TRANSACTIONS_TABS_VALUES.QUEUE}>
            <PageLayout.Root>
              <PageLayout.Header className="justify-center items-start gap-3 pb-8 pt-10 px-3">
                <PageLayout.Title>Transactions Queue</PageLayout.Title>
              </PageLayout.Header>

              <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5 mt-4">
                <TransactionsQueueList />
              </div>
            </PageLayout.Root>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default TransactionsQueue
