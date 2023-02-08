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
        <div className="animate-pulse">
          <div
            className={clsx(
              'w-full rounded-md bg-gray-300 dark:bg-gray-700',
              className
            )}
          />
        </div>
      ) : (
        children
      )}
    </>
  )
}
