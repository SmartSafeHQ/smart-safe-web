import clsx from 'clsx'
import Image from 'next/image'
import { ReactNode, ThHTMLAttributes } from 'react'

import { Text } from '@components/Text'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useTokenUsdValue } from '@hooks/chains/queries/useTokenUsdValue'

interface AssetsTableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
}

function AssetsTableTh({ children, className }: AssetsTableThProps) {
  return (
    <th
      className={clsx(
        'whitespace-nowrap text-start font-medium text-xs',
        className
      )}
    >
      {children}
    </th>
  )
}

AssetsTableTh.displayName = 'AssetsTable.Th'

interface AssetsTableTrProps {
  symbol: string
  icon: string
  balance: number
}

function AssetsTableTr({ symbol, icon, balance }: AssetsTableTrProps) {
  const { data, isLoading, isFetching } = useTokenUsdValue(symbol)

  return (
    <tr className="[&>*]:min-w-[7rem] font-medium border-b-1 border-zinc-300 dark:border-zinc-700 text-sm">
      <td className="pl-2 py-3">
        <div className="flex items-center justify-start gap-4">
          <Image
            src={icon}
            alt="safe asset icon"
            width={32}
            height={32}
            className="w-8 h-8"
          />

          <Text className="font-medium uppercase">{symbol}</Text>
        </div>
      </td>

      <td className="py-3 uppercase text-zinc-800 dark:text-zinc-400">
        <Skeleton isLoading={isLoading} className="w-20 h-6">
          {data && (
            <Text
              className={clsx({
                'animate-pulse': isFetching
              })}
            >
              {balance.toFixed(4)} {symbol}
            </Text>
          )}
        </Skeleton>
      </td>

      <td className="py-3 uppercase text-zinc-800 dark:text-zinc-400">
        <Skeleton isLoading={isLoading} className="w-20 h-6">
          {data && (
            <Text
              className={clsx({
                'animate-pulse': isFetching
              })}
            >
              {(data.usdValue * balance).toFixed(4)} usd
            </Text>
          )}
        </Skeleton>
      </td>
    </tr>
  )
}

AssetsTableTr.displayName = 'AssetsTable.Tr'

export const AssetsTable = {
  Th: AssetsTableTh,
  Tr: AssetsTableTr
}
