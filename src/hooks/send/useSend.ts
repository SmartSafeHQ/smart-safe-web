import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { PublicKey } from '@solana/web3.js'
import { ethers } from 'ethers'

import {
  getUsdAmountInCoinExchangeRate,
  getCoinAmountInUsd,
  formatToCurrency
} from '@utils/global/coins'
import { formatCurrencyToNumber, formatWalletAddress } from '@utils/global'
import { useAuth } from '@contexts/AuthContext'
import { useI18n } from '@hooks/useI18n'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'
import { useCoinValueInUsd } from '@hooks/global/coins/queries/useCoinValueInUsd'
import { AmountInputType } from '@hooks/send/interfaces'
import { queryClient } from '@lib/reactQuery'
import {
  fetchAccount2faSettings,
  FetchAccount2faSettingsResponse
} from '@hooks/accounts/queries/useAccount2faSettings'
import { useSend } from '@contexts/SendContext'

export const validationSchema = z.object({
  sendWallet: z.string().min(1, { message: 'Invalid wallet address.' }),
  amount: z.string().min(4, { message: 'min 0.0001' })
})

type SendFieldValues = z.infer<typeof validationSchema>

export const DEFAULT_AMOUNT_INPUT_TYPE: AmountInputType = {
  symbol: 'usd',
  defaultValue: '$0.00 USD',
  decimals: 3,
  convertCoins: getUsdAmountInCoinExchangeRate,
  currency: '$'
}

export const useCustomSendHook = () => {
  const { setTransaction, selectedCoin, setSelectedCoin } = useSend()
  const { t } = useI18n()
  const { customer, setCustomer2FA, customer2FA, setIs2FAVerifyOpen } =
    useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    resetField,
    formState: { errors }
  } = useForm<SendFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const [isSendOpen, setIsSendOpen] = useState(false)

  const currentAmount = formatCurrencyToNumber(watch()?.amount ?? '0')

  const { data: coinsData, isLoading: coinsIsLoading } = useCustomerCoins(
    customer?.wallets.evm.address
  )

  const [amountInputType, setAmountInputType] = useState<AmountInputType>(
    DEFAULT_AMOUNT_INPUT_TYPE
  )

  const { data: coinInUsdData, isFetching: coinInUsdIsFetching } =
    useCoinValueInUsd(selectedCoin?.symbol)

  useEffect(() => {
    if (!customer) return

    queryClient
      .ensureQueryData<FetchAccount2faSettingsResponse>({
        queryKey: ['account2faSettings', customer.id],
        queryFn: () => fetchAccount2faSettings({ id: customer.id })
      })
      .then(response => {
        const fields = {
          send2faEnabled: response.send2faEnabled === true ?? false,
          exportKeys2faEnabled: response.exportKeys2faEnabled === true ?? false
        }

        setCustomer2FA(
          prev =>
            prev && {
              ...prev,
              ...fields
            }
        )
      })
  }, [customer])

  useEffect(() => {
    if (!coinsData || selectedCoin) {
      return
    }

    setSelectedCoin(coinsData.coins[0])

    setAmountInputType({
      ...DEFAULT_AMOUNT_INPUT_TYPE,
      reverseSymbol: coinsData.coins[0]?.symbol
    })
  }, [coinsData])

  const amounInReverseCoin = amountInputType.convertCoins(
    currentAmount,
    coinInUsdData?.valueInUsd ?? 1
  )

  function handleChangeAmountInput(event: ChangeEvent<HTMLInputElement>) {
    const floatAmount = formatCurrencyToNumber(event.target.value)

    const formattedAmount = formatToCurrency({ floatAmount })

    setValue(
      'amount',
      `${amountInputType?.currency ?? ''}${formattedAmount} ${
        amountInputType.symbol
      }`
    )
  }

  function handleToggleAmountInputType(event: MouseEvent) {
    event.preventDefault()

    if (amountInputType.symbol === 'usd') {
      setAmountInputType({
        symbol: selectedCoin?.symbol ?? 'usd',
        defaultValue: `0.00 ${selectedCoin?.symbol}`,
        decimals: 2,
        convertCoins: getCoinAmountInUsd,
        reverseSymbol: 'usd'
      })

      setValue('amount', `${currentAmount.toFixed(2)} ${selectedCoin?.symbol}`)
    } else {
      setAmountInputType({
        ...DEFAULT_AMOUNT_INPUT_TYPE,
        reverseSymbol: selectedCoin?.symbol
      })

      setValue('amount', `$${currentAmount.toFixed(2)} usd`)
    }
  }

  function handleChangeCoin(coinIndex: string) {
    if (!coinsData) return

    const coin = coinsData.coins[Number(coinIndex)]

    setSelectedCoin(coin)
    setValue('amount', `${currentAmount.toFixed(2)} ${coin.symbol}`)
    resetField('sendWallet')

    setAmountInputType({
      ...amountInputType,
      symbol: coin.symbol,
      decimals: 2,
      convertCoins: getCoinAmountInUsd,
      reverseSymbol: 'usd'
    })
  }

  function isWalletAddressValid(publicKey: string, networkSymbol: string) {
    try {
      if (networkSymbol === 'sol') {
        const result = PublicKey.isOnCurve(publicKey)

        return result
      } else {
        const result = ethers.utils.isAddress(publicKey)

        return result
      }
    } catch (err) {
      return false
    }
  }

  const onSubmit: SubmitHandler<SendFieldValues> = async data => {
    if (!selectedCoin) return

    if (currentAmount <= 0) {
      setError('amount', { message: t.send.errors.invalidAmount })
      return
    }

    if (!isWalletAddressValid(data.sendWallet, selectedCoin.symbol)) {
      setError('sendWallet', { message: t.send.errors.invalidAddress })
      return
    }

    try {
      const formattedTo = formatWalletAddress(data.sendWallet)

      const amountData =
        amountInputType.symbol === 'usd'
          ? {
              usdAmount: currentAmount.toFixed(2),
              coinAmount: amounInReverseCoin,
              formattedCoinAmount: amounInReverseCoin.toFixed(3)
            }
          : {
              usdAmount: amounInReverseCoin.toFixed(2),
              coinAmount: currentAmount,
              formattedCoinAmount: currentAmount.toFixed(3)
            }

      setTransaction({
        ...amountData,
        to: data.sendWallet,
        formattedTo
      })

      if (customer2FA?.send2faEnabled) {
        setIs2FAVerifyOpen(true)
      }

      setIsSendOpen(true)
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return {
    t,
    customer,
    isSendOpen,
    setIsSendOpen,
    coinInUsdIsFetching,
    amounInReverseCoin,
    register,
    handleSubmit,
    onSubmit,
    errors,
    handleChangeAmountInput,
    handleToggleAmountInputType,
    coinsData,
    coinsIsLoading,
    handleChangeCoin,
    selectedCoin,
    amountInputType
  }
}
