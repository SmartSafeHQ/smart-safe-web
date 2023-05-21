import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'

type SAContactsProviderProps = PropsWithChildren<Record<string, unknown>>

export interface ContactProps {
  contactAddress: string
  formattedAddress: string
  contactName: string
}

interface SAContactsContextData {
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

const SAContactsContext = createContext({} as SAContactsContextData)

export function SAContactsProvider({ children }: SAContactsProviderProps) {
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
    <SAContactsContext.Provider
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
    </SAContactsContext.Provider>
  )
}

export const useSAContacts = () => useContext(SAContactsContext)
