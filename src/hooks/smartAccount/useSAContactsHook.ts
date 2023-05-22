import { useWallets } from '@web3-onboard/react'

import { useListContacts } from '@hooks/addressBook/queries/useListContacts'

import { useSAContacts } from '@contexts/SAContactsContext'

export const CONTACT_NAME_REGEX = /^[A-Za-z0-9_-]{1,20}$/

export const useSAContactsHook = () => {
  const [wallets] = useWallets()
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

  const {
    data: contacts,
    isLoading,
    error
  } = useListContacts(wallets?.accounts[0].address)

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
