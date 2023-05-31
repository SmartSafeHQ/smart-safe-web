import Head from 'next/head'

import {
  SMART_ACCOUNT_TABS_VALUES,
  SmartAccountTabsList
} from '@components/pages/SmartAccount/SmartAccountTabsList'
import { Tabs } from '@components/Tabs'
import { PageLayout } from '@components/pages/Layouts/PageLayout'
import { AccountManagement } from '@components/pages/Settings/AccountManagement'

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe | Smart Account Contacts</title>
        <meta
          name="description"
          content="Management of the contacts registered in your smart account"
        />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <Tabs.Root defaultValue={SMART_ACCOUNT_TABS_VALUES.ACCOUNT_MANAGEMENT}>
          <SmartAccountTabsList />

          <Tabs.Content
            className="flex-col"
            value={SMART_ACCOUNT_TABS_VALUES.ACCOUNT_MANAGEMENT}
          >
            <PageLayout.Root>
              <PageLayout.Header className="justify-center items-start gap-3 pb-8 pt-10 px-2">
                <PageLayout.Title>Account management</PageLayout.Title>

                <PageLayout.Description>
                  Manage and add further protection to your smart safe.
                </PageLayout.Description>
              </PageLayout.Header>
            </PageLayout.Root>

            <AccountManagement />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default Settings
