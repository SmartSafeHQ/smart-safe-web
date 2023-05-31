import clsx from 'clsx'
import { ReactNode } from 'react'

interface SkeletonProps {
  isLoading: boolean
  children: ReactNode | ReactNode[]
  totalOfLines?: number
  className?: string
  variant?: 'default' | 'avatar'
}

export function Skeleton({
  isLoading,
  variant = 'default',
  totalOfLines = 1,
  className,
  children
}: SkeletonProps) {
  return (
    <>
      {isLoading ? (
        <div className={clsx('flex flex-col gap-3', className)}>
          {[...Array(totalOfLines).keys()].map(item => (
            <div
              key={item}
              className={clsx(
                'flex flex-1 animate-pulse bg-zinc-300 dark:bg-zinc-700',
                {
                  'rounded-md': variant === 'default',
                  'rounded-full': variant === 'avatar'
                }
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
