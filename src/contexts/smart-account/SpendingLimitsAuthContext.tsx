import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'

type SpendingLimitsAuthProviderProps = PropsWithChildren<
  Record<string, unknown>
>

export interface SelectedSpendingLimitsProps {
  index: number
  recipientName?: string
  coinAmount: number
  dateFrom: Date
  coin: {
    symbol: string
    avatar: string
    address: string
  }
  wallet: {
    address: string
    formattedAddress: string
  }
}

interface SpendingLimitsAuthContextData {
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

const SpedningLimitsAuthContext = createContext(
  {} as SpendingLimitsAuthContextData
)

export function SpendingLimitsAuthProvider({
  children
}: SpendingLimitsAuthProviderProps) {
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
    <SpedningLimitsAuthContext.Provider
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
    </SpedningLimitsAuthContext.Provider>
  )
}

export const useSpendingLimitsAuth = () => useContext(SpedningLimitsAuthContext)
