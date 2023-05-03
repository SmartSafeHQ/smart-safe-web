import Head from 'next/head'
import { ReactElement } from 'react'

import {
  SMART_ACCOUNT_TABS_VALUES,
  SmartAccountTabsList
} from '@components/pages/SmartAccount/SmartAccountTabsList'
import { Button } from '@components/Button'
import { Tabs } from '@components/Tabs'
import { SmartAccountTab } from '@components/pages/SmartAccount'
import { ContactsList } from '@components/pages/SmartAccount/contacts/ContactsList'
import { CreateContactModal } from '@components/pages/SmartAccount/contacts/CreateContactModal'
import { UpdateContactModal } from '@components/pages/SmartAccount/contacts/UpdateContactModal'
import { DeleteContactModal } from '@components/pages/SmartAccount/contacts/DeleteContactModal'

import { useSAContactsHook } from '@hooks/smartAccount/useSAContactsHook'
import { SAContactsProvider } from '@contexts/SAContactsContext'

const SmartAccount = () => {
  const { setIsCreateContactOpen } = useSAContactsHook()

  return (
    <div className="flex flex-1 flex-col items-center px-2 pt-2 bg-gray-50 dark:bg-gray-900 md:pt-6">
      <Head>
        <title>InWallet | Smart Account Contacts</title>
        <meta
          name="description"
          content="Management of the contacts registered in your smart account"
        />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <Tabs.Root defaultValue={SMART_ACCOUNT_TABS_VALUES.CONTACTS}>
          <SmartAccountTabsList />

          <Tabs.Content value={SMART_ACCOUNT_TABS_VALUES.CONTACTS}>
            <SmartAccountTab.Root>
              <SmartAccountTab.Header>
                <div className="w-full flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex flex-col relative justify-start items-stretch gap-3">
                    <SmartAccountTab.Title>Contacts</SmartAccountTab.Title>

                    <SmartAccountTab.Description>
                      Manage your network contacts
                    </SmartAccountTab.Description>
                  </div>

                  <Button
                    className="w-max"
                    onClick={() => setIsCreateContactOpen(true)}
                  >
                    Add contact
                  </Button>
                </div>
              </SmartAccountTab.Header>

              <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5">
                <ContactsList />
              </div>
            </SmartAccountTab.Root>
          </Tabs.Content>
        </Tabs.Root>

        <CreateContactModal />
        <UpdateContactModal />
        <DeleteContactModal />
      </div>
    </div>
  )
}

SmartAccount.getLayout = function getLayout(page: ReactElement) {
  return <SAContactsProvider>{page}</SAContactsProvider>
}

export default SmartAccount
