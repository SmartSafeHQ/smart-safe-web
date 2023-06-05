import {
  CheckCircle,
  Icon,
  WarningCircle,
  XCircle
} from '@phosphor-icons/react'
import clsx from 'clsx'

import { Text } from '@components/Text'

import { DeployStatus } from '@contexts/CreateSafeContext'

const STATUS_ICONS = new Map<DeployStatus, Icon>([
  ['loading', WarningCircle],
  ['success', CheckCircle],
  ['error', XCircle]
])

interface DeployStepProps {
  message: string
  status: DeployStatus
  error?: string | null
}

export function DeployStep({ message, status, error }: DeployStepProps) {
  const Icon = STATUS_ICONS.get(status) ?? WarningCircle

  return (
    <div className="w-full flex items-stretch justify-start gap-1 text-left">
      <Icon
        className={clsx('w-5 h-5 text-zinc-600 dark:text-zinc-400', {
          '!text-green-600': status === 'success',
          '!text-red-600': status === 'error'
        })}
      />

      <div className="flex flex-col items-stretch justify-start gap-1">
        <Text className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {message}
        </Text>

        {error && <Text className="text-xs text-red-500">{error}</Text>}
      </div>
    </div>
  )
}
