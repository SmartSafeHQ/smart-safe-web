import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'

type SafeManagementProviderProps = PropsWithChildren<Record<string, unknown>>

interface SafeManagementContextData {
  isAddOwnerOpen: boolean
  isChangeThresholdOpen: boolean
  setIsAddOwnerOpen: Dispatch<SetStateAction<boolean>>
  setIsChangeThresholdOpen: Dispatch<SetStateAction<boolean>>
}

const SafeManagementContext = createContext({} as SafeManagementContextData)

export function SafeManagementProvider({
  children
}: SafeManagementProviderProps) {
  const [isAddOwnerOpen, setIsAddOwnerOpen] = useState(false)
  const [isChangeThresholdOpen, setIsChangeThresholdOpen] = useState(false)

  return (
    <SafeManagementContext.Provider
      value={{
        isAddOwnerOpen,
        setIsAddOwnerOpen,
        isChangeThresholdOpen,
        setIsChangeThresholdOpen
      }}
    >
      {children}
    </SafeManagementContext.Provider>
  )
}

export const useSafeManagement = () => useContext(SafeManagementContext)
