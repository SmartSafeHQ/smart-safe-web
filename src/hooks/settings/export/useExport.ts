import type { ChangeEvent } from 'react'

import type { SelectedChains, Screens } from './interfaces'

import { useState } from 'react'

export function useExport() {
  const [selectedChains, setSelectedChains] = useState<SelectedChains[]>([
    { checked: false, networkType: 'solana' },
    { checked: false, networkType: 'evm' }
  ])
  const [currentScreen, setCurrentScreen] = useState<Screens>('checkbox-screen')

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
    handleUpdateAllCheckboxes,
    handleUpdateSingleCheckbox
  }
}
