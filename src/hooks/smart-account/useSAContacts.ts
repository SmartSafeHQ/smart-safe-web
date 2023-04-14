import { useState } from 'react'

import { useSmartAccountContacts } from '@hooks/smart-account/queries/useContacts'
import { useAuth } from '@contexts/AuthContext'
import { useI18n } from '@hooks/useI18n'

export interface SelectedContactProps {
  id: string
  name: string
  wallet: {
    address: string
    formattedAddress: string
  }
}

export const useSAContacts = () => {
  const [selectedContact, setSelectedContact] =
    useState<SelectedContactProps | null>(null)
  const { t } = useI18n()
  const { customer } = useAuth()

  const {
    data: contacts,
    isLoading,
    error
  } = useSmartAccountContacts(customer?.id, !!customer)

  function handleEditContact(contact: SelectedContactProps) {
    setSelectedContact(contact)

    console.log(selectedContact)
  }

  function handleDeleteContact(contact: SelectedContactProps) {
    setSelectedContact(contact)

    console.log(selectedContact)
  }

  return {
    t,
    contacts,
    isLoading,
    error,
    handleEditContact,
    handleDeleteContact
  }
}
