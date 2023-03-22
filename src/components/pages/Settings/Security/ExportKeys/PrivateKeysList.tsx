import type { ChainPrivateKeysProps } from '@hooks/settings/useSettingsSecurity/export/interfaces'

import { useState } from 'react'
import Image from 'next/image'
import { CaretLeft, Copy } from 'phosphor-react'

import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'

import { handleCopyToClipboard } from '@utils/global'

interface PrivateKeysListProps {
  chainsWithPrivateKeys: ChainPrivateKeysProps[]
  handleBackToChainSelect: () => void
}

export function PrivateKeysList({
  chainsWithPrivateKeys,
  handleBackToChainSelect
}: PrivateKeysListProps) {
  const { t } = useI18n()

  return (
    <div className="flex flex-col gap-4 w-full">
      <button
        onClick={handleBackToChainSelect}
        className="w-min flex items-center gap-2 capitalize font-medium transition-colors text-brand-foregroundAccent1 hover:text-brand-foregroundAccent2"
      >
        <CaretLeft className="w-4 h-4" weight="bold" />

        <Text>{t.settings.security.exportKeys.back}</Text>
      </button>

      <div className="w-full max-w-full flex flex-col items-start gap-6 sm:flex-row sm:gap-4">
        {chainsWithPrivateKeys.map(chain => (
          <PrivateKey
            key={chain.name}
            chainName={chain.name}
            iconPath={chain.iconPath}
            privateKey={chain.privateKey}
          />
        ))}
      </div>
    </div>
  )
}

interface PrivateKeyProps {
  chainName: string
  iconPath: string
  privateKey: string
}

function PrivateKey({ chainName, iconPath, privateKey }: PrivateKeyProps) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  const { t } = useI18n()

  function handleCopy() {
    handleCopyToClipboard(privateKey)
    setCopiedToClipboard(true)

    setTimeout(() => setCopiedToClipboard(false), 1500)
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Image
          src={iconPath}
          alt={`${chainName} icon`}
          className="w-full max-w-[2rem] bg-cover rounded-full"
          width={32}
          height={32}
          quality={100}
        />

        <Text
          asChild
          className="capitalize text-xl font-semibold text-gray-800 dark:text-gray-200"
        >
          <p>{chainName}</p>
        </Text>
      </div>

      <div className="flex flex-col justify-center h-full font-medium rounded-md border-2 border-gray-200 dark:border-gray-800 relative">
        <Text
          asChild
          className="w-full flex-1 min-h-[8rem] flex p-4 break-all bg-gray-200 dark:bg-gray-800"
        >
          <p>{privateKey}</p>
        </Text>

        <div
          onClick={handleCopy}
          className="w-full flex gap-1 justify-center cursor-pointer text-brand-foregroundAccent1 bg-gray-300 dark:bg-gray-900 items-center p-2 transition-colors hover:bg-gray-300"
        >
          <Copy className="w-6 h-6" />

          <Text asChild className="font-bold text-center">
            <p>
              {copiedToClipboard
                ? t.settings.security.exportKeys.copied
                : t.settings.security.exportKeys.copy}
            </p>
          </Text>
        </div>
      </div>
    </div>
  )
}
