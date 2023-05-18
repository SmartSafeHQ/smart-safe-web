import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react'
import { toast } from 'react-toastify'
import { useConnectWallet } from '@web3-onboard/react'

import {
  useSendMutation,
  SendFunctionOutput
} from '@hooks/send/mutation/useSendMutation'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'
import { useSafe } from '@contexts/SafeContext'

type SendProviderProps = PropsWithChildren<Record<string, unknown>>

export interface TokenProps {
  symbol: string
  icon: string
  rpcUrl: string
  explorerUrl: string
}

export interface TransactionProps {
  usdAmount: string
  tokenAmount: number
  to: string
  formattedTo: string
  formattedTokenAmount: string
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
  txData?: SendFunctionOutput
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
  } = useSendMutation()

  async function handleSendTransaction(data: HandleSendTransactionProps) {
    if (!safe || !wallet) return

    try {
      await mutateAsync({
        to: data.to,
        fromSafe: safe.address,
        fromWallet: wallet.accounts[0].address,
        chainName: safe.chain.networkName,
        provider: wallet.provider,
        amount: data.amount,
        chainId: safe.chain.chainId,
        symbol: safe.chain.symbol,
        rpcUrl: safe.chain.rpcUrl
      })

      toast.success('Transaction done successfully')
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
