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

const validationSchema = z.object({
  sendWallet: z.string().min(1, { message: 'adrress required' }),
  amount: z.number().min(1, { message: 'min $1' })
})

type SendFieldValues = z.infer<typeof validationSchema>

interface CoinProps {
  id: string
  name: string
  avatar: string
  chainId: number
  rpcUrl: string
}

export const useSend = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SendFieldValues>({
    resolver: zodResolver(validationSchema)
  })
  const { data: feeData } = useFeeData({
    chainId: 80001,
    formatUnits: 'ether'
  })

  const [selectedCoin] = useState<CoinProps>(ACCEPTED_COINS_LIST[0])

  const { widgetProvider, customer } = useAuth()
  const { data } = useEndUserUsedTokens(
    true,
    Number(feeData?.formatted.gasPrice)
  )
  const { mutateAsync } = useSendMutation()

  const onSubmit: SubmitHandler<SendFieldValues> = async data => {
    try {
      await mutateAsync({
        amount: data.amount,
        sendWallet: data.sendWallet,
        chainId: selectedCoin.chainId,
        rpcUrl: selectedCoin.rpcUrl
      })

      widgetProvider?.getProvider.overlay.show()

      widgetProvider?.getProvider.sendTransaction({
        currencyType: 'fiat',
        amount: '200000000000000000',
        to: customer?.wallet.address
      })
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  const selectedCoinValue = data?.find(coin => coin.id === selectedCoin.id)

  const coinUsdValue = Number(selectedCoinValue?.price)
  const feeUsdValue = Number(selectedCoinValue?.feeUsdPrice)

  const currentAmount = !watch().amount ? 0 : watch().amount
  const currentMaticAmount = currentAmount / coinUsdValue

  const currentDollarFee = feeUsdValue * currentAmount
  const currentMaticFee = currentDollarFee / coinUsdValue

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    selectedCoin,
    currentAmount,
    currentMaticAmount,
    currentMaticFee,
    currentDollarFee
  }
}
