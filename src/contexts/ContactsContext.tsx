import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'

type ContactsProviderProps = PropsWithChildren<Record<string, unknown>>

export interface ContactProps {
  id: number
  name: string
  address: string
  formattedAddress: string
}

interface ContactsContextData {
  selectedContact: ContactProps | null
  isCreateContactOpen: boolean
  isUpdateContactOpen: boolean
  isDeleteContactOpen: boolean
  setSelectedContact: Dispatch<SetStateAction<ContactProps | null>>
  setIsCreateContactOpen: Dispatch<SetStateAction<boolean>>
  setIsUpdateContactOpen: Dispatch<SetStateAction<boolean>>
  setIsDeleteContactOpen: Dispatch<SetStateAction<boolean>>
  handleEditContact: (_contact: ContactProps) => void
  handleDeleteContact: (_contact: ContactProps) => void
}

const ContactsContext = createContext({} as ContactsContextData)

export function ContactsProvider({ children }: ContactsProviderProps) {
  const [isCreateContactOpen, setIsCreateContactOpen] = useState(false)
  const [isUpdateContactOpen, setIsUpdateContactOpen] = useState(false)
  const [isDeleteContactOpen, setIsDeleteContactOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<ContactProps | null>(
    null
  )

  function handleEditContact(contact: ContactProps) {
    setSelectedContact(contact)

    setIsUpdateContactOpen(true)
  }

  function handleDeleteContact(contact: ContactProps) {
    setSelectedContact(contact)

    setIsDeleteContactOpen(true)
  }

  return (
    <ContactsContext.Provider
      value={{
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
      }}
    >
      {children}
    </ContactsContext.Provider>
  )
}

export const useContacts = () => useContext(ContactsContext)
