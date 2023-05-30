import { CheckCircle, Checks } from '@phosphor-icons/react'
import { HTMLAttributes, ReactNode } from 'react'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { Text } from '@components/Text'
import { Heading } from '@components/Heading'
import { Skeleton } from '@components/FetchingStates/Skeleton'

interface TransactionLayoutChangeThresholdHeaderProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  txNonce: number
  currentThreshold?: number
  newThreshold: number
  createdAt?: Date
}

function TransactionLayoutChangeThresholdHeader({
  txNonce,
  createdAt,
  currentThreshold,
  newThreshold,
  children,
  className,
  ...props
}: TransactionLayoutChangeThresholdHeaderProps) {
  return (
    <div
      className={clsx(
        'w-full flex items-stretch justify-between gap-4 font-medium capitalize md:items-center',
        className
      )}
      {...props}
    >
      <Text>{txNonce}</Text>

      <div className="max-w-5xl flex flex-1 flex-col items-stretch justify-between gap-2 md:items-center md:flex-row">
        <div className="flex items-center gap-2 lowercase">
          <CheckCircle className="w-4 h-4 text-cyan-500" />
          <Text>Change Threshold</Text>
        </div>

        <div className="flex items-center gap-2">
          <Checks className="w-5 h-5 text-zinc-500" />

          <Skeleton isLoading={!currentThreshold} className="w-20 h-6">
            {currentThreshold && (
              <Text className="lowercase">
                {currentThreshold} to {newThreshold}
              </Text>
            )}
          </Skeleton>
        </div>

        {createdAt && (
          <Text className="w-min">{dayjs(createdAt).format('DD/MM/YYYY')}</Text>
        )}
      </div>

      {children}
    </div>
  )
}

interface TransactionLayoutChangeThresholdInfosProps
  extends HTMLAttributes<HTMLDivElement> {
  currentThreshold?: number
  newThreshold: number
}

function TransactionLayoutChangeThresholdInfos({
  currentThreshold,
  newThreshold,
  ...props
}: TransactionLayoutChangeThresholdInfosProps) {
  return (
    <div className="w-full flex flex-col gap-2" {...props}>
      <Heading className="text-xl font-medium">
        Change Threshold to <strong>{newThreshold}</strong>:
      </Heading>

      <div className="flex items-center justify-start gap-2">
        <div className="flex items-stretch justify-start gap-2">
          <Text>
            The current policy requires <strong>{currentThreshold}</strong>{' '}
            approvals
          </Text>
        </div>
      </div>
    </div>
  )
}

export const TransactionLayoutChangeThreshold = {
  Header: TransactionLayoutChangeThresholdHeader,
  Infos: TransactionLayoutChangeThresholdInfos
}
