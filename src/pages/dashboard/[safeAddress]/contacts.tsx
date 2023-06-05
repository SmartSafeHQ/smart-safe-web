import Head from 'next/head'
import { ReactElement } from 'react'

import { Button } from '@components/Button'
import { PageLayout } from '@components/pages/Layouts/PageLayout'
import { ContactsList } from '@components/pages/Contacts/ContactsList'
import { CreateContactModal } from '@components/pages/Contacts/CreateContactModal'
import { UpdateContactModal } from '@components/pages/Contacts/UpdateContactModal'
import { DeleteContactModal } from '@components/pages/Contacts/DeleteContactModal'

import { useContactsHook } from '@hooks/contacts/useContactsHook'
import { ContactsProvider } from '@contexts/ContactsContext'

const Contacts = () => {
  const { setIsCreateContactOpen } = useContactsHook()

  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe | Contacts</title>
        <meta
          name="description"
          content="Management of the contacts registered in your wallet"
        />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <PageLayout.Root>
          <PageLayout.Header className="flex-col justify-between items-stretch gap-3 pb-8 pt-4 px-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-col items-stretch justify-between gap-4">
              <PageLayout.Title>Contacts</PageLayout.Title>

              <PageLayout.Description>
                Manage your network contacts
              </PageLayout.Description>
            </div>

            <Button
              className="w-max"
              onClick={() => setIsCreateContactOpen(true)}
            >
              Add contact
            </Button>
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
  return <ContactsProvider>{page}</ContactsProvider>
}

export default Contacts
