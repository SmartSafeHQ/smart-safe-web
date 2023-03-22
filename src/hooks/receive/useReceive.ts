import { useState, useMemo, useEffect } from 'react'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { useCustomerCoins } from '@hooks/global/coins/queries/useCustomerCoins'
import { formatWalletAddress } from '@utils/web3Utils'

export const useReceive = () => {
  const [selectedWallet, setSelectedWallet] = useState({
    wallet: '',
    formattedWallet: ''
  })

  const { t } = useI18n()
  const { customer } = useAuth()
  const { data: coinsData, isLoading: coinsIsLoading } = useCustomerCoins()

  const wallets = useMemo(() => {
    if (
      coinsData &&
      customer?.wallets.solana.address &&
      customer?.wallets.evm.address
    ) {
      return coinsData.coins.map(({ avatar, networkName, networkType }) => {
        if (networkType === 'solana') {
          const wallet = customer.wallets.solana.address
          return {
            icon: avatar,
            network: networkName,
            formattedWallet: formatWalletAddress({
              network: networkType,
              walletAddress: wallet
            }),
            wallet
          }
        }

        if (networkType === 'bitcoin') {
          const wallet = customer.wallets.bitcoin.address

          return {
            icon: avatar,
            network: networkName,
            formattedWallet: formatWalletAddress({
              network: networkType,
              walletAddress: wallet
            }),
            wallet
          }
        }

        const wallet = customer?.wallets.evm.address
        return {
          icon: avatar,
          network: networkName,
          formattedWallet: formatWalletAddress({
            network: networkType,
            walletAddress: wallet
          }),
          wallet
        }
      })
    }

    return [{ network: '', icon: '', wallet: '', formattedWallet: '' }]
  }, [
    coinsData,
    customer?.wallets.evm.address,
    customer?.wallets.solana.address,
    customer?.wallets.bitcoin.address
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
