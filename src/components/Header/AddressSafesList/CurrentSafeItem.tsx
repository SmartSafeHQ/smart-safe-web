import { ArrowSquareOut, Copy } from '@phosphor-icons/react'
import Link from 'next/link'

import { Text } from '@components/Text'
import { handleCopyToClipboard } from '@utils/clipboard'

interface CurrentSafeItemProps {
  safeAddress: string
  safeName: string
  safeFormattedAddress: string
  hexColor: string
  name: string
  explorerUrl: string
}

export function CurrentSafeItem({
  safeAddress,
  safeName,
  safeFormattedAddress,
  hexColor,
  name,
  explorerUrl
}: CurrentSafeItemProps) {
  return (
    <div className="flex items-center justify-start gap-3 w-full h-20 p-2 text-left overflow-hidden rounded-md pointer transition-colors bg-zinc-500/10 dark:bg-zinc-50/10 md:h-14">
      <div className="w-7 h-7 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />

      <div className="flex flex-col items-stretch justify-start">
        <Text asChild className="text-sm font-medium">
          <strong>{safeName}</strong>
        </Text>

        <div className="flex flex-col items-start justify-start gap-2 md:flex-row">
          <Text className="text-sm text-zinc-600 dark:text-zinc-500">
            {safeFormattedAddress}
          </Text>

          <div className="flex items-center justify-start gap-2">
            <button
              onClick={() => handleCopyToClipboard(safeAddress)}
              className="transition-colors hover:text-cyan-500"
            >
              <Copy className="w-4 h-4" />
            </button>

            <Link
              href={`${explorerUrl}/address/${safeAddress}`}
              target="_blank"
              className="transition-colors hover:text-cyan-500"
            >
              <ArrowSquareOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-1 items-start justify-end ml-2">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: hexColor
            }}
          />

          <Text className="text-xs text-zinc-600 dark:text-zinc-500">
            {name}
          </Text>
        </div>
      </div>
    </div>
  )
}
