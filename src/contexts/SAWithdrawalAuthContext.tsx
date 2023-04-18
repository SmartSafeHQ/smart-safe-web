import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'

type SAWithdrawalAuthProviderProps = PropsWithChildren<Record<string, unknown>>

export interface SelectedContactProps {
  id: number
  name: string
  wallet: {
    address: string
    formattedAddress: string
  }
}

interface SAWithdrawalAuthContextData {
  selectedContact: SelectedContactProps | null
  isCreateContactOpen: boolean
  isUpdateContactOpen: boolean
  isDeleteContactOpen: boolean
  setSelectedContact: Dispatch<SetStateAction<SelectedContactProps | null>>
  setIsCreateContactOpen: Dispatch<SetStateAction<boolean>>
  setIsUpdateContactOpen: Dispatch<SetStateAction<boolean>>
  setIsDeleteContactOpen: Dispatch<SetStateAction<boolean>>
  handleEditContact: (_contact: SelectedContactProps) => void
  handleDeleteContact: (_contact: SelectedContactProps) => void
}

const SAWithdrawalAuthContext = createContext({} as SAWithdrawalAuthContextData)

export function SAWithdrawalAuthProvider({
  children
}: SAWithdrawalAuthProviderProps) {
  const [isCreateContactOpen, setIsCreateContactOpen] = useState(false)
  const [isUpdateContactOpen, setIsUpdateContactOpen] = useState(false)
  const [isDeleteContactOpen, setIsDeleteContactOpen] = useState(false)
  const [selectedContact, setSelectedContact] =
    useState<SelectedContactProps | null>(null)

  function handleEditContact(contact: SelectedContactProps) {
    setSelectedContact(contact)

    setIsUpdateContactOpen(true)
  }

  function handleDeleteContact(contact: SelectedContactProps) {
    setSelectedContact(contact)

    setIsDeleteContactOpen(true)
  }

  return (
    <SAWithdrawalAuthContext.Provider
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
    </SAWithdrawalAuthContext.Provider>
  )
}

export const useSAWithdrawalAuth = () => useContext(SAWithdrawalAuthContext)
