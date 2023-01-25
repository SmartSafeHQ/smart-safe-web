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
              'rounded-md bg-gray-300 dark:bg-gray-700 h-8 w-40',
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
