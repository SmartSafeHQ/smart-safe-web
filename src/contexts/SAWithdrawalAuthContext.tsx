import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'

type SAWithdrawalAuthProviderProps = PropsWithChildren<Record<string, unknown>>

export interface SelectedWithdrawalProps {
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

interface SAWithdrawalAuthContextData {
  selectedWithdrawal: SelectedWithdrawalProps | null
  isCreateWithdrawalOpen: boolean
  isDeleteWithdrawalOpen: boolean
  setSelectedWithdrawal: Dispatch<
    SetStateAction<SelectedWithdrawalProps | null>
  >
  setIsCreateWithdrawalOpen: Dispatch<SetStateAction<boolean>>
  setIsDeleteWithdrawalOpen: Dispatch<SetStateAction<boolean>>
  handleDeleteWithdrawal: (_withdrawal: SelectedWithdrawalProps) => void
}

const SAWithdrawalAuthContext = createContext({} as SAWithdrawalAuthContextData)

export function SAWithdrawalAuthProvider({
  children
}: SAWithdrawalAuthProviderProps) {
  const [isCreateWithdrawalOpen, setIsCreateWithdrawalOpen] = useState(false)
  const [isDeleteWithdrawalOpen, setIsDeleteWithdrawalOpen] = useState(false)
  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<SelectedWithdrawalProps | null>(null)

  function handleDeleteWithdrawal(withdrawal: SelectedWithdrawalProps) {
    setSelectedWithdrawal(withdrawal)

    setIsDeleteWithdrawalOpen(true)
  }

  return (
    <SAWithdrawalAuthContext.Provider
      value={{
        isCreateWithdrawalOpen,
        setIsCreateWithdrawalOpen,
        isDeleteWithdrawalOpen,
        setIsDeleteWithdrawalOpen,
        selectedWithdrawal,
        setSelectedWithdrawal,
        handleDeleteWithdrawal
      }}
    >
      {children}
    </SAWithdrawalAuthContext.Provider>
  )
}

export const useSAWithdrawalAuth = () => useContext(SAWithdrawalAuthContext)
