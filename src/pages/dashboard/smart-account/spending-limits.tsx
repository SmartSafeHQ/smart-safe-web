import Head from 'next/head'
import { ReactElement } from 'react'

import { Button } from '@components/Button'
import { SmartAccountTab } from '@components/pages/SmartAccount'
import { SpendingLimitsList } from '@components/pages/SmartAccount/spendingLimitsAuth/SpendingLimitsList'

import { useSpendingLimitsAuthHook } from '@/hooks/smartAccount/useSpendingLimitsAuthHook'
import { SpendingLimitsAuthProvider } from '@contexts/smart-account/SpendingLimitsAuthContext'
import { DeleteSpendingLimitsAuthModal } from '@/components/pages/SmartAccount/spendingLimitsAuth/DeleteSpendingLimitsAuthModal'
import { CreateSpendingLimitsAuthModal } from '@/components/pages/SmartAccount/spendingLimitsAuth/CreateSpendingLimitsAuthModal'

const SpendingLimits = () => {
  const { setIsCreateSpendingLimitsOpen } = useSpendingLimitsAuthHook()

  return (
    <div className="flex flex-1 flex-col items-center px-2 pt-2 bg-gray-50 dark:bg-gray-900 md:pt-6">
      <Head>
        <title>SmartSafe | Smart Account Spending Limits</title>
        <meta name="description" content="Management of spending limits" />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <div className="w-full flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-col relative justify-start items-stretch gap-3">
            <SmartAccountTab.Title>Spending Limits</SmartAccountTab.Title>

            <SmartAccountTab.Description>
              Set rules for beneficiaries to access funds without having to
              collect all signatures
            </SmartAccountTab.Description>
          </div>

          <Button
            className="w-max"
            onClick={() => setIsCreateSpendingLimitsOpen(true)}
          >
            Add Authorization
          </Button>
        </div>

        <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5">
          <SpendingLimitsList />
        </div>
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
