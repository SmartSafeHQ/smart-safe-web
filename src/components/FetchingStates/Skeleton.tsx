import clsx from 'clsx'
import { ReactNode } from 'react'

interface SkeletonProps {
  isLoading: boolean
  children: ReactNode | ReactNode[]
  totalOfLines?: number
  className?: string
}

export function Skeleton({
  isLoading,
  totalOfLines = 1,
  className,
  children
}: SkeletonProps) {
  return (
    <>
      {isLoading ? (
        <div className="flex flex-1 flex-col gap-3">
          {[...Array(totalOfLines).keys()].map(item => (
            <div
              key={item}
              className={clsx(
                'rounded-md animate-pulse bg-zinc-300 dark:bg-zinc-700',
                className
              )}
            />
          ))}
        </div>
      ) : (
        children
      )}
    </>
  )
}
