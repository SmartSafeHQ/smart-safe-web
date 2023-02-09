import { ReactNode } from 'react'
import clsx from 'clsx'

import { Skeleton } from '@components/FetchingStates/Skeleton'
import { Text } from '@components/Text'

interface CoinsTableDataFetchingProps {
  isLoading: boolean
  isRefetching: boolean
  error: boolean
  children: ReactNode
  skeletonClassName?: string
  className?: string
  classObject?: Record<string, boolean>
}

export function CoinsTableDataFetching({
  isLoading,
  isRefetching,
  error,
  children,
  skeletonClassName,
  className,
  classObject
}: CoinsTableDataFetchingProps) {
  return (
    <Skeleton
      isLoading={isLoading}
      className={clsx('w-24 h-7', skeletonClassName)}
    >
      {error && <Text className="text-sm">error</Text>}

      <Text
        className={clsx(className, {
          'animate-pulse': isRefetching,
          ...classObject
        })}
      >
        {children}
      </Text>
    </Skeleton>
  )
}
