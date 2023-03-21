import type { Screens, ChainProps, ChainPrivateKeysProps } from './interfaces'

import { useState } from 'react'

import { useAuth } from '@contexts/AuthContext'

export const CHAINS_TO_EXPORT_LIST: ChainProps[] = [
  {
    id: 'evm',
    name: 'EVM-based',
    iconPath: '/networks/eth-logo.svg'
  },
  {
    id: 'solana',
    name: 'solana',
    iconPath: '/networks/solana-logo.svg'
  }
]

export function useSettingsSecurityExport() {
  const [selectedChains, setSelectedChains] = useState<ChainProps[]>([])
  const [chainsPrivateKeys, setChainsPrivateKeys] = useState<
    ChainPrivateKeysProps[]
  >([])
  const [currentScreen, setCurrentScreen] = useState<Screens>('select-chain')

  const { customer, is2FAVerifyOpen, setIs2FAVerifyOpen } = useAuth()

  const isExportDisabled = selectedChains.length === 0

  function handleAddChain(chainIndex: number) {
    const selectedChain = CHAINS_TO_EXPORT_LIST[chainIndex]

    setSelectedChains(prevChains => [...prevChains, selectedChain])
  }

  function handleRemoveChain(chainId: string) {
    setSelectedChains(prevChains => {
      const updattedChains = prevChains.filter(chain => chain.id !== chainId)

      return updattedChains
    })
  }

  function handleBackToChainSelect() {
    setCurrentScreen('select-chain')
    setSelectedChains([])
  }

  function handleExport() {
    if (!customer) return

    const chainsWithPrivateKeys = selectedChains.map(chain => {
      const chainWithPrivateKey = {
        ...chain,
        privateKey: customer.wallets[chain.id].privateKey
      }

      return chainWithPrivateKey
    })

    setChainsPrivateKeys(chainsWithPrivateKeys)
    setCurrentScreen('private-keys-list')
  }

  return {
    currentScreen,
    isExportDisabled,
    selectedChains,
    chainsPrivateKeys,
    is2FAVerifyOpen,
    setIs2FAVerifyOpen,
    handleAddChain,
    handleRemoveChain,
    handleBackToChainSelect,
    handleExport
  }
}
