import { Button } from '@/components/Button'
import { EvmBasedWallets } from '../EvmBasedWallets'
import { SolanaWallet } from '../SolanaWallet'

import { useI18n } from '@/hooks/useI18n'

import type { TokensStatus, Screens } from '@/hooks/export/interfaces'
import type { Dispatch, SetStateAction, ChangeEvent } from 'react'

type Props = {
  tokensStatus: TokensStatus[] | undefined
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
  setTokensStatus: Dispatch<SetStateAction<TokensStatus[] | undefined>>
  handleUpdateSingleCheckbox: (_event: ChangeEvent<HTMLInputElement>) => void
}

export function Checkboxes({
  tokensStatus,
  setTokensStatus,
  setCurrentScreen,
  handleUpdateSingleCheckbox
}: Props) {
  const { t } = useI18n()

  function handleExport() {
    if (!tokensStatus?.some(({ checked }) => checked)) {
      return
    }

    setCurrentScreen('private-keys-list-screen')
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-[400px]">
      <p className="text-center text-sm font-medium p-2 dark:text-yellow-800 rounded-lg border-1 border-yellow-300 bg-yellow-100">
        {t.exportPrivateKeys.screens.checkboxes.warning}
      </p>

      <div className="flex flex-col gap-2">
        <SolanaWallet
          tokensStatus={tokensStatus}
          handleUpdateSingleCheckbox={handleUpdateSingleCheckbox}
        />

        <EvmBasedWallets
          tokensStatus={tokensStatus}
          setTokensStatus={setTokensStatus}
          handleUpdateSingleCheckbox={handleUpdateSingleCheckbox}
        />
      </div>

      <Button
        onClick={handleExport}
        disabled={!tokensStatus?.some(({ checked }) => checked)}
      >
        {t.exportPrivateKeys.screens.checkboxes.export}
      </Button>
    </div>
  )
}
