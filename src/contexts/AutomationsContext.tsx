import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'

type AutomationsProviderProps = PropsWithChildren<Record<string, unknown>>

export interface SelectedAutomationProps {
  id: string
  amount: number
  triggerTitle: string
  token: {
    symbol: string
    icon: string
  }
  wallet: {
    address: string
    formattedAddress: string
  }
  recipientName?: string
}

interface AutomationsContextData {
  selectedAutomation: SelectedAutomationProps | null
  isCreateAutomationOpen: boolean
  isDeleteAutomationOpen: boolean
  setSelectedAutomation: Dispatch<
    SetStateAction<SelectedAutomationProps | null>
  >
  setIsCreateAutomationOpen: Dispatch<SetStateAction<boolean>>
  setIsDeleteAutomationOpen: Dispatch<SetStateAction<boolean>>
  handleDeleteAutomation: (_automation: SelectedAutomationProps) => void
}

const AutomationsContext = createContext({} as AutomationsContextData)

export function AutomationsProvider({ children }: AutomationsProviderProps) {
  const [isCreateAutomationOpen, setIsCreateAutomationOpen] = useState(false)
  const [isDeleteAutomationOpen, setIsDeleteAutomationOpen] = useState(false)
  const [selectedAutomation, setSelectedAutomation] =
    useState<SelectedAutomationProps | null>(null)

  function handleDeleteAutomation(automation: SelectedAutomationProps) {
    setSelectedAutomation(automation)

    setIsDeleteAutomationOpen(true)
  }

  return (
    <AutomationsContext.Provider
      value={{
        isCreateAutomationOpen,
        setIsCreateAutomationOpen,
        isDeleteAutomationOpen,
        setIsDeleteAutomationOpen,
        selectedAutomation,
        setSelectedAutomation,
        handleDeleteAutomation
      }}
    >
      {children}
    </AutomationsContext.Provider>
  )
}

export const useAutomations = () => useContext(AutomationsContext)
