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

type DeployStatusProps = {
  isLoading: boolean
  isDeployed: boolean
  safeId?: string
}

interface CreateSafeContextData {
  safeInfos: SafeInfosProps | null
  setSafeInfos: Dispatch<SetStateAction<SafeInfosProps | null>>
  deployStatus: DeployStatusProps
  setDeployStatus: Dispatch<SetStateAction<DeployStatusProps>>
}

const CreateSafeContext = createContext({} as CreateSafeContextData)

export function CreateSafeProvider({ children }: CreateSafeProviderProps) {
  const [safeInfos, setSafeInfos] = useState<SafeInfosProps | null>(null)
  const [deployStatus, setDeployStatus] = useState<DeployStatusProps>({
    isLoading: false,
    isDeployed: false
  })

  return (
    <CreateSafeContext.Provider
      value={{
        safeInfos,
        setSafeInfos,
        deployStatus,
        setDeployStatus
      }}
    >
      {children}
    </CreateSafeContext.Provider>
  )
}

export const useCreateSafe = () => useContext(CreateSafeContext)
