import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { ACCEPTED_COINS_LIST } from '@utils/sendUtils'
import { useSendMutation } from '@hooks/send/mutation/useSendMutation'
import { useEndUserUsedTokens } from '@hooks/send/queries/useEndUserUsedTokens'

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

  const [selectedCoin] = useState<CoinProps>(ACCEPTED_COINS_LIST[0])

  const { data } = useEndUserUsedTokens()
  const { mutateAsync } = useSendMutation()

  const onSubmit: SubmitHandler<SendFieldValues> = async data => {
    try {
      await mutateAsync({
        amount: data.amount,
        sendWallet: data.sendWallet,
        chainId: selectedCoin.chainId,
        rpcUrl: selectedCoin.rpcUrl
      })

      toast.success('Transaction done successfully.')
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  const selectedCoinValue = data?.find(coin => coin.id === selectedCoin.id)

  const currentAmount = watch().amount ?? 1
  const currentMaticAmount = selectedCoinValue
    ? currentAmount / selectedCoinValue?.price
    : 0

  const currentMaticFee = 2
  const currentDollarFee = 4

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
