import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { toast } from 'react-toastify'

import {
  HandleSendTransactionProps,
  TransactionProps,
  CoinProps
} from '@hooks/send/interfaces'
import {
  SendFunctionOutput,
  useSendMutation
} from '@hooks/send/mutation/useSendMutation'
import { useAuth } from '@contexts/AuthContext'
import { getEthersErrorCode } from '@utils/global'
import { useI18n } from '@hooks/useI18n'
import { COINS_ATTRIBUTES } from '@/utils/global/coins/config'

type SendProviderProps = PropsWithChildren<Record<string, unknown>>

type SendContextData = {
  transaction: TransactionProps | null
  selectedCoin: CoinProps
  isSendingTx: boolean
  txData?: SendFunctionOutput
  resetSendMutation: () => void
  setTransaction: (_transaction: TransactionProps | null) => void
  setSelectedCoin: (_coin: CoinProps) => void
  handleSendTransaction: (
    _transactionData: HandleSendTransactionProps
  ) => Promise<void>
}

const SendContext = createContext({} as SendContextData)

export function SendProvider({ children }: SendProviderProps) {
  const [transaction, setTransaction] = useState<TransactionProps | null>(null)
  const [selectedCoin, setSelectedCoin] = useState<CoinProps>(
    COINS_ATTRIBUTES[0]
  )

  const { customer } = useAuth()
  const { t } = useI18n()

  const {
    mutateAsync,
    isLoading: isSendingTx,
    data: txData,
    reset
  } = useSendMutation()

  async function handleSendTransaction(
    transactionData: HandleSendTransactionProps
  ) {
    if (!customer) return

    try {
      const fromWalletPrivateKey =
        transactionData.symbol === 'sol'
          ? customer.wallets.solana.privateKey
          : customer.wallets.evm.privateKey

      await mutateAsync({
        ...transactionData,
        fromWalletPrivateKey
      })

      toast.success(`Transaction done successfully`)
    } catch (error) {
      console.error(error)

      let errorMessage

      const errorCode = getEthersErrorCode(error)

      if (errorCode) {
        errorMessage = t.errors.web3E.ether.get(errorCode)?.message
      }

      toast.error(errorMessage ?? t.errors.default)
    }
  }

  return (
    <SendContext.Provider
      value={{
        transaction,
        selectedCoin,
        setSelectedCoin,
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
