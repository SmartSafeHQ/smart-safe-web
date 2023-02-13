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
import { useSendMutation } from '@hooks/send/mutation/useSendMutation'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'
import { useCoinPortfolio } from '@hooks/global/coins/queries/useCoinPortfolio'
import { useCoinValueInUsd } from '@hooks/global/coins/queries/useCoinValueInUsd'

const validationSchema = z.object({
  sendWallet: z.string().min(1, { message: 'adrress required' }),
  amount: z.string().min(4, { message: 'min 0.0001' })
})

type SendFieldValues = z.infer<typeof validationSchema>

export interface CoinProps {
  symbol: string
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
  usdAmount: number
  coinAmount: number
  chainId: number
  rpcUrl: string
}

interface AmountInputType {
  symbol: 'usd' | string
  defaultValue: string
  availableDecimals: number
  convertCoins: (_amount: number, _usdPerCoin: number) => number
  currency?: string
  reverseSymbol?: string
}

export const DEFAULT_AMOUNT_INPUT_TYPE: AmountInputType = {
  symbol: 'usd',
  defaultValue: '$ 0.00 USD',
  availableDecimals: 4,
  convertCoins: getUsdAmountInCoinExchangeRate,
  currency: '$'
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

  const [transactionData, setTransactionData] =
    useState<TransactionProps | null>(null)
  const [amountInputType, setAmountInputType] = useState<AmountInputType>(
    DEFAULT_AMOUNT_INPUT_TYPE
  )

  const { customer } = useAuth()
  const { t } = useI18n()

  const { data: coinsData, isLoading: coinsIsLoading } = useCustomerCoins(
    customer?.wallet.address
  )

  const [selectedCoin, setSelectedCoin] = useState<CoinProps | null>(
    (coinsData && coinsData[0]) ?? null
  )

  const { data: portfolioData, isLoading: portfolioIsLoading } =
    useCoinPortfolio(selectedCoin ?? undefined, customer?.wallet.address)

  const { data: coinInUsdData, isFetching: coinInUsdIsFetching } =
    useCoinValueInUsd(selectedCoin?.symbol)

  useEffect(() => {
    if (!coinsData || selectedCoin) {
      return
    }

    setSelectedCoin(coinsData[0])
  }, [coinsData])

  useEffect(() => {
    if (!selectedCoin) {
      return
    }

    setAmountInputType({
      ...amountInputType,
      symbol: selectedCoin.symbol,
      availableDecimals: 2,
      convertCoins: getCoinAmountInUsd,
      reverseSymbol: 'usd'
    })

    setValue('amount', `${currentAmount.toFixed(2)} ${selectedCoin?.symbol}`)
  }, [selectedCoin])

  const { mutateAsync, isLoading: isSendingTx } = useSendMutation()

  const currentAmount = !watch().amount
    ? 0
    : formatCurrencyToNumber(watch().amount)

  const amounInReverseCoin = amountInputType.convertCoins(
    currentAmount,
    coinInUsdData?.valueInUsd ?? 0
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
        availableDecimals: 2,
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

  const onSubmit: SubmitHandler<SendFieldValues> = async data => {
    if (!customer || !selectedCoin) {
      toast.error(`Error. Invalid transaction infos`)

      return
    }

    try {
      const amounts =
        amountInputType.symbol === 'usd'
          ? { usdAmount: currentAmount, coinAmount: amounInReverseCoin }
          : { usdAmount: amounInReverseCoin, coinAmount: currentAmount }

      setTransactionData({
        to: data.sendWallet,
        fromWalletAddress: customer?.wallet.address,
        fromWalletPrivateKey: customer?.wallet.privateKey,
        fromName: customer?.name,
        usdAmount: amounts.usdAmount,
        coinAmount: amounts.coinAmount,
        chainId: selectedCoin.chainId,
        rpcUrl: selectedCoin.rpcUrl
      })
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  async function handleSendTransaction() {
    try {
      if (!transactionData || !selectedCoin) {
        toast.error(`Error. Invalid transaction infos`)

        return
      }

      const response = await mutateAsync({
        ...transactionData,
        amount: transactionData.coinAmount
      })

      const transactionUrl = `${selectedCoin.explorerUrl}/tx/${response.transactionHash}`

      console.log(transactionUrl)

      toast.success(`Transaction done successfully`)
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return {
    t,
    coinsData,
    coinsIsLoading,
    coinInUsdData,
    coinInUsdIsFetching,
    selectedCoin,
    setSelectedCoin,
    portfolioData,
    portfolioIsLoading,
    amounInReverseCoin,
    amountInputType,
    setAmountInputType,
    currentAmount,
    register,
    handleSubmit,
    errors,
    setValue,
    isSendingTx,
    handleToggleAmountInputType,
    handleChangeAmountInput,
    onSubmit,
    handleSendTransaction,
    transactionData
  }
}
