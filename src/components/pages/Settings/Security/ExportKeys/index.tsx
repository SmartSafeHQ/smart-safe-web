import { Heading } from '@components/Heading'
import { PrivateKeysList } from './screens/PrivateKeysList'
import { Checkboxes } from './screens/Checkboxes'

import { useI18n } from '@hooks/useI18n'
import { useExport } from '@hooks/settings/export/useExport'

export function ExportKeys() {
  const { t } = useI18n()
  const {
    currentScreen,
    selectedChains,
    setCurrentScreen,
    setSelectedChains,
    handleUpdateSingleCheckbox
  } = useExport()

  return (
    <div className="flex flex-col gap-4 pt-8 h-full items-center">
      <div className="flex flex-col gap-2">
        <Heading className="text-center text-xl">
          {t.settings.security.exportKeysHeading}
        </Heading>
      </div>

      {currentScreen === 'checkbox-screen' ? (
        <Checkboxes
          selectedChains={selectedChains}
          setCurrentScreen={setCurrentScreen}
          setSelectedChains={setSelectedChains}
          handleUpdateSingleCheckbox={handleUpdateSingleCheckbox}
        />
      ) : (
        <PrivateKeysList
          selectedChains={selectedChains}
          setCurrentScreen={setCurrentScreen}
        />
      )}
    </div>
  )
}
