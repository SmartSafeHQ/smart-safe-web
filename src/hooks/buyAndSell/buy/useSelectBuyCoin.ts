import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { z } from 'zod'

import { useI18n } from '@hooks/useI18n'
import { ACCEPTED_CURRENCIES, ACCEPTED_TOKENS } from '@utils/stableCoinsUtils'
import { useBuyStableCoin } from '@contexts/BuyStableCoinContext'
import { useConverCurrencies } from '@/hooks/buyAndSell/queries/useConverCurrencies'

export const validationSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'min 0.1' })
    .min(0.1, { message: 'min 0.1' })
})

type BuyTokensFieldValues = z.infer<typeof validationSchema>

export const useSelectBuyCoin = () => {
  const { push } = useRouter()

  const { t } = useI18n()
  const { currency, token, setCurrency, setToken } = useBuyStableCoin()

  const {
    data: currencyData,
    isLoading: currencyIsLoading,
    isFetching: currencyIsFetching,
    isPreviousData
  } = useConverCurrencies(token.parityCurrencySymbol, currency.symbol)

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors }
  } = useForm<BuyTokensFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const currentInputAmount = watch('amount', currency.amount)

  const currentAmount = currentInputAmount || 0

  function handleChangeCurrency(value: string) {
    setCurrency(prev => {
      const selectedCurrency =
        ACCEPTED_CURRENCIES.find(c => c.symbol === value) ?? prev

      return {
        amount: prev.amount,
        currency: selectedCurrency.currency,
        symbol: selectedCurrency.symbol
      }
    })
  }

  function handleChangeToken(value: string) {
    setToken(ACCEPTED_TOKENS[+value])
  }

  const onSubmit: SubmitHandler<BuyTokensFieldValues> = async data => {
    try {
      setCurrency(prev => ({
        ...prev,
        amount: data.amount
      }))

      push('/dashboard/buy-and-sell/buy/select-method')
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return {
    t,
    register,
    handleSubmit,
    currencyData,
    currencyIsLoading,
    currencyIsFetching,
    isPreviousData,
    currentAmount,
    currency,
    token,
    isSubmitting,
    errors,
    onSubmit,
    handleChangeCurrency,
    handleChangeToken
  }
}
