import clsx from 'clsx'
import Image from 'next/image'
import { ReactNode, ThHTMLAttributes } from 'react'

import { Text } from '@components/Text'

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
  tokenSymbol: string
  tokenIcon: string
  balance: number
  valueInUsd: number
}

function AssetsTableTr({
  tokenSymbol,
  tokenIcon,
  balance,
  valueInUsd
}: AssetsTableTrProps) {
  return (
    <tr className="[&>*]:min-w-[7rem] font-medium border-b-1 border-zinc-300 dark:border-zinc-700 text-sm">
      <td className="pl-2 py-3">
        <div className="flex items-center justify-start gap-4">
          <Image
            src={tokenIcon}
            alt="safe asset icon"
            width={32}
            height={32}
            className="w-8 h-8"
          />

          <Text className="font-medium uppercase">{tokenSymbol}</Text>
        </div>
      </td>

      <td className="py-3 uppercase text-gray-800 dark:text-gray-400">
        <Text>
          {balance.toFixed(3)} {tokenSymbol}
        </Text>
      </td>

      <td className="py-3 uppercase text-gray-800 dark:text-gray-400">
        <Text>{valueInUsd.toFixed(4)} usd</Text>
      </td>
    </tr>
  )
}

AssetsTableTr.displayName = 'AssetsTable.Tr'

export const AssetsTable = {
  Th: AssetsTableTh,
  Tr: AssetsTableTr
}
