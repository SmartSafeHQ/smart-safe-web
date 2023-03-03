import clsx from 'clsx'
import { CaretRight, CaretLeft } from 'phosphor-react'
import { Dispatch, HTMLAttributes, SetStateAction } from 'react'

import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'

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
  const { t } = useI18n()

  return (
    <div
      className={clsx('w-full flex items-center gap-2', className)}
      {...props}
    >
      <button
        className="flex items-center justify-center p-1 text-gray-600 dark:text-gray-50 text-lg rounded-md bg-gray-200 dark:bg-gray-900 transition-colors hover:text-brand-foregroundAccent2 disabled:dark:brightness-75 disabled:dark:bg-gray-800 disabled:cursor-not-allowed disabled:dark:hover:text-gray-50  disabled:bg-gray-100 disabled:hover:text-gray-600"
        aria-label="Prev page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <CaretLeft weight="bold" />
      </button>

      <div className="flex items-center gap-1">
        <Text asChild className="font-semibold text-brand-foregroundAccent1">
          <strong>{currentPage}</strong>
        </Text>

        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {t.pagination.of} {Math.max(1, lastPage)}
        </Text>
      </div>

      <button
        className="flex items-center justify-center p-1 text-gray-600 dark:text-gray-50 text-lg rounded-md bg-gray-200 dark:bg-gray-900 transition-colors hover:text-brand-foregroundAccent2 disabled:dark:brightness-75 disabled:dark:bg-gray-800 disabled:cursor-not-allowed disabled:dark:hover:text-gray-50  disabled:bg-gray-100 disabled:hover:text-gray-600"
        aria-label="Next page"
        onClick={() => onPageChange(prev => prev + 1)}
        disabled={currentPage === Math.max(1, lastPage)}
      >
        <CaretRight weight="bold" />
      </button>
    </div>
  )
}
