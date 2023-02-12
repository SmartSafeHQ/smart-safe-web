import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { useFeeData } from 'wagmi'

import { ACCEPTED_COINS_LIST } from '@utils/sendUtils'
import { useSendMutation } from '@hooks/send/mutation/useSendMutation'
import { useEndUserUsedTokens } from '@hooks/send/queries/useEndUserUsedTokens'
import { useAuth } from '@contexts/AuthContext'
import { formatCurrencyToNumber } from '@utils/global'

const validationSchema = z.object({
  sendWallet: z.string().min(1, { message: 'adrress required' }),
  amount: z.string().min(4, { message: 'min 0.0001' })
})

type SendFieldValues = z.infer<typeof validationSchema>

export interface CoinProps {
  id: string
  name: string
  avatar: string
  chainId: number
  rpcUrl: string
  explorerUrl: string
}

export interface TransactionProps {
  to: string
  fromWalletAddress: string
  fromWalletPrivateKey: string
  fromName: string
  usdAmount: string
  coinAmount: number
  chainId: number
  rpcUrl: string
}

export const useSend = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<SendFieldValues>({
    resolver: zodResolver(validationSchema)
  })
  const { data: feeData } = useFeeData({
    chainId: 80001,
    formatUnits: 'ether'
  })

  const [isSendModalOpen, setIsSendModalOpen] = useState(false)
  const [transactionUrl, setTransactionUrl] = useState<null | string>(null)
  const [selectedCoin] = useState<CoinProps>(ACCEPTED_COINS_LIST[0])
  const [transactionData, setTransactionData] =
    useState<TransactionProps | null>(null)

  const { data } = useEndUserUsedTokens(
    true,
    Number(feeData?.formatted.gasPrice)
  )
  const { mutateAsync, isLoading: isSendingTx } = useSendMutation()
  const { customer } = useAuth()

  const selectedCoinValue = data?.find(coin => coin.id === selectedCoin.id)

  const coinUsdValue = Number(selectedCoinValue?.price)
  const feeUsdValue = Number(selectedCoinValue?.feeUsdPrice)

  const currentAmount = !watch().amount
    ? 0
    : formatCurrencyToNumber(watch().amount)
  const currentMaticAmount = currentAmount / coinUsdValue

  const currentDollarFee = feeUsdValue * currentAmount
  const currentMaticFee = currentDollarFee / coinUsdValue

  const onSubmit: SubmitHandler<SendFieldValues> = async data => {
    if (!customer) {
      toast.error(`Error. Invalid user`)

      return
    }

    try {
      setTransactionData({
        to: data.sendWallet,
        fromWalletAddress: customer?.wallet.address,
        fromWalletPrivateKey: customer?.wallet.privateKey,
        fromName: customer?.name,
        usdAmount: data.amount,
        coinAmount: currentMaticAmount,
        chainId: selectedCoin.chainId,
        rpcUrl: selectedCoin.rpcUrl
      })

      setIsSendModalOpen(true)
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  async function handleSendTransaction() {
    try {
      if (!transactionData) {
        toast.error(`Error. Invalid transaction infos`)

        return
      }

      const response = await mutateAsync({
        ...transactionData,
        amount: transactionData.coinAmount
      })

      const transactionUrl = `${selectedCoin.explorerUrl}/tx/${response.transactionHash}`

      toast.success(`Transaction done successfully`)

      setTransactionUrl(transactionUrl)
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    isSendingTx,
    transactionUrl,
    setTransactionUrl,
    onSubmit,
    handleSendTransaction,
    isSendModalOpen,
    setIsSendModalOpen,
    transactionData,
    selectedCoin,
    currentAmount,
    currentMaticAmount,
    currentMaticFee,
    currentDollarFee
  }
}
