import Head from 'next/head'

import {
  SMART_ACCOUNT_TABS_VALUES,
  SmartAccountTabsList
} from '@components/pages/SmartAccount/SmartAccountTabsList'
import { Tabs } from '@components/Tabs'
import { PageLayout } from '@components/pages/Layouts/PageLayout'

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
        <Tabs.Root defaultValue={SMART_ACCOUNT_TABS_VALUES.ACCOUNT_RECOVERY}>
          <SmartAccountTabsList />

          <Tabs.Content value={SMART_ACCOUNT_TABS_VALUES.ACCOUNT_RECOVERY}>
            <PageLayout.Root>
              <PageLayout.Header className="justify-center items-start gap-3 pb-8 pt-10 px-2">
                <PageLayout.Title>Account recovery</PageLayout.Title>

                <PageLayout.Description>
                  Add further protection to your account by enabling two factor
                  authentication methods.
                </PageLayout.Description>
              </PageLayout.Header>
            </PageLayout.Root>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default Settings
