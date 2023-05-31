import Head from 'next/head'
import { ReactElement } from 'react'

import { Button } from '@components/Button'
import { PageLayout } from '@components/pages/Layouts/PageLayout'
import { ContactsList } from '@components/pages/SmartAccount/contacts/ContactsList'
import { CreateContactModal } from '@components/pages/SmartAccount/contacts/CreateContactModal'
import { UpdateContactModal } from '@components/pages/SmartAccount/contacts/UpdateContactModal'
import { DeleteContactModal } from '@components/pages/SmartAccount/contacts/DeleteContactModal'

import { useSAContactsHook } from '@hooks/smartAccount/useSAContactsHook'
import { SAContactsProvider } from '@contexts/SAContactsContext'

const Contacts = () => {
  const { setIsCreateContactOpen } = useSAContactsHook()

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
        <PageLayout.Root>
          <PageLayout.Header className="justify-center items-start gap-3 pb-8 pt-10 px-3">
            <div className="w-full flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
              <PageLayout.Title>Contacts</PageLayout.Title>

              <Button
                className="w-max"
                onClick={() => setIsCreateContactOpen(true)}
              >
                Add contact
              </Button>
            </div>

            <PageLayout.Description>
              Manage your network contacts
            </PageLayout.Description>
          </PageLayout.Header>

          <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5">
            <ContactsList />
          </div>
        </PageLayout.Root>

        <CreateContactModal />
        <UpdateContactModal />
        <DeleteContactModal />
      </div>
    </div>
  )
}

Contacts.getLayout = function getLayout(page: ReactElement) {
  return <SAContactsProvider>{page}</SAContactsProvider>
}

export default Contacts
