import { PaperPlaneTilt, Wallet } from '@phosphor-icons/react'
import { Text } from '@components/Text'

import { useSend } from '@contexts/SendContext'
import { useSafe } from '@contexts/SafeContext'

export function SendAddresses() {
  const { safe } = useSafe()
  const { transaction } = useSend()

  return (
    <div className="w-full flex flex-col items-stretch gap-6">
      <div className="w-full flex p-3 gap-4 items-center justify-between rounded-md bg-zinc-200 dark:bg-zinc-800 shadow-md">
        <div className="flex items-center gap-3">
          <PaperPlaneTilt className="w-7 h-7 text-cyan-500" />

          <Text className="text-base font-semibold capitalize text-zinc-900 dark:text-zinc-50 sm:text-lg">
            From
          </Text>
        </div>

        <div className="flex flex-wrap flex-col text-right gap-1 capitalize">
          <Text asChild className="text-zinc-900 dark:text-zinc-50 capitalize">
            <strong>{safe?.name}</strong>
          </Text>

          <Text
            asChild
            className="text-sm text-zinc-700 dark:text-zinc-300 lowercase"
          >
            <span>{safe?.formattedAddress}</span>
          </Text>
        </div>
      </div>

      <div className="w-full flex p-3 gap-4 items-center justify-between rounded-md bg-zinc-200 dark:bg-zinc-800 shadow-md">
        <div className="flex items-center gap-3">
          <Wallet className="w-7 h-7 text-cyan-500" />

          <Text className="text-base font-semibold capitalize text-zinc-900 dark:text-zinc-50 sm:text-lg">
            To
          </Text>
        </div>

        <div className="flex flex-wrap flex-col text-right gap-1 capitalize">
          <Text asChild className="text-zinc-900 dark:text-zinc-50 capitalize">
            <strong>Address</strong>
          </Text>

          <Text
            asChild
            className="text-sm text-zinc-700 dark:text-zinc-300 lowercase"
          >
            <span>{transaction?.formattedTo}</span>
          </Text>
        </div>
      </div>
    </div>
  )
}
