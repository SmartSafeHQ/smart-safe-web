import { useState } from 'react'
import { Copy } from 'phosphor-react'

import { Button } from '@/components/Button'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'

import { handleCopyToClipboard } from '@utils/global'

import type { Dispatch, SetStateAction } from 'react'
import type { SelectedChains, Screens } from '@/hooks/export/interfaces'

type PrivateKeyProps = {
  network: string
  privateKey: string
}

type PrivateKeysListProps = {
  selectedChains: SelectedChains[]
  setCurrentScreen: Dispatch<SetStateAction<Screens>>
}

function PrivateKey({ network, privateKey }: PrivateKeyProps) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  const { t } = useI18n()

  function handleCopy() {
    handleCopyToClipboard(privateKey)
    setCopiedToClipboard(true)

    setTimeout(() => setCopiedToClipboard(false), 1500)
  }

  return (
    <div className="w-full">
      <p className="font-bold">{network}</p>

      <div
        className="
          font-medium
          rounded-lg
          border-1
          dark:border-zinc-700/70
          border-slate-300
          overflow-hidden
          relative
        "
      >
        <p className="break-words p-2 dark:bg-gray-500/20 bg-slate-200">
          {privateKey}
        </p>

        <div className="border-t-2 dark:border-zinc-700 border-slate-300 w-full absolute left-0"></div>

        <div
          onClick={handleCopy}
          className="
            flex
            gap-1
            w-full
            justify-center
            items-center
            p-2
            transition-colors
            bg-slate-200
            dark:bg-gray-500/20
            h-full
            hover:bg-slate-300
            cursor-pointer
          "
        >
          <Copy size={22} />

          <p className="font-bold text-center">
            {copiedToClipboard
              ? t.settings.security.exportKeys.screens.privateKeysList.copied
              : t.settings.security.exportKeys.screens.privateKeysList.copy}
          </p>
        </div>
      </div>
    </div>
  )
}

export function PrivateKeysList({
  selectedChains,
  setCurrentScreen
}: PrivateKeysListProps) {
  const { t } = useI18n()
  const { customer } = useAuth()

  return (
    <div className="flex flex-col gap-2 max-w-[400px] w-full">
      <p className="text-center text-sm font-bold p-2 rounded-lg border-1 border-red-500/30 text-red-500 bg-red-400/[.15]">
        {t.settings.security.exportKeys.screens.privateKeysList.warning}
      </p>

      {selectedChains.find(
        chain => chain.networkType === 'evm' && chain.checked
      ) && (
        <PrivateKey
          network="EVM"
          privateKey={customer?.wallets.evm.privateKey || ''}
        />
      )}

      {selectedChains.find(
        chain => chain.networkType === 'solana' && chain.checked
      ) && (
        <PrivateKey
          network="Solana"
          privateKey={customer?.wallets.solana.privateKey || ''}
        />
      )}

      <Button onClick={() => setCurrentScreen('checkbox-screen')}>
        {t.settings.security.exportKeys.screens.privateKeysList.back}
      </Button>
    </div>
  )
}
