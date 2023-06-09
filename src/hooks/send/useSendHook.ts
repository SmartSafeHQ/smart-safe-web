import { ChangeEvent, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { ethers } from 'ethers'

import { useTokenUsdValue } from '@hooks/chains/queries/useTokenUsdValue'
import { useSafeTokens } from '@hooks/safe/queries/useSafeTokens'
import { useSend } from '@contexts/SendContext'
import { formatWalletAddress } from '@utils/web3'
import { useSafe } from '@contexts/SafeContext'

const AMOUNT_REGEX = /(?<=\..*)\.|[^0-9.]/g

export const validationSchema = z.object({
  to: z
    .string()
    .min(1, 'Address required')
    .refine(address => {
      const isAddressValid = ethers.isAddress(address)

      return isAddressValid
    }, 'Invalid address'),
  amount: z.string().refine(amount => {
    const isNumberValid = !isNaN(+amount)

    return isNumberValid
  }, 'Invalid amount')
})

type SendFieldValues = z.infer<typeof validationSchema>

export const useSendHook = () => {
  const { safe } = useSafe()
  const { setTransaction, selectedToken, setSelectedToken, setIsSendOpen } =
    useSend()

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors }
  } = useForm<SendFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const { data: tokens, isLoading: tokensIsLoading } = useSafeTokens(
    safe?.address,
    safe?.chain.symbol,
    !!safe
  )
  const { data: tokenUsdData, isFetching: tokenUsdIsFetching } =
    useTokenUsdValue(selectedToken?.symbol)

  const currentAmount = watch()?.amount ?? '0'
  const contactSearch = watch('to')
  const usdAmount = +currentAmount * (tokenUsdData?.usdValue ?? 0)

  useEffect(() => {
    if (!tokens || selectedToken) {
      return
    }

    setSelectedToken(tokens[0])
  }, [tokens])

  function handleChangeAmountInput(event: ChangeEvent<HTMLInputElement>) {
    const amount = event.target.value.replace(AMOUNT_REGEX, '')

    setValue('amount', amount)
  }

  function handleChangeToken(symbol: string) {
    if (!tokens) return

    const token = tokens.find(token => token.symbol === symbol)

    if (!token) {
      return
    }

    setSelectedToken(token)
  }

  const onSubmit: SubmitHandler<SendFieldValues> = async data => {
    if (!selectedToken || !tokenUsdData || +data.amount <= 0) {
      return
    }

    if (+data.amount > selectedToken.balance) {
      setError('amount', {
        message: 'Insufficient funds in the safe for the transaction'
      })
      return
    }

    try {
      const formattedTo = formatWalletAddress(data.to)

      const amountData = {
        usdAmount: +currentAmount * tokenUsdData.usdValue,
        tokenAmount: +currentAmount
      }

      setTransaction({
        ...amountData,
        to: data.to,
        formattedTo
      })

      setIsSendOpen(true)
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return {
    tokens,
    selectedToken,
    tokensIsLoading,
    handleChangeToken,
    handleChangeAmountInput,
    register,
    setValue,
    handleSubmit,
    errors,
    onSubmit,
    tokenUsdIsFetching,
    usdAmount,
    contactSearch
  }
}
