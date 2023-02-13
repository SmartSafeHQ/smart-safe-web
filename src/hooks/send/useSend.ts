import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { useFeeData } from 'wagmi'

import { formatCurrencyToNumber } from '@utils/global'
import { useAuth } from '@contexts/AuthContext'
import { useI18n } from '@hooks/useI18n'
import { useSendMutation } from '@hooks/send/mutation/useSendMutation'
import { useEndUserUsedTokens } from '@hooks/send/queries/useEndUserUsedTokens'
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
  name: 'usd' | string
  defaultValue: string
  availableDecimals: number
  symbol?: string
  reverseValueName?: string
}

export const DEFAULT_AMOUNT_INPUT_TYPE = {
  name: 'usd',
  defaultValue: '$ 0.00 USD',
  availableDecimals: 2,
  symbol: '$'
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
  const [amountInputType, setAmountInputType] = useState<AmountInputType>(
    DEFAULT_AMOUNT_INPUT_TYPE
  )

  const [transactionData, setTransactionData] =
    useState<TransactionProps | null>(null)

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
      name: selectedCoin.symbol,
      availableDecimals: 4,
      symbol: undefined,
      reverseValueName: 'usd'
    })

    setValue('amount', `${currentAmount.toFixed(2)} ${selectedCoin?.symbol}`)
  }, [selectedCoin])

  const { data } = useEndUserUsedTokens(
    true,
    Number(feeData?.formatted.gasPrice)
  )
  const { mutateAsync, isLoading: isSendingTx } = useSendMutation()

  const selectedCoinValue = data?.find(coin => coin.id === selectedCoin?.symbol)

  const coinUsdValue = Number(selectedCoinValue?.price)
  const feeUsdValue = Number(selectedCoinValue?.feeUsdPrice)

  const currentAmount = !watch().amount
    ? 0
    : formatCurrencyToNumber(watch().amount)

  const selectedCoiInAmount = currentAmount / (coinInUsdData?.valueInUsd ?? 0)
  const usdAmount = currentAmount * (coinInUsdData?.valueInUsd ?? 0)

  const amountInUsd = currentAmount * (coinInUsdData?.valueInUsd ?? 0)

  const currentDollarFee = feeUsdValue * currentAmount
  const currentMaticFee = currentDollarFee / coinUsdValue

  function handleChangeAmountInput(event: ChangeEvent<HTMLInputElement>) {
    const floatAmount = formatCurrencyToNumber(event.target.value)

    const formattedAmount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(floatAmount)

    setValue(
      'amount',
      `${amountInputType?.symbol ?? ''}${formattedAmount} ${
        amountInputType.name
      }`
    )
  }

  function handleToggleAmountInputType(event: MouseEvent) {
    event.preventDefault()

    if (amountInputType.name === 'usd') {
      setAmountInputType({
        name: selectedCoin?.symbol ?? 'usd',
        defaultValue: `0.00 ${selectedCoin?.symbol}`,
        availableDecimals: 4,
        reverseValueName: 'usd'
      })

      setValue('amount', `${currentAmount.toFixed(2)} ${selectedCoin?.symbol}`)
    } else {
      setAmountInputType({
        ...DEFAULT_AMOUNT_INPUT_TYPE,
        reverseValueName: selectedCoin?.symbol
      })

      setValue('amount', `$${currentAmount.toFixed(2)} usd`)
    }
  }

  const onSubmit: SubmitHandler<SendFieldValues> = async data => {
    if (!customer) {
      toast.error(`Error. Invalid user`)

      return
    }

    if (!selectedCoin) {
      toast.error(`Error. Invalid coin`)

      return
    }

    try {
      setTransactionData({
        to: data.sendWallet,
        fromWalletAddress: customer?.wallet.address,
        fromWalletPrivateKey: customer?.wallet.privateKey,
        fromName: customer?.name,
        usdAmount,
        coinAmount: selectedCoiInAmount,
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

      if (!selectedCoin) {
        toast.error(`Error. Invalid coin`)

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
    t,
    coinsData,
    coinsIsLoading,
    coinInUsdData,
    coinInUsdIsFetching,
    selectedCoin,
    setSelectedCoin,
    portfolioData,
    portfolioIsLoading,
    amountInUsd,
    amountInputType,
    setAmountInputType,
    currentAmount,
    register,
    handleSubmit,
    errors,
    setValue,
    isSendingTx,
    transactionUrl,
    setTransactionUrl,
    handleToggleAmountInputType,
    handleChangeAmountInput,
    onSubmit,
    handleSendTransaction,
    isSendModalOpen,
    setIsSendModalOpen,
    transactionData,
    currentMaticFee,
    currentDollarFee
  }
}
