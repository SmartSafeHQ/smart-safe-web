import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { ethers } from 'ethers'
import { z } from 'zod'

type AutomationsProviderProps = PropsWithChildren<Record<string, unknown>>

export const createTimeBasedAutomationValidationSchema = z.object({
  to: z.string().refine(address => {
    const isAddressValid = ethers.isAddress(address)

    return isAddressValid
  }, 'Invalid address'),
  tokenSymbol: z.string().min(1, { message: 'coin required' }),
  amount: z
    .number({ invalid_type_error: 'min 0.1' })
    .min(0.000001, { message: 'min 0.1' }),
  intervalInSeconds: z.string().min(1, { message: 'time interval required' })
})

export type CreateTimeBasedAutomationFieldValues = z.infer<
  typeof createTimeBasedAutomationValidationSchema
>

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
  createTimeBasedUseForm: UseFormReturn<CreateTimeBasedAutomationFieldValues>
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

  const createTimeBasedUseForm = useForm<CreateTimeBasedAutomationFieldValues>({
    resolver: zodResolver(createTimeBasedAutomationValidationSchema)
  })

  return (
    <AutomationsContext.Provider
      value={{
        isCreateAutomationOpen,
        setIsCreateAutomationOpen,
        isDeleteAutomationOpen,
        setIsDeleteAutomationOpen,
        selectedAutomation,
        setSelectedAutomation,
        handleDeleteAutomation,
        createTimeBasedUseForm
      }}
    >
      {children}
    </AutomationsContext.Provider>
  )
}

export const useAutomations = () => useContext(AutomationsContext)
