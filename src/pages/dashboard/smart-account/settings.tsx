import Head from 'next/head'

import {
  SMART_ACCOUNT_TABS_VALUES,
  SmartAccountTabsList
} from '@components/pages/SmartAccount/SmartAccountTabsList'
import { Tabs } from '@components/Tabs'
import { SmartAccountTab } from '@components/pages/SmartAccount'
import { ContactsList } from '@components/pages/SmartAccount/contacts/ContactsList'

const Settings = () => {
  return (
    <div className="flex flex-1 flex-col items-center px-2 pt-2 bg-gray-50 dark:bg-gray-900 md:pt-6">
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
            <SmartAccountTab.Root>
              <SmartAccountTab.Header>
                <div className="w-full flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex flex-col relative justify-start items-stretch gap-3">
                    <SmartAccountTab.Title>
                      Account recovery
                    </SmartAccountTab.Title>

                    <SmartAccountTab.Description>
                      Add further protection to your account by enabling two
                      factor authentication methods.
                    </SmartAccountTab.Description>
                  </div>
                </div>
              </SmartAccountTab.Header>

              <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5">
                <ContactsList />
              </div>
            </SmartAccountTab.Root>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default Settings
