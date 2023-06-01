import { useSafe } from '@contexts/SafeContext'
import { useContactsQuery } from '@hooks/contacts/queries/useContactsQuery'

import { useContacts } from '@contexts/ContactsContext'

export const CONTACT_NAME_REGEX = /^[A-Za-z0-9_-]{1,20}$/

export const useContactsHook = () => {
  const {
    isCreateContactOpen,
    setIsCreateContactOpen,
    isUpdateContactOpen,
    setIsUpdateContactOpen,
    isDeleteContactOpen,
    setIsDeleteContactOpen,
    selectedContact,
    setSelectedContact,
    handleEditContact,
    handleDeleteContact
  } = useContacts()

  const { safe } = useSafe()
  const { data: contacts, isLoading, error } = useContactsQuery(safe?.ownerId!)

  return {
    contacts,
    isLoading,
    error,
    isCreateContactOpen,
    setIsCreateContactOpen,
    isUpdateContactOpen,
    setIsUpdateContactOpen,
    isDeleteContactOpen,
    setIsDeleteContactOpen,
    selectedContact,
    setSelectedContact,
    handleEditContact,
    handleDeleteContact
  }
}
