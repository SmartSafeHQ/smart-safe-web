import { Text } from '@components/Text'
import { WarningCircle } from '@phosphor-icons/react'

export function StepOnGoing({ text }: { text: string }) {
  return (
    <div className="w-full flex items-center gap-1 text-left text-sm text-zinc-600 dark:text-zinc-400">
      <WarningCircle className="w-5 h-5" />

      <Text className="text-md font-medium text-zinc-600 dark:text-zinc-400">
        {text}
      </Text>
    </div>
  )
}

export function StepDone({ text }: { text: string }) {
  return (
    <div className="flex gap-1 flex-col">
      <Text className="text-sm text-zinc-600 dark:text-zinc-400 line-through">
        {text}
      </Text>

      <Text className="text-lg font-bold text-green-500 ">Done!</Text>
    </div>
  )
}

export function StepError({ text, error }: { text: string; error: string }) {
  return (
    <div className="flex gap-1 flex-col">
      <Text className="text-sm text-zinc-600 dark:text-zinc-400 line-through">
        {text}
      </Text>

      <Text className="text-lg font-bold text-red-400 ">{error}</Text>
    </div>
  )
}
