import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { utils } from 'ethers'

import { useI18n } from '@hooks/useI18n'
import { BANKS } from '@hooks/buyAndSell/sell/useBankAccountSell'
import { useBurnStableCoin } from '@hooks/buyAndSell/mutations/useBurnStableCoin'
import { useConverCurrencies } from '@hooks/buyAndSell/queries/useConverCurrencies'
import { useSellStableCoin } from '@contexts/SellStableCoinContext'
import { useAuth } from '@contexts/AuthContext'

export const useSellCoinDataConfirm = () => {
  const { push } = useRouter()

  const { t } = useI18n()
  const { customer } = useAuth()
  const { withdrawAmount, bankAccount, selectedStableCoin } =
    useSellStableCoin()

  const { mutateAsync: burnStableCoin, isLoading } = useBurnStableCoin()

  const {
    data: currencyData,
    isLoading: currencyIsLoading,
    isFetching: currencyIsFetching,
    isPreviousData
  } = useConverCurrencies(selectedStableCoin.parityCurrencySymbol, 'brl')

  async function handleSell() {
    if (!customer) {
      return
    }

    try {
      const amountToWithdrawInWei = utils
        .parseEther(String(withdrawAmount))
        .toString()

      await burnStableCoin({
        userAddress: customer.wallets.evm.address,
        amount: amountToWithdrawInWei,
        contractAddress: selectedStableCoin.contractAddress
      })

      push('/dashboard/buy-and-sell/sell/withdraw')
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  const selectedBank = BANKS.find(
    ({ bankId }) => bankId === bankAccount?.bankId
  )

  return {
    t,
    withdrawAmount,
    selectedStableCoin,
    bankAccount,
    isLoading,
    currencyData,
    currencyIsLoading,
    currencyIsFetching,
    isPreviousData,
    handleSell,
    selectedBank
  }
}
