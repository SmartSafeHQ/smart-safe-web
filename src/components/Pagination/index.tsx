import clsx from 'clsx'
import { CaretRight, CaretLeft } from 'phosphor-react'
import { Dispatch, HTMLAttributes, SetStateAction } from 'react'

import { Text } from '@components/Text'

interface PaginationRootProps extends HTMLAttributes<HTMLDivElement> {
  currentPage: number
  lastPage: number
  onPageChange: Dispatch<SetStateAction<number>>
}

export function Pagination({
  className,
  currentPage,
  onPageChange,
  lastPage,
  ...props
}: PaginationRootProps) {
  return (
    <div
      className={clsx('w-full flex items-center gap-2', className)}
      {...props}
    >
      <button
        className="flex items-center justify-center p-1 text-gray-50 text-lg rounded-md bg-gray-900 transition-colors hover:text-cyan-500 disabled:brightness-75 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:hover:text-gray-50"
        aria-label="Prev page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <CaretLeft weight="bold" />
      </button>

      <div className="flex items-center gap-1">
        <Text asChild className="font-semibold text-cyan-500">
          <strong>{currentPage}</strong>
        </Text>

        <Text className="text-sm text-gray-400">
          of {Math.max(1, lastPage)}
        </Text>
      </div>

      <button
        className="flex items-center justify-center p-1 text-gray-50 text-lg rounded-md bg-gray-900 transition-colors hover:text-cyan-500 disabled:brightness-75 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:hover:text-gray-50"
        aria-label="Prev page"
        onClick={() => onPageChange(prev => prev + 1)}
        disabled={currentPage === Math.max(1, lastPage)}
      >
        <CaretRight weight="bold" />
      </button>
    </div>
  )
}
