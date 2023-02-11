import clsx from 'clsx'
import { ArrowClockwise } from 'phosphor-react'
import { Dispatch, SetStateAction } from 'react'

import { Pagination } from '@components/Pagination'
import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'

interface PaginationFetchProps {
  registersPerPage: number
  totalCountOfRegisters: number
  isFetching: boolean
  currentPage: number
  onPageChange: Dispatch<SetStateAction<number>>
  handleRefetch: () => void
}

export function PaginationFetch({
  registersPerPage,
  totalCountOfRegisters,
  handleRefetch,
  currentPage,
  onPageChange,
  isFetching
}: PaginationFetchProps) {
  const { t } = useI18n()

  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

  return (
    <header className="w-full flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button
          className="flex items-center justify-center group p-2 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-500 transition-colors hover:text-cyan-500 disabled:brightness-75 disabled:cursor-not-allowed disabled:hover:text-gray-400"
          aria-label={t.pagination.refetchingData}
          onClick={handleRefetch}
          disabled={isFetching}
        >
          <ArrowClockwise
            className={clsx('text-sm', {
              'animate-spin': isFetching
            })}
            weight="bold"
          />
        </button>

        {isFetching && (
          <Text className="text-sm font-semibold text-gray-400">
            {t.pagination.fetching}
          </Text>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={onPageChange}
        className="justify-end mb-2"
      />
    </header>
  )
}
