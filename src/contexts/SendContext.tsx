import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { toast } from 'react-toastify'

import {
  useSendProposalMutation,
  SendProposalFunctionOutput
} from '@hooks/send/mutation/useSendProposalMutation'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'
import { useSafe } from '@contexts/SafeContext'

type SendProviderProps = PropsWithChildren<Record<string, unknown>>

export interface TokenProps {
  address: string
  symbol: string
  icon: string
  balance: number
}

export interface TransactionProps {
  usdAmount: number
  tokenAmount: number
  to: string
  formattedTo: string
}

export interface HandleSendTransactionProps {
  amount: number
  to: string
}

type SendContextData = {
  transaction: TransactionProps | null
  selectedToken: TokenProps | null
  isSendingTx: boolean
  isSendOpen: boolean
  txData?: SendProposalFunctionOutput
  setIsSendOpen: Dispatch<SetStateAction<boolean>>
  resetSendMutation: () => void
  setTransaction: (_transaction: TransactionProps | null) => void
  setSelectedToken: (_token: TokenProps | null) => void
  handleSendTransaction: (
    _transactionData: HandleSendTransactionProps
  ) => Promise<void>
}

const SendContext = createContext({} as SendContextData)

export function SendProvider({ children }: SendProviderProps) {
  const [isSendOpen, setIsSendOpen] = useState(false)
  const [transaction, setTransaction] = useState<TransactionProps | null>(null)
  const [selectedToken, setSelectedToken] = useState<TokenProps | null>(null)

  const { safe } = useSafe()
  const [{ wallet }] = useConnectWallet()

  const {
    mutateAsync,
    isLoading: isSendingTx,
    data: txData,
    reset
  } = useSendProposalMutation()

  async function handleSendTransaction(data: HandleSendTransactionProps) {
    if (!safe || !wallet || !selectedToken) return

    try {
      await mutateAsync({
        to: data.to,
        provider: wallet.provider,
        amount: data.amount,
        safeAddress: safe.address,
        tokenContractAddress: selectedToken.address,
        symbol: selectedToken.symbol,
        chainId: safe.chain.chainId
      })

      toast.success(
        'Transaction proposal successfully created! View it on the transactions tab'
      )
    } catch (e) {
      getWe3ErrorMessageWithToast(e)
    }
  }

  return (
    <SendContext.Provider
      value={{
        isSendOpen,
        setIsSendOpen,
        transaction,
        selectedToken,
        setSelectedToken,
        isSendingTx,
        txData,
        resetSendMutation: reset,
        setTransaction,
        handleSendTransaction
      }}
    >
      {children}
    </SendContext.Provider>
  )
}

export const useSend = () => useContext(SendContext)
