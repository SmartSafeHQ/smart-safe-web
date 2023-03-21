import { Verify2FAModal } from '@components/pages/Layouts/Verify2FAModal'
import { PrivateKeysList } from './PrivateKeysList'
import { SelectNetworksToExport } from './SelectNetworksToExport'
import { SettingsTab } from '@components/pages/Settings'

import { useI18n } from '@hooks/useI18n'
import {
  useSettingsSecurityExport,
  CHAINS_TO_EXPORT_LIST
} from '@hooks/settings/useSettingsSecurity/export/useSettingsSecurityExport'

export function ExportKeys() {
  const { t } = useI18n()
  const {
    currentScreen,
    isExportDisabled,
    chainsPrivateKeys,
    handleAddChain,
    handleRemoveChain,
    handleBackToChainSelect,
    handleExport
  } = useSettingsSecurityExport()

  return (
    <SettingsTab.Root>
      <SettingsTab.Header>
        <SettingsTab.Title>
          {t.settings.security.exportKeysHeading}
        </SettingsTab.Title>

        <SettingsTab.Description className="flex items-center gap-2 !text-red-500">
          {t.settings.security.exportKeys.warning}
        </SettingsTab.Description>
      </SettingsTab.Header>

      <div className="w-full flex flex-col pt-3 relative justify-start items-stretch gap-4">
        {currentScreen === 'select-chain' ? (
          <SelectNetworksToExport
            chainsToExport={CHAINS_TO_EXPORT_LIST}
            handleAddChain={handleAddChain}
            handleRemoveChain={handleRemoveChain}
            handleExport={handleExport}
            isExportDisabled={isExportDisabled}
          />
        ) : (
          <PrivateKeysList
            chainsWithPrivateKeys={chainsPrivateKeys}
            handleBackToChainSelect={handleBackToChainSelect}
          />
        )}
      </div>

      <Verify2FAModal />
    </SettingsTab.Root>
  )
}
