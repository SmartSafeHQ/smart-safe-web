import { Verify2FAModal } from '@components/pages/Layouts/Verify2FAModal'
import { Heading } from '@components/Heading'
import { PrivateKeysList } from './PrivateKeysList'
import { Checkboxes } from './Checkboxes'

import { useI18n } from '@hooks/useI18n'
import { useSettingsSecurityExport } from '@hooks/settings/useSettingsSecurity/export/useSettingsSecurityExport'

export function ExportKeys() {
  const { t } = useI18n()
  const {
    currentScreen,
    selectedChains,
    setCurrentScreen,
    setSelectedChains,
    handleUpdateSingleCheckbox
  } = useSettingsSecurityExport()

  return (
    <section className="w-full h-full p-6 flex flex-col justify-start items-stretch gap-4">
      <div className="flex flex-col gap-7 pt-8 h-full items-center">
        <Heading className="text-center text-3xl">
          {t.settings.security.exportKeysHeading}
        </Heading>

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

        <Verify2FAModal />
      </div>
    </section>
  )
}
