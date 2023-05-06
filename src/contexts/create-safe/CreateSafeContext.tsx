import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'
import { ChainSettings } from '@utils/web3/chains/supportedChains'

type CreateSafeProviderProps = PropsWithChildren<Record<string, unknown>>

type SafeInfosProps = {
  name: string
  chain: ChainSettings
}

interface CreateSafeContextData {
  safeInfos: SafeInfosProps | null
  setSafeInfos: Dispatch<SetStateAction<SafeInfosProps | null>>
}

const CreateSafeContext = createContext({} as CreateSafeContextData)

export function CreateSafeProvider({ children }: CreateSafeProviderProps) {
  const [safeInfos, setSafeInfos] = useState<SafeInfosProps | null>(null)

  return (
    <CreateSafeContext.Provider
      value={{
        safeInfos,
        setSafeInfos
      }}
    >
      {children}
    </CreateSafeContext.Provider>
  )
}

export const useCreateSafe = () => useContext(CreateSafeContext)
