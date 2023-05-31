import { useSafe } from '@contexts/SafeContext'
import { useListContacts } from '@hooks/contacts/queries/useListContacts'

import { useSAContacts } from '@contexts/SAContactsContext'

export const CONTACT_NAME_REGEX = /^[A-Za-z0-9_-]{1,20}$/

export const useSAContactsHook = () => {
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
  } = useSAContacts()

  const { safe } = useSafe()
  const { data: contacts, isLoading, error } = useListContacts(safe?.ownerId!)

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
