import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { z } from 'zod'

import {
  getUsdAmountInCoinExchangeRate,
  getCoinAmountInUsd
} from '@utils/global/coins'
import { formatCurrencyToNumber } from '@utils/global'
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

export const validationSchema = z.object({
  sendWallet: z.string().min(1, { message: 'adrress required' }),
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
  const { customer } = useAuth()
  const { t } = useI18n()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm<SendFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const currentAmount = !watch().amount
    ? 0
    : formatCurrencyToNumber(watch().amount)

  const [transaction, setTransaction] = useState<TransactionProps | null>()

  const { data: coinsData, isLoading: coinsIsLoading } = useCustomerCoins(
    customer?.wallet.address
  )

  const [selectedCoin, setSelectedCoin] = useState<CoinProps | null>(
    (coinsData && coinsData[0]) ?? null
  )

  const [amountInputType, setAmountInputType] = useState<AmountInputType>(
    DEFAULT_AMOUNT_INPUT_TYPE
  )

  const { data: portfolioData, isLoading: portfolioIsLoading } =
    useCoinPortfolio(selectedCoin ?? undefined, customer?.wallet.address)

  const { data: coinInUsdData, isFetching: coinInUsdIsFetching } =
    useCoinValueInUsd(selectedCoin?.symbol)

  const {
    mutateAsync,
    isLoading: isSendingTx,
    data: txData,
    reset
  } = useSendMutation()

  useEffect(() => {
    if (!coinsData || selectedCoin) {
      return
    }

    setSelectedCoin(coinsData[0])

    setAmountInputType({
      ...DEFAULT_AMOUNT_INPUT_TYPE,
      reverseSymbol: coinsData[0]?.symbol
    })
  }, [coinsData])

  const amounInReverseCoin = amountInputType.convertCoins(
    currentAmount,
    coinInUsdData?.valueInUsd ?? 1
  )

  function handleChangeAmountInput(event: ChangeEvent<HTMLInputElement>) {
    const floatAmount = formatCurrencyToNumber(event.target.value)

    const formattedAmount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(floatAmount)

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

    const coin = coinsData[Number(coinIndex)]

    setSelectedCoin(coin)
    setValue('amount', `${currentAmount.toFixed(2)} ${coin.symbol}`)

    setAmountInputType({
      ...amountInputType,
      symbol: coin.symbol,
      decimals: 2,
      convertCoins: getCoinAmountInUsd,
      reverseSymbol: 'usd'
    })
  }

  const onSubmit: SubmitHandler<SendFieldValues> = async data => {
    if (currentAmount <= 0) return

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
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  async function handleSendTransaction({
    chainId,
    rpcUrl,
    amount,
    to
  }: HandleSendTransactionProps) {
    if (!customer) return

    try {
      await mutateAsync({
        chainId,
        rpcUrl,
        fromWalletPrivateKey: customer.wallet.privateKey,
        to,
        amount
      })

      toast.success(`Transaction done successfully`)
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
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
