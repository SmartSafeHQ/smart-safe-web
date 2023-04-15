import { ScrollArea } from '@components/ScrollArea'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { ContactsTable } from '@components/pages/SmartAccount/contacts/ContactsTable'
import { Text } from '@components/Text'

import { useSAContactsHook } from '@hooks/smart-account/useSAContactsHook'

export function ContactsList() {
  const {
    t,
    contacts,
    isLoading,
    error,
    handleEditContact,
    handleDeleteContact
  } = useSAContactsHook()

  return (
    <ScrollArea className="w-full max-w-full">
      {error ? (
        <ErrorState
          title={t.saContacts.contactsListError}
          description={(error as Error)?.message ?? 'Internal server error'}
          className="mt-10"
        />
      ) : isLoading ? (
        <LoadingState title={t.saContacts.loadingContacts} className="mt-10" />
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

                    <Text asChild className="font-medium text-gray-400">
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
  )
}
