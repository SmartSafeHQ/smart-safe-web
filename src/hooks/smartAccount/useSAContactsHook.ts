import { useSmartAccountContacts } from '@hooks/smartAccount/queries/useContacts'

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

  const { data: contacts, isLoading, error } = useSmartAccountContacts(1)

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
