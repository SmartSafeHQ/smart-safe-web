import { Heading } from '@components/Heading'
import { PrivateKeysList } from '@components/pages/Export/screens/PrivateKeysList'
import { Checkboxes } from '@components/pages/Export/screens/Checkboxes'

import { useI18n } from '@hooks/useI18n'
import { useExport } from '@hooks/export/useExport'

export default function Export() {
  const { t } = useI18n()
  const {
    tokensStatus,
    currentScreen,
    setTokensStatus,
    setCurrentScreen,
    handleUpdateSingleCheckbox
  } = useExport()

  return (
    <div className="flex flex-col gap-4 pt-8 h-full items-center">
      <div className="flex flex-col gap-2">
        <Heading className="text-center text-xl">
          {t.exportPrivateKeys.heading}
        </Heading>
      </div>

      {currentScreen === 'checkbox-screen' ? (
        <Checkboxes
          tokensStatus={tokensStatus}
          setTokensStatus={setTokensStatus}
          setCurrentScreen={setCurrentScreen}
          handleUpdateSingleCheckbox={handleUpdateSingleCheckbox}
        />
      ) : (
        <PrivateKeysList
          tokensStatus={tokensStatus}
          setCurrentScreen={setCurrentScreen}
        />
      )}
    </div>
  )
}
