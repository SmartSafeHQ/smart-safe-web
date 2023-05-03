import Head from 'next/head'
import { ReactElement } from 'react'

import {
  SMART_ACCOUNT_TABS_VALUES,
  SmartAccountTabsList
} from '@components/pages/SmartAccount/SmartAccountTabsList'
import { Button } from '@components/Button'
import { Tabs } from '@components/Tabs'
import { SmartAccountTab } from '@components/pages/SmartAccount'
import { WithdrawalList } from '@components/pages/SmartAccount/withdrawalAuth/WithdrawalList'
import { CreateWithdrawalAuthModal } from '@components/pages/SmartAccount/withdrawalAuth/CreateWithdrawalAuthModal'
import { DeleteWithdrawalAuthModal } from '@components/pages/SmartAccount/withdrawalAuth/DeleteWithdrawalAuthModal'

import { useSAWithdrawalAuthHook } from '@hooks/smartAccount/useSAWithdrawalAuthHook'
import { SAWithdrawalAuthProvider } from '@contexts/SAWithdrawalAuthContext'

const WithdrawalAuthorization = () => {
  const { setIsCreateWithdrawalOpen } = useSAWithdrawalAuthHook()

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
                    onClick={() => setIsCreateWithdrawalOpen(true)}
                  >
                    Add Authorization
                  </Button>
                </div>
              </SmartAccountTab.Header>

              <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5">
                <WithdrawalList />
              </div>
            </SmartAccountTab.Root>
          </Tabs.Content>
        </Tabs.Root>

        <CreateWithdrawalAuthModal />
        <DeleteWithdrawalAuthModal />
      </div>
    </div>
  )
}

WithdrawalAuthorization.getLayout = function getLayout(page: ReactElement) {
  return <SAWithdrawalAuthProvider>{page}</SAWithdrawalAuthProvider>
}

export default WithdrawalAuthorization
