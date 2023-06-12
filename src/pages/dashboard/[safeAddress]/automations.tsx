import Head from 'next/head'
import { ReactElement } from 'react'
import Link from 'next/link'

import { Button } from '@components/Button'
import { ChainlinkAutomationList } from '@components/pages/ChainlinkAutomation/ChainlinkAutomationList'
import { DeleteChainlinkAutomationModal } from '@components/pages/ChainlinkAutomation/DeleteChainlinkAutomationModal'
import { CreateChainlinkAutomationModal } from '@components/pages/ChainlinkAutomation/CreateChainlinkAutomationModal'
import { PageLayout } from '@components/pages/Layouts/PageLayout'
import { Text } from '@components/Text'

import { useSpendingLimitsHook } from '@hooks/spendingLimits/useSpendingLimitsHook'
import { SpendingLimitsProvider } from '@contexts/SpendingLimitsContext'

const ChainlinkAutomation = () => {
  const { setIsCreateSpendingLimitsOpen } = useSpendingLimitsHook()

  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe | Automations</title>
        <meta name="description" content="Management of Automations" />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <PageLayout.Root>
          <PageLayout.Header className="flex-col justify-between items-stretch gap-3 pb-8 pt-4 px-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-col items-stretch justify-between gap-4">
              <PageLayout.Title>Automations</PageLayout.Title>

              <PageLayout.Description className="flex items-center gap-1">
                <Text>
                  Automate payments in your safe contract powered by the
                  Chainlink Web3
                  <Link
                    href="https://chain.link/automation"
                    target="_blank"
                    className="ml-1 text-sm font-medium text-cyan-500 transition-colors hover:text-cyan-600"
                  >
                    automation services platform
                  </Link>
                </Text>
              </PageLayout.Description>
            </div>

            <Button
              className="w-max"
              onClick={() => setIsCreateSpendingLimitsOpen(true)}
            >
              Add automation
            </Button>
          </PageLayout.Header>

          <div className="w-full py-3 flex flex-col relative justify-start items-stretch gap-5">
            <ChainlinkAutomationList />
          </div>
        </PageLayout.Root>
      </div>

      <CreateChainlinkAutomationModal />
      <DeleteChainlinkAutomationModal />
    </div>
  )
}

ChainlinkAutomation.getLayout = function getLayout(page: ReactElement) {
  return <SpendingLimitsProvider>{page}</SpendingLimitsProvider>
}

export default ChainlinkAutomation
