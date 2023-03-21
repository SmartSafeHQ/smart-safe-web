import type { ChainProps } from '@hooks/settings/useSettingsSecurity/export/interfaces'

import Image from 'next/image'

import { Button } from '@components/Button'
import { Toggle } from '@components/Toggle'
import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'

type SelectNetworksToExportProps = {
  chainsToExport: ChainProps[]
  isExportDisabled: boolean
  handleAddChain: (_chainIndex: number) => void
  handleRemoveChain: (_chainId: string) => void
  handleExport: () => void
}

export function SelectNetworksToExport({
  chainsToExport,
  handleAddChain,
  handleRemoveChain,
  isExportDisabled,
  handleExport
}: SelectNetworksToExportProps) {
  const { t } = useI18n()

  return (
    <div className="flex flex-col gap-4 w-full">
      <strong className="text-lg font-medium">
        {t.settings.security.exportKeysSubTitle}
      </strong>

      <div className="flex items-center gap-3">
        {chainsToExport.map((chain, index) => (
          <Toggle
            key={chain.id}
            id={chain.id}
            className="w-full p-4 flex flex-col items-center justify-center gap-3 bg-gray-200 dark:bg-gray-800 rounded-md md:p-6"
            onPressedChange={(pressed: boolean) =>
              pressed ? handleAddChain(index) : handleRemoveChain(chain.id)
            }
          >
            <Image
              src={chain.iconPath}
              alt={`${chain.name} icon`}
              className="w-full max-w-[6rem] bg-cover rounded-full md:max-w-[9rem]"
              width={144}
              height={144}
              quality={100}
            />

            <Text
              asChild
              className="text-2xl capitalize text-gray-800 dark:text-gray-50"
            >
              <strong>{chain.name}</strong>
            </Text>
          </Toggle>
        ))}
      </div>

      <Button
        className="w-full md:max-w-xs ml-auto"
        onClick={handleExport}
        disabled={isExportDisabled}
      >
        {t.settings.security.exportKeys.export}
      </Button>
    </div>
  )
}
