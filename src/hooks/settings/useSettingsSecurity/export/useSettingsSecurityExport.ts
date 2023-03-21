import type { ChangeEvent } from 'react'

import type { SelectedChains, Screens } from './interfaces'

import { useState } from 'react'

import { useAuth } from '@contexts/AuthContext'

export function useSettingsSecurityExport() {
  const [selectedChains, setSelectedChains] = useState<SelectedChains[]>([
    { checked: false, networkType: 'solana' },
    { checked: false, networkType: 'evm' },
    { checked: false, networkType: 'bitcoin' }
  ])
  const [currentScreen, setCurrentScreen] = useState<Screens>('checkbox-screen')

  const { is2FAVerifyOpen, setIs2FAVerifyOpen } = useAuth()

  function handleUpdateAllCheckboxes(checked: boolean) {
    const updaterFunction = (currentSelectedChains: SelectedChains[]) => {
      return currentSelectedChains.map(({ networkType }) => {
        return { networkType, checked }
      })
    }

    setSelectedChains(updaterFunction)
  }

  function handleUpdateSingleCheckbox(event: ChangeEvent<HTMLInputElement>) {
    setSelectedChains(currentSelectedChains => {
      return currentSelectedChains.map(({ checked, networkType }) => {
        if (networkType === event.target.id) {
          return { checked: !checked, networkType }
        }

        return { networkType, checked }
      })
    })
  }

  return {
    currentScreen,
    setCurrentScreen,
    selectedChains,
    setSelectedChains,
    is2FAVerifyOpen,
    setIs2FAVerifyOpen,
    handleUpdateAllCheckboxes,
    handleUpdateSingleCheckbox
  }
}
