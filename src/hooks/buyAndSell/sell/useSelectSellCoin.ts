import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { z } from 'zod'

import { useI18n } from '@hooks/useI18n'
import { STABLE_COINS } from '@utils/global/coins/stableCoinsConfig'
import { useConverCurrencies } from '@hooks/buyAndSell/queries/useConverCurrencies'
import { useGetBalance } from '@hooks/web3/useGetBalance'
import { useSellStableCoin } from '@contexts/SellStableCoinContext'
import { useAuth } from '@contexts/AuthContext'

export const validationSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'min 0.1' })
    .min(0.1, { message: 'min 0.1' })
})

type SellStableCoinFieldValues = z.infer<typeof validationSchema>

export const useSelectSellCoin = () => {
  const { push } = useRouter()

  const { t } = useI18n()
  const { customer } = useAuth()
  const {
    selectedStableCoin,
    setSelectedStableCoin,
    withdrawAmount,
    setWithdrawAmount
  } = useSellStableCoin()

  const {
    data: currencyData,
    isLoading: currencyIsLoading,
    isFetching: currencyIsFetching,
    isPreviousData
  } = useConverCurrencies(selectedStableCoin.parityCurrencySymbol, 'brl')

  const { data: customerBalance, isFetching: customerBalanceIsFetching } =
    useGetBalance({
      customerAddress: customer?.wallets.evm.address,
      networkRpcUrl: selectedStableCoin.rpcUrl,
      contractAddress: selectedStableCoin.contractAddress,
      contractName: selectedStableCoin.contractName
    })

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors }
  } = useForm<SellStableCoinFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const currentInputAmount = watch('amount', withdrawAmount)

  const currentAmount = currentInputAmount || 0

  function handleChangeStableCoin(value: string) {
    setSelectedStableCoin(STABLE_COINS[+value])
  }

  const onSubmit: SubmitHandler<SellStableCoinFieldValues> = async data => {
    if (!customerBalance) return

    if (data.amount > +customerBalance) {
      toast.error(t.sellStableCoin.insufficientFunds)
      return
    }

    try {
      setWithdrawAmount(data.amount)

      push('/dashboard/buy-and-sell/sell/bank-account')
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return {
    t,
    customer,
    register,
    handleSubmit,
    currentAmount,
    currencyData,
    customerBalance,
    currencyIsLoading,
    currencyIsFetching,
    isPreviousData,
    customerBalanceIsFetching,
    selectedStableCoin,
    handleChangeStableCoin,
    isSubmitting,
    errors,
    onSubmit,
    withdrawAmount
  }
}
