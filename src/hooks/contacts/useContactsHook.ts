import { useWallets } from '@web3-onboard/react'

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

  const [wallets] = useWallets()
  const {
    data: contacts,
    isLoading,
    error
  } = useContactsQuery(wallets?.accounts[0].address, !!wallets)

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
