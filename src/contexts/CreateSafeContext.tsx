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

interface SafeInfosProps {
  name: string
  chain: ChainSettings
}

export type DeployStatus = 'loading' | 'success' | 'error'

export interface StepProps {
  status: DeployStatus
  message: string
  error?: string
}

interface DeployStatusProps {
  steps: StepProps[]
  safeAddress?: string
  isDeployEnabled: boolean
}

interface CreateSafeContextData {
  safeInfos: SafeInfosProps | null
  setSafeInfos: Dispatch<SetStateAction<SafeInfosProps | null>>
  deployStatus: DeployStatusProps
  setDeployStatus: Dispatch<SetStateAction<DeployStatusProps>>
}

export const DEFAULT_STEPS: StepProps[] = [
  { status: 'loading', message: 'Waiting for your final touches...' }
]

const CreateSafeContext = createContext({} as CreateSafeContextData)

export function CreateSafeProvider({ children }: CreateSafeProviderProps) {
  const [safeInfos, setSafeInfos] = useState<SafeInfosProps | null>(null)
  const [deployStatus, setDeployStatus] = useState<DeployStatusProps>({
    steps: DEFAULT_STEPS,
    isDeployEnabled: false
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
