import Head from 'next/head'
import { ReactElement } from 'react'
import Link from 'next/link'

import { Button } from '@components/Button'
import { AutomationsList } from '@components/pages/Automations/AutomationsList'
import { DeleteAutomationModal } from '@components/pages/Automations/DeleteAutomationModal'
import { CreateAutomationModal } from '@components/pages/Automations/CreateAutomationModal'
import { PageLayout } from '@components/pages/Layouts/PageLayout'
import { Text } from '@components/Text'

import { useAutomationsHook } from '@hooks/automations/useAutomationsHook'
import { AutomationsProvider } from '@contexts/AutomationsContext'

const Automations = () => {
  const { setIsCreateAutomationOpen } = useAutomationsHook()

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
                  Chainlink
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
              onClick={() => setIsCreateAutomationOpen(true)}
            >
              Add automation
            </Button>
          </PageLayout.Header>

          <div className="w-full py-3 flex flex-col relative justify-start items-stretch gap-5">
            <AutomationsList />
          </div>
        </PageLayout.Root>
      </div>

      <CreateAutomationModal />
      <DeleteAutomationModal />
    </div>
  )
}

Automations.getLayout = function getLayout(page: ReactElement) {
  return <AutomationsProvider>{page}</AutomationsProvider>
}

export default Automations
