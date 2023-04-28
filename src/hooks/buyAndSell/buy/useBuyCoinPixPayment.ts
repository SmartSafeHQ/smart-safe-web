import { useRouter } from 'next/router'
import { utils } from 'ethers'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@/contexts/AuthContext'
import { useBuyStableCoin } from '@contexts/BuyStableCoinContext'
import { useMintStableCoin } from '@/hooks/buyAndSell/mutations/useMintStableCoin'
import { useConverCurrencies } from '@/hooks/buyAndSell/queries/useConverCurrencies'

export const useBuyCoinPixPayment = () => {
  const { push } = useRouter()

  const { customer } = useAuth()
  const { currency, token } = useBuyStableCoin()
  const { mutateAsync } = useMintStableCoin()
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

  async function handleValidatePayment() {
    const transactionHash = await mutateAsync({
      amount: utils.parseEther(String(amountInTokens)).toString(),
      contractAddress: token.contractAddress,
      userAddress: customer?.wallets.evm.address || ''
    })

    push({
      pathname: `/dashboard/buy-and-sell/buy/${transactionHash}/purchase-proof`,
      query: {
        date: new Date().toISOString(),
        stableCoinSymbol: token.symbol,
        amount: utils.parseEther(String(amountInTokens)).toString()
      }
    })
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
