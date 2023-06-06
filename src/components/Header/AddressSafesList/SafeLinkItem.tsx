import Link from 'next/link'
import clsx from 'clsx'

import { Text } from '@components/Text'

const SAFE_GRADIENT_COLORS = [
  'from-pink-500 to-yellow-500',
  'from-purple-400 to-blue-700',
  'from-yellow-500 to-teal-500',
  'from-slate-300 to-slate-800',
  'from-green-500 to-blue-500',
  'from-purple-500 to-rose-800',
  'from-lime-600 to-red-400',
  'from-cyan-400 to-pink-700',
  'from-orange-400 to-violet-700',
  'from-red-600 to-sky-600'
]

type SafeLinkItemProps = {
  index: number
  safeAddress: string
  safeName: string
  safeFormattedAddress: string
  hexColor: string
  networkName: string
}

export function SafeLinkItem({
  index,
  safeAddress,
  safeName,
  safeFormattedAddress,
  hexColor,
  networkName
}: SafeLinkItemProps) {
  const safeIndexLastDigit = index % 10

  return (
    <Link
      href={`/dashboard/${safeAddress}`}
      className="flex items-center justify-start gap-3 w-full h-14 p-2 text-left overflow-hidden rounded-md pointer transition-colors hover:bg-zinc-500/10 hover:dark:bg-zinc-50/10"
    >
      <div
        className={clsx(
          'w-7 h-7 rounded-full bg-gradient-to-r',
          SAFE_GRADIENT_COLORS[safeIndexLastDigit]
        )}
      />

      <div className="flex flex-col items-stretch justify-start">
        <Text asChild className="text-sm font-medium">
          <strong>{safeName}</strong>
        </Text>

        <Text className="text-sm text-zinc-600 dark:text-zinc-500">
          {safeFormattedAddress}
        </Text>
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
            {networkName}
          </Text>
        </div>
      </div>
    </Link>
  )
}
