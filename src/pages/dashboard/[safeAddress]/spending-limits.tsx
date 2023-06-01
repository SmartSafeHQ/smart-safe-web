import Head from 'next/head'
import { ReactElement } from 'react'

import { Button } from '@components/Button'
import { SpendingLimitsList } from '@components/pages/SpendingLimits/SpendingLimitsList'
import { DeleteSpendingLimitsModal } from '@components/pages/SpendingLimits/DeleteSpendingLimitsModal'
import { CreateSpendingLimitsModal } from '@components/pages/SpendingLimits/CreateSpendingLimitsModal'
import { PageLayout } from '@components/pages/Layouts/PageLayout'

import { useSpendingLimitsHook } from '@hooks/spendingLimits/useSpendingLimitsHook'
import { SpendingLimitsProvider } from '@contexts/SpendingLimitsContext'

const SpendingLimits = () => {
  const { setIsCreateSpendingLimitsOpen } = useSpendingLimitsHook()

  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe | Smart Account Spending Limits</title>
        <meta name="description" content="Management of spending limits" />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <PageLayout.Root>
          <PageLayout.Header className="flex-col justify-between items-stretch gap-3 pb-8 pt-4 px-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-col items-stretch justify-between gap-4">
              <PageLayout.Title>Spending Limits</PageLayout.Title>

              <PageLayout.Description>
                Set rules for beneficiaries to access funds without having to
                collect all signatures
              </PageLayout.Description>
            </div>

            <Button
              className="w-max"
              onClick={() => setIsCreateSpendingLimitsOpen(true)}
            >
              Add Authorization
            </Button>
          </PageLayout.Header>

          <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5">
            <SpendingLimitsList />
          </div>
        </PageLayout.Root>
      </div>

      <CreateSpendingLimitsModal />
      <DeleteSpendingLimitsModal />
    </div>
  )
}

SpendingLimits.getLayout = function getLayout(page: ReactElement) {
  return <SpendingLimitsProvider>{page}</SpendingLimitsProvider>
}

export default SpendingLimits
