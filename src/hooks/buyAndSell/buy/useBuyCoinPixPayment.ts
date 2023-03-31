import { useI18n } from '@hooks/useI18n'
import { useBuyStableCoin } from '@contexts/BuyStableCoinContext'
import { useConverCurrencies } from '@/hooks/buyAndSell/queries/useConverCurrencies'

export const useBuyCoinPixPayment = () => {
  const { currency, token } = useBuyStableCoin()
  const { t } = useI18n()
  const { data: selectCurrencyData, isRefetching: selectCurrencyIsRefetching } =
    useConverCurrencies(token.parityCurrencySymbol, currency.symbol)
  const {
    data: brlCurrencyData,
    isLoading: brlCurrencyIsLoading,
    isRefetching: brlCurrencyIsRefetching
  } = useConverCurrencies(token.parityCurrencySymbol, 'BRL')

  const amountInTokens = currency.amount / (selectCurrencyData?.value ?? 0)
  const amountInBRL = amountInTokens * (brlCurrencyData?.value ?? 0)

  function handleValidatePayment() {
    console.log('Pay')
  }

  return {
    t,
    token,
    amountInTokens,
    amountInBRL,
    selectCurrencyIsRefetching,
    brlCurrencyIsLoading,
    brlCurrencyIsRefetching,
    handleValidatePayment
  }
}
