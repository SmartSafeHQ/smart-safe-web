import clsx from 'clsx'
import { ReactNode } from 'react'

interface SkeletonProps {
  isLoading: boolean
  children: ReactNode | ReactNode[]
  className?: string
}

export function Skeleton({ isLoading, className, children }: SkeletonProps) {
  return (
    <>
      {isLoading ? (
        <div
          className={clsx(
            'w-full rounded-md animate-pulse bg-gray-300 dark:bg-gray-700',
            className
          )}
        />
      ) : (
        children
      )}
    </>
  )
}
