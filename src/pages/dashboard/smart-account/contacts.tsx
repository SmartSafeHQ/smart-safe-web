import Head from 'next/head'

import {
  SMART_ACCOUNT_TABS_VALUES,
  SmartAccountTabsList
} from '@components/pages/SmartAccount/SmartAccountTabsList'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { Tabs } from '@components/Tabs'
import { SmartAccountTab } from '@components/pages/SmartAccount'
import { ContactsTable } from '@components/pages/SmartAccount/ContactsTable'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { ScrollArea } from '@components/ScrollArea'

import { useSAContacts } from '@hooks/smart-account/useSAContacts'

const SmartAccount = () => {
  const {
    t,
    contacts,
    isLoading,
    error,
    handleEditContact,
    handleDeleteContact
  } = useSAContacts()

  return (
    <div className="flex flex-1 flex-col items-center px-2 pt-2 bg-gray-50 dark:bg-gray-900 md:pt-6">
      <Head>
        <title>{t.saContacts.headTitle}</title>
        <meta name="description" content={t.saContacts.headDescription} />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <Tabs.Root defaultValue={SMART_ACCOUNT_TABS_VALUES.CONTACTS}>
          <SmartAccountTabsList />

          <Tabs.Content value={SMART_ACCOUNT_TABS_VALUES.CONTACTS}>
            <SmartAccountTab.Root>
              <SmartAccountTab.Header>
                <div className="w-full flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex flex-col relative justify-start items-stretch gap-3">
                    <SmartAccountTab.Title>
                      {t.saContacts.title}
                    </SmartAccountTab.Title>

                    <SmartAccountTab.Description>
                      {t.saContacts.description}
                    </SmartAccountTab.Description>
                  </div>

                  <Button className="w-max">{t.saContacts.addContact}</Button>
                </div>
              </SmartAccountTab.Header>

              <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5">
                <ScrollArea className="w-full max-w-full">
                  {error ? (
                    <ErrorState
                      title={t.saContacts.contactsListError}
                      description={
                        (error as Error)?.message ?? 'Internal server error'
                      }
                      className="mt-10"
                    />
                  ) : isLoading ? (
                    <LoadingState
                      title={t.saContacts.loadingContacts}
                      className="mt-10"
                    />
                  ) : (
                    contacts && (
                      <>
                        <table className="w-full">
                          <thead className="bg-gray-200 bg-opacity-60 border-[0.5px] border-[#e0e0e0] dark:border-[#333] dark:bg-gray-800">
                            <tr className="uppercase text-gray-500 dark:text-gray-400">
                              <ContactsTable.Th className="pl-2 py-3 ">
                                {t.saContacts.name}
                              </ContactsTable.Th>

                              <ContactsTable.Th className="py-3 ">
                                {t.saContacts.address}
                              </ContactsTable.Th>

                              <th />
                            </tr>
                          </thead>

                          <tbody>
                            {contacts.length === 0 && (
                              <div className="max-w-lg flex flex-col items-center gap-1 text-center">
                                <Text asChild className="text-lg font-medium">
                                  <strong>{t.saContacts.noItemsTitle}</strong>
                                </Text>

                                <Text
                                  asChild
                                  className="font-medium text-gray-400"
                                >
                                  {t.saContacts.noItemsDesc}
                                </Text>
                              </div>
                            )}

                            {contacts.map(contact => (
                              <ContactsTable.Tr
                                key={contact.id}
                                contact={contact}
                                handleEditContact={handleEditContact}
                                handleDeleteContact={handleDeleteContact}
                              />
                            ))}
                          </tbody>
                        </table>
                      </>
                    )
                  )}
                </ScrollArea>
              </div>
            </SmartAccountTab.Root>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default SmartAccount
