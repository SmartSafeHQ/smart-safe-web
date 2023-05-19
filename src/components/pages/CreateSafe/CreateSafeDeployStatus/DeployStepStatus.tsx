import { CheckCircle, WarningCircle, XCircle } from '@phosphor-icons/react'

import { Text } from '@components/Text'

export function StepOnGoing({ text }: { text: string }) {
  return (
    <div className="w-full flex items-center gap-1 text-left">
      <WarningCircle className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />

      <Text className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {text}
      </Text>
    </div>
  )
}

export function StepDone({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-start gap-1">
      <CheckCircle className="w-5 h-5 text-green-600" weight="fill" />

      <Text className="text-sm text-zinc-600 dark:text-zinc-400">{text}</Text>
    </div>
  )
}

export function StepError({ text, error }: { text: string; error: string }) {
  return (
    <div className="flex items-stretch justify-start gap-1">
      <XCircle className="w-5 h-5 text-red-500" weight="fill" />

      <div className="flex flex-col items-stretch justify-start gap-1">
        <Text className="text-sm text-zinc-600 dark:text-zinc-400">{text}</Text>

        <Text className="text-xs text-red-500">{error}</Text>
      </div>
    </div>
  )
}
