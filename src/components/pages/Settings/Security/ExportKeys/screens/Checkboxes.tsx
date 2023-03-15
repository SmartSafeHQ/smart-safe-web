import type { Dispatch, SetStateAction, ChangeEvent } from 'react'

import type { SelectedChains, Screens } from '@hooks/export/interfaces'

import { Checkbox } from '../Checkbox'
import { Button } from '@components/Button'

import { useI18n } from '@hooks/useI18n'

type Props = {
  selectedChains: SelectedChains[]
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
  setSelectedChains: Dispatch<SetStateAction<SelectedChains[]>>
  handleUpdateSingleCheckbox: (_event: ChangeEvent<HTMLInputElement>) => void
}

export function Checkboxes({
  selectedChains,
  setCurrentScreen,
  handleUpdateSingleCheckbox
}: Props) {
  const { t } = useI18n()

  function handleExport() {
    if (!selectedChains.some(({ checked }) => checked)) {
      return
    }

    setCurrentScreen('private-keys-list-screen')
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-[400px]">
      <p className="text-center text-sm font-medium p-2 dark:text-yellow-300 rounded-lg border-1 border-yellow-300 bg-yellow-200/50">
        {t.settings.security.exportKeysScreens.checkboxes.warning}
      </p>

      <div className="flex flex-col gap-2 rounded-lg border-1 p-2 bg-slate-200/60 dark:bg-gray-500/20 dark:border-zinc-700/70">
        <Checkbox
          label="Solana"
          htmlFor="solana"
          onChange={handleUpdateSingleCheckbox}
          isChecked={
            selectedChains.find(({ networkType }) => networkType === 'solana')
              ?.checked || false
          }
        />

        <Checkbox
          label="EVM-based"
          htmlFor="evm"
          onChange={handleUpdateSingleCheckbox}
          isChecked={
            selectedChains.find(({ networkType }) => networkType === 'evm')
              ?.checked || false
          }
        />
      </div>

      <Button
        onClick={handleExport}
        disabled={!selectedChains.some(({ checked }) => checked)}
      >
        {t.settings.security.exportKeysScreens.checkboxes.export}
      </Button>
    </div>
  )
}
