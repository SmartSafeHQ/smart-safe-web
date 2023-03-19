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
import { formatCurrencyToNumber, getEthersErrorCode } from '@utils/global'
import { useAuth } from '@contexts/AuthContext'
import { useI18n } from '@hooks/useI18n'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'
import { useCoinPortfolio } from '@hooks/global/coins/queries/useCoinPortfolio'
import { useCoinValueInUsd } from '@hooks/global/coins/queries/useCoinValueInUsd'
import { useSendMutation } from '@hooks/send/mutation/useSendMutation'
import {
  AmountInputType,
  CoinProps,
  HandleSendTransactionProps,
  TransactionProps
} from '@hooks/send/interfaces'
import { queryClient } from '@lib/reactQuery'
import {
  fetchAccount2faSettings,
  FetchAccount2faSettingsResponse
} from '@hooks/accounts/queries/useAccount2faSettings'

export const validationSchema = z.object({
  sendWallet: z.string().min(1, { message: 'Invalid wallet address.' }),
  amount: z.string().min(4, { message: 'min 0.0001' })
})

type SendFieldValues = z.infer<typeof validationSchema>

export const DEFAULT_AMOUNT_INPUT_TYPE: AmountInputType = {
  symbol: 'usd',
  defaultValue: '$0.00 USD',
  decimals: 4,
  convertCoins: getUsdAmountInCoinExchangeRate,
  currency: '$'
}

export const useSend = () => {
  const {
    customer,
    setCustomer2FA,
    customer2FA,
    is2FAVerifyOpen,
    setIs2FAVerifyOpen
  } = useAuth()
  const { t } = useI18n()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    setError,
    resetField,
    formState: { errors }
  } = useForm<SendFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const currentAmount = !watch().amount
    ? 0
    : formatCurrencyToNumber(watch().amount)

  const [transaction, setTransaction] = useState<TransactionProps | null>()

  const { data: coinsData, isLoading: coinsIsLoading } = useCustomerCoins(
    customer?.wallets.evm.address
  )

  const [selectedCoin, setSelectedCoin] = useState<CoinProps | null>(
    (coinsData && coinsData.coins[0]) ?? null
  )

  const [amountInputType, setAmountInputType] = useState<AmountInputType>(
    DEFAULT_AMOUNT_INPUT_TYPE
  )

  const { data: portfolioData, isLoading: portfolioIsLoading } =
    useCoinPortfolio(selectedCoin ?? undefined, customer?.wallets)

  const { data: coinInUsdData, isFetching: coinInUsdIsFetching } =
    useCoinValueInUsd(selectedCoin?.symbol)

  const {
    mutateAsync,
    isLoading: isSendingTx,
    data: txData,
    reset
  } = useSendMutation()

  useEffect(() => {
    if (!customer) return

    queryClient
      .ensureQueryData<FetchAccount2faSettingsResponse>({
        queryKey: ['account2faSettings', customer.id],
        queryFn: () => fetchAccount2faSettings({ id: customer.id })
      })
      .then(response => {
        const fields = {
          sendEnabled: response.send2faEnabled === true ?? false,
          exportKeysEnabled: response.exportKeys2faEnabled === true ?? false
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

  function isWalletAddressValid(publicKey: string) {
    try {
      if (selectedCoin?.symbol === 'sol') {
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
    if (currentAmount <= 0) {
      setError('amount', { message: t.send.errors.invalidAmountToSend })
      return
    }

    if (!isWalletAddressValid(data.sendWallet)) {
      setError('sendWallet', { message: t.send.errors.invalidWalletAddress })
      return
    }

    try {
      if (amountInputType.symbol === 'usd') {
        setTransaction({
          usdAmount: currentAmount,
          coinAmount: amounInReverseCoin,
          to: data.sendWallet
        })
      } else {
        setTransaction({
          usdAmount: amounInReverseCoin,
          coinAmount: currentAmount,
          to: data.sendWallet
        })
      }

      if (customer2FA?.sendEnabled) {
        setIs2FAVerifyOpen(true)
      }
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  async function handleSendTransaction({
    chainId,
    rpcUrl,
    symbol,
    amount,
    to
  }: HandleSendTransactionProps) {
    if (!customer) return

    try {
      await mutateAsync({
        chainId,
        rpcUrl,
        symbol,
        fromWalletPrivateKey:
          symbol === 'sol'
            ? customer.wallets.solana.privateKey
            : customer.wallets.evm.privateKey,
        to,
        amount
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

  return {
    t,
    coinsData,
    coinsIsLoading,
    coinInUsdIsFetching,
    handleChangeCoin,
    portfolioData,
    portfolioIsLoading,
    amounInReverseCoin,
    amountInputType,
    handleSubmit,
    is2FAVerifyOpen,
    setIs2FAVerifyOpen,
    isSendingTx,
    txData,
    reset,
    onSubmit,
    register,
    errors,
    handleChangeAmountInput,
    handleToggleAmountInputType,
    handleSendTransaction,
    selectedCoin,
    transaction,
    customer,
    getValues
  }
}
