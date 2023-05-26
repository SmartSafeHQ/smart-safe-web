import { ScrollArea } from '@components/ScrollArea'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { LoadingState } from '@components/FetchingStates/LoadingState'
import { ContactsTable } from '@components/pages/SmartAccount/contacts/ContactsTable'
import { Text } from '@components/Text'

import { useSAContactsHook } from '@hooks/smartAccount/useSAContactsHook'

export function ContactsList() {
  const { contacts, isLoading, error, handleEditContact, handleDeleteContact } =
    useSAContactsHook()

  return (
    <ScrollArea>
      {error ? (
        <ErrorState
          title="Unable to load your contacts, please try again"
          description={(error as Error)?.message ?? 'Internal server error'}
          className="mt-10"
        />
      ) : isLoading ? (
        <LoadingState title="Loading your contacts" className="mt-10" />
      ) : contacts && contacts.length === 0 ? (
        <div className="w-full flex flex-col items-center gap-1 pt-8 text-center">
          <Text asChild className="text-lg font-medium">
            <strong>No contacts yet!</strong>
          </Text>

          <Text asChild className="font-medium text-gray-400">
            Create a contact to facilitate your navigation on the network.
          </Text>
        </div>
      ) : (
        contacts && (
          <>
            <table className="w-full">
              <thead className="bg-gray-200 bg-opacity-60 border-[0.5px] border-[#e0e0e0] dark:border-[#333] dark:bg-gray-800">
                <tr className="uppercase text-gray-500 dark:text-gray-400">
                  <ContactsTable.Th className="pl-2 py-3 ">
                    name
                  </ContactsTable.Th>

                  <ContactsTable.Th className="py-3 ">address</ContactsTable.Th>

                  <th />
                </tr>
              </thead>

              <tbody>
                {contacts.map(contact => (
                  <ContactsTable.Tr
                    key={contact.contactAddress}
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
