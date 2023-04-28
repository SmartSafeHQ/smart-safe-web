import { useSmartAccountContacts } from '@hooks/smartAccount/queries/useContacts'
import { useAuth } from '@contexts/AuthContext'
import { useSAContacts } from '@contexts/SAContactsContext'
import { useI18n } from '@hooks/useI18n'

export const CONTACT_NAME_REGEX = /^[A-Za-z0-9_-]{1,20}$/

export const useSAContactsHook = () => {
  const { t } = useI18n()
  const { customer } = useAuth()
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
  } = useSmartAccountContacts(customer?.id, !!customer)

  return {
    t,
    customer,
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
