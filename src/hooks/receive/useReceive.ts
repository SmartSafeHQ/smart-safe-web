import { useState, useMemo, useEffect } from 'react'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'

export const useReceive = () => {
  const [selectedWallet, setSelectedWallet] = useState({
    wallet: '',
    formattedWallet: ''
  })

  const { t } = useI18n()
  const { customer } = useAuth()
  const { data: coinsData, isLoading: coinsIsLoading } = useCustomerCoins(
    customer?.wallets.evm.address
  )

  const wallets = useMemo(() => {
    if (
      coinsData &&
      customer?.wallets.solana.address &&
      customer?.wallets.evm.address
    ) {
      return coinsData.coins.map(({ avatar, network }) => {
        const wallet =
          network === 'solana' ? customer.wallets.solana : customer.wallets.evm

        return {
          icon: avatar,
          network,
          formattedWallet: wallet.formattedAddress,
          wallet: wallet.address
        }
      })
    }

    return [{ network: '', icon: '', wallet: '', formattedWallet: '' }]
  }, [
    coinsData,
    customer?.wallets.evm.address,
    customer?.wallets.solana.address
  ])

  function handleSelectWalletAccount(index: string) {
    const userWallet = wallets[Number(index)]

    setSelectedWallet({
      wallet: userWallet.wallet,
      formattedWallet: userWallet.formattedWallet
    })
  }

  async function handleShareQrCode() {
    await navigator.share({
      text: selectedWallet.wallet,
      title: t.receive.shareWallet
    })
  }

  useEffect(() => {
    if (wallets) {
      const firstWallet = wallets[0]

      setSelectedWallet({
        formattedWallet: firstWallet.formattedWallet,
        wallet: firstWallet.wallet
      })
    }
  }, [wallets])

  return {
    wallets,
    handleShareQrCode,
    coinsData,
    coinsIsLoading,
    handleSelectWalletAccount,
    selectedWallet
  }
}
