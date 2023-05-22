import Head from 'next/head'
import { ReactElement } from 'react'

import {
  SMART_ACCOUNT_TABS_VALUES,
  SmartAccountTabsList
} from '@components/pages/SmartAccount/SmartAccountTabsList'
import { Button } from '@components/Button'
import { Tabs } from '@components/Tabs'
import { SmartAccountTab } from '@components/pages/SmartAccount'
import { SpendingLimitsList } from '@components/pages/SmartAccount/spendingLimitsAuth/SpendingLimitsList'
import { CreateSpendingLimitsAuthModal } from '@/components/pages/SmartAccount/spendingLimitsAuth/CreateSpendingLimitsAuthModal'
import { DeleteSpendingLimitsAuthModal } from '@/components/pages/SmartAccount/spendingLimitsAuth/DeleteSpendingLimitsAuthModal'

import { useSpendingLimitsAuthHook } from '@/hooks/smartAccount/useSpendingLimitsAuthHook'
import { SpendingLimitsAuthProvider } from '@contexts/smart-account/SpendingLimitsAuthContext'

const WithdrawalAuthorization = () => {
  const { setIsCreateSpendingLimitsOpen } = useSpendingLimitsAuthHook()

  return (
    <div className="flex flex-1 flex-col items-center px-2 pt-2 bg-gray-50 dark:bg-gray-900 md:pt-6">
      <Head>
        <title>SmartSafe | Withdrawal Authorization for Smart Account</title>
        <meta
          name="description"
          content="Withdrawal authorization for withdrawals registered in your smart account"
        />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <Tabs.Root defaultValue={SMART_ACCOUNT_TABS_VALUES.WITHDRAW_AUTH}>
          <SmartAccountTabsList />

          <Tabs.Content value={SMART_ACCOUNT_TABS_VALUES.WITHDRAW_AUTH}>
            <SmartAccountTab.Root>
              <SmartAccountTab.Header>
                <div className="w-full flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex flex-col relative justify-start items-stretch gap-3">
                    <SmartAccountTab.Title>
                      Withdrawal Authorization
                    </SmartAccountTab.Title>

                    <SmartAccountTab.Description>
                      Set rules for beneficiaries to access funds without having
                      to collect all signatures
                    </SmartAccountTab.Description>
                  </div>

                  <Button
                    className="w-max"
                    onClick={() => setIsCreateSpendingLimitsOpen(true)}
                  >
                    Add Authorization
                  </Button>
                </div>
              </SmartAccountTab.Header>

              <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5">
                <SpendingLimitsList />
              </div>
            </SmartAccountTab.Root>
          </Tabs.Content>
        </Tabs.Root>

        <CreateSpendingLimitsAuthModal />
        <DeleteSpendingLimitsAuthModal />
      </div>
    </div>
  )
}

WithdrawalAuthorization.getLayout = function getLayout(page: ReactElement) {
  return <SpendingLimitsAuthProvider>{page}</SpendingLimitsAuthProvider>
}

export default WithdrawalAuthorization
