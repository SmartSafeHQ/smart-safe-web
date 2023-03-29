import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useI18n } from '@hooks/useI18n'
import { ACCEPTED_CURRENCIES, ACCEPTED_TOKENS } from '@utils/stableCoinsUtils'
import { useBuyStableCoin } from '@contexts/BuyStableCoinContext'

export const validationSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'min 0.1' })
    .min(0.1, { message: 'min 0.1' })
})

type BuyTokensFieldValues = z.infer<typeof validationSchema>

export const useSelectBuyCoin = () => {
  const { t } = useI18n()
  const { currency, token, setCurrency, setToken } = useBuyStableCoin()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<BuyTokensFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  function handleChangeCurrency(value: string) {
    setCurrency(prev => {
      const selectedCurrency = ACCEPTED_CURRENCIES[+value]

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
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return {
    t,
    register,
    handleSubmit,
    currency,
    token,
    isSubmitting,
    errors,
    onSubmit,
    handleChangeCurrency,
    handleChangeToken
  }
}
