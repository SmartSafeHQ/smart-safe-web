import type { Dispatch, SetStateAction, ChangeEvent } from 'react'

import type {
  SelectedChains,
  Screens
} from '@hooks/settings/useSettingsSecurity/export/interfaces'

import { WarningCircle } from 'phosphor-react'

import { Checkbox } from '../Checkbox'
import { Button } from '@components/Button'
import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'

type CheckboxesProps = {
  selectedChains: SelectedChains[]
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
  setSelectedChains: Dispatch<SetStateAction<SelectedChains[]>>
  handleUpdateSingleCheckbox: (_event: ChangeEvent<HTMLInputElement>) => void
}

export function Checkboxes({
  selectedChains,
  setCurrentScreen,
  handleUpdateSingleCheckbox
}: CheckboxesProps) {
  const { t } = useI18n()

  function handleExport() {
    if (!selectedChains.some(({ checked }) => checked)) {
      return
    }

    setCurrentScreen('private-keys-list-screen')
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <div className="w-full flex items-start justify-start gap-2 text-gray-800 dark:text-gray-50">
        <WarningCircle className="w-12 h-8 text-red-500" />

        <Text className="text-sm">
          {t.settings.security.exportKeys.checkboxes.warning}
        </Text>
      </div>

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

        <Checkbox
          label="Bitcoin"
          htmlFor="bitcoin"
          onChange={handleUpdateSingleCheckbox}
          isChecked={
            selectedChains.find(({ networkType }) => networkType === 'bitcoin')
              ?.checked || false
          }
        />
      </div>

      <Button
        onClick={handleExport}
        disabled={!selectedChains.some(({ checked }) => checked)}
      >
        {t.settings.security.exportKeys.checkboxes.export}
      </Button>
    </div>
  )
}
