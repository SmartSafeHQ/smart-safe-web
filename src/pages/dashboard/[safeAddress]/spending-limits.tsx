import Head from 'next/head'
import { ReactElement } from 'react'

import { Button } from '@components/Button'
import { SpendingLimitsList } from '@components/pages/SmartAccount/spendingLimitsAuth/SpendingLimitsList'
import { DeleteSpendingLimitsAuthModal } from '@components/pages/SmartAccount/spendingLimitsAuth/DeleteSpendingLimitsAuthModal'
import { CreateSpendingLimitsAuthModal } from '@components/pages/SmartAccount/spendingLimitsAuth/CreateSpendingLimitsAuthModal'
import { PageLayout } from '@components/pages/Layouts/PageLayout'

import { useSpendingLimitsAuthHook } from '@hooks/smartAccount/useSpendingLimitsAuthHook'
import { SpendingLimitsAuthProvider } from '@contexts/smart-account/SpendingLimitsAuthContext'

const SpendingLimits = () => {
  const { setIsCreateSpendingLimitsOpen } = useSpendingLimitsAuthHook()

  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe | Smart Account Spending Limits</title>
        <meta name="description" content="Management of spending limits" />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <PageLayout.Root>
          <PageLayout.Header className="justify-center items-start gap-3 pb-8 pt-10 px-3">
            <div className="w-full flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
              <PageLayout.Title>Spending Limits</PageLayout.Title>

              <Button
                className="w-max"
                onClick={() => setIsCreateSpendingLimitsOpen(true)}
              >
                Add Authorization
              </Button>
            </div>

            <PageLayout.Description>
              Set rules for beneficiaries to access funds without having to
              collect all signatures
            </PageLayout.Description>
          </PageLayout.Header>

          <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5">
            <SpendingLimitsList />
          </div>
        </PageLayout.Root>
      </div>

      <CreateSpendingLimitsAuthModal />
      <DeleteSpendingLimitsAuthModal />
    </div>
  )
}

SpendingLimits.getLayout = function getLayout(page: ReactElement) {
  return <SpendingLimitsAuthProvider>{page}</SpendingLimitsAuthProvider>
}

export default SpendingLimits
