import { HTMLAttributes, ReactNode, ThHTMLAttributes } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'
import { Avatar } from '@components/Avatar'

interface TokensTableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
}

export function TokensTableTh({
  children,
  className,
  ...props
}: TokensTableThProps) {
  return (
    <th
      className={clsx(
        'first:pl-4 px-2 pb-2 whitespace-nowrap text-start font-semibold text-xs md:text-sm md:px-0',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

TokensTableTh.displayName = 'TokensTable.Th'

interface TokensTableTrProps extends HTMLAttributes<HTMLTableRowElement> {
  name: string
  symbol: string
  avatar: string
  change: {
    stockStatus: 'up' | 'down'
    percentage: number
  }
  price: number
  balance: {
    valueInDollar: number
    valueInTokens: number
  }
}

export function TokensTableTr({
  name,
  symbol,
  avatar,
  change,
  balance,
  price,
  className,
  ...props
}: TokensTableTrProps) {
  return (
    <tr
      className={clsx(
        'text-gray-800 dark:text-gray-50 font-medium border-b-[0.5px] border-gray-400 dark:border-gray-600',
        className
      )}
      {...props}
    >
      <td className="pl-4 py-3 min-w-[10rem]">
        <div className="flex items-center gap-4">
          <Avatar.Root
            fallbackName={symbol}
            className="w-8 h-8 md:w-11 md:h-11"
          >
            <Avatar.Image src={avatar} alt={name} />
          </Avatar.Root>

          <div className="flex flex-col">
            <Text className="font-bold uppercase">{symbol}</Text>

            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {name}
            </Text>
          </div>
        </div>
      </td>

      {change.stockStatus === 'up' ? (
        <td className="min-w-[5rem]">
          <Text className="text-green-500">+{change.percentage}%</Text>
        </td>
      ) : (
        <td className="min-w-[5rem]">
          <Text className="text-red-500">-{change.percentage}%</Text>
        </td>
      )}

      <td className="min-w-[5rem] font-semibold">${price}</td>

      <td className="min-w-[5rem]">
        <div className="flex flex-col">
          <Text className="font-medium uppercase">
            ${balance.valueInDollar}
          </Text>

          <Text className="uppercase text-sm text-gray-500 dark:text-gray-400">
            {balance.valueInTokens} {symbol}
          </Text>
        </div>
      </td>
    </tr>
  )
}

TokensTableTr.displayName = 'TokensTable.Tr'

export const TokensTable = {
  Th: TokensTableTh,
  Tr: TokensTableTr
}
