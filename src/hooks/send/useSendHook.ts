import { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { ethers } from 'ethers'

import { useTokenUsdValue } from '@hooks/chains/queries/useTokenUsdValue'
import { useSafeTokens } from '@hooks/chains/queries/useSafeTokens'
import { useSend } from '@contexts/SendContext'
import { formatWalletAddress } from '@utils/web3'
import { useSafe } from '@contexts/SafeContext'

export function getTokenAmountInUsd(
  amountInTokens: number,
  usdPerToken: number
) {
  return amountInTokens * usdPerToken
}

export interface AmountInputType {
  symbol: 'usd' | string
  defaultValue: number
  decimals: number
  convertTokens: (_amount: number, _usdPerToken: number) => number
  currency?: string
  reverseSymbol?: string
}

export const validationSchema = z.object({
  to: z
    .string()
    .min(1, 'Address required')
    .refine(address => {
      const isAddressValid = ethers.utils.isAddress(address)

      return isAddressValid
    }, 'Invalid address'),
  amount: z.number().min(0.0001, 'min 0.0001')
})

type SendFieldValues = z.infer<typeof validationSchema>

export const DEFAULT_AMOUNT_INPUT_TYPE: AmountInputType = {
  symbol: 'usd',
  defaultValue: 0.0,
  decimals: 3,
  convertTokens: (amountInUsd: number, usdPerToken: number) =>
    amountInUsd / usdPerToken,
  currency: '$'
}

export const useSendHook = () => {
  const { safe } = useSafe()
  const { setTransaction, selectedToken, setSelectedToken, setIsSendOpen } =
    useSend()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors }
  } = useForm<SendFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const currentAmount = watch()?.amount

  const { data: tokens, isLoading: tokensIsLoading } = useSafeTokens(
    safe?.address,
    safe?.chain.chainId,
    !!safe
  )

  const [amountInputType, setAmountInputType] = useState<AmountInputType>(
    DEFAULT_AMOUNT_INPUT_TYPE
  )

  const { data: tokenUsdData, isFetching: tokenUsdIsFetching } =
    useTokenUsdValue(selectedToken?.symbol)

  useEffect(() => {
    if (!tokens || selectedToken) {
      return
    }

    setSelectedToken(tokens[0])

    setAmountInputType({
      ...DEFAULT_AMOUNT_INPUT_TYPE,
      reverseSymbol: tokens[0]?.symbol
    })
  }, [tokens])

  const amounInReverseToken = amountInputType.convertTokens(
    currentAmount,
    tokenUsdData?.usdValue ?? 1
  )

  function handleChangeAmountInput(event: ChangeEvent<HTMLInputElement>) {
    setValue('amount', +event.target.value)
  }

  function handleToggleAmountInputType() {
    if (amountInputType.symbol === 'usd') {
      setAmountInputType({
        symbol: selectedToken?.symbol ?? 'usd',
        defaultValue: 0.0,
        decimals: 2,
        convertTokens: getTokenAmountInUsd,
        reverseSymbol: 'usd'
      })

      setValue('amount', currentAmount)
    } else {
      setAmountInputType({
        ...DEFAULT_AMOUNT_INPUT_TYPE,
        reverseSymbol: selectedToken?.symbol
      })

      setValue('amount', currentAmount)
    }
  }

  function handleChangeToken(symbol: string) {
    if (!tokens) return

    const token = tokens.find(token => token.symbol === symbol)

    if (!token) {
      return
    }

    setSelectedToken(token)
    setValue('amount', currentAmount)
    resetField('to')

    setAmountInputType({
      ...amountInputType,
      symbol: token.symbol,
      decimals: 2,
      convertTokens: getTokenAmountInUsd,
      reverseSymbol: 'usd'
    })
  }

  const onSubmit: SubmitHandler<SendFieldValues> = async data => {
    if (!selectedToken) return

    try {
      const formattedTo = formatWalletAddress({
        walletAddress: data.to
      })

      const amountData =
        amountInputType.symbol === 'usd'
          ? {
              usdAmount: currentAmount.toFixed(2),
              tokenAmount: amounInReverseToken,
              formattedTokenAmount: amounInReverseToken.toFixed(3)
            }
          : {
              usdAmount: amounInReverseToken.toFixed(2),
              tokenAmount: currentAmount,
              formattedTokenAmount: currentAmount.toFixed(3)
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
    tokenUsdIsFetching,
    amounInReverseToken,
    register,
    handleSubmit,
    onSubmit,
    errors,
    handleChangeAmountInput,
    handleToggleAmountInputType,
    tokens,
    tokensIsLoading,
    handleChangeToken,
    selectedToken,
    amountInputType
  }
}
