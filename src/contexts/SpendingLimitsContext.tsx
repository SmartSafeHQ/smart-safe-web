import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'

type SpendingLimitsProviderProps = PropsWithChildren<Record<string, unknown>>

export interface SelectedSpendingLimitsProps {
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

interface SpendingLimitsContextData {
  selectedSpendingLimits: SelectedSpendingLimitsProps | null
  isCreateSpendingLimitsOpen: boolean
  isDeleteSpendingLimitsOpen: boolean
  setSelectedSpendingLimits: Dispatch<
    SetStateAction<SelectedSpendingLimitsProps | null>
  >
  setIsCreateSpendingLimitsOpen: Dispatch<SetStateAction<boolean>>
  setIsDeleteSpendingLimitsOpen: Dispatch<SetStateAction<boolean>>
  handleDeleteSpendingLimits: (
    _spendingLimit: SelectedSpendingLimitsProps
  ) => void
}

const SpendingLimitsContext = createContext({} as SpendingLimitsContextData)

export function SpendingLimitsProvider({
  children
}: SpendingLimitsProviderProps) {
  const [isCreateSpendingLimitsOpen, setIsCreateSpendingLimitsOpen] =
    useState(false)
  const [isDeleteSpendingLimitsOpen, setIsDeleteSpendingLimitsOpen] =
    useState(false)
  const [selectedSpendingLimits, setSelectedSpendingLimits] =
    useState<SelectedSpendingLimitsProps | null>(null)

  function handleDeleteSpendingLimits(
    SpendingLimits: SelectedSpendingLimitsProps
  ) {
    setSelectedSpendingLimits(SpendingLimits)

    setIsDeleteSpendingLimitsOpen(true)
  }

  return (
    <SpendingLimitsContext.Provider
      value={{
        isCreateSpendingLimitsOpen,
        setIsCreateSpendingLimitsOpen,
        isDeleteSpendingLimitsOpen,
        setIsDeleteSpendingLimitsOpen,
        selectedSpendingLimits,
        setSelectedSpendingLimits,
        handleDeleteSpendingLimits
      }}
    >
      {children}
    </SpendingLimitsContext.Provider>
  )
}

export const useSpendingLimits = () => useContext(SpendingLimitsContext)
