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
        'pb-2 whitespace-nowrap text-start font-semibold text-xs md:text-sm',
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
  income: {
    stockStatus: 'up' | 'down'
    percentage: number
  }
  price: number
  balance: number
}

export function TokensTableTr({
  name,
  symbol,
  avatar,
  income,
  balance,
  price,
  className,
  ...props
}: TokensTableTrProps) {
  return (
    <tr
      className={clsx(
        'text-gray-50 font-medium border-b-[0.5px] border-gray-600',
        className
      )}
      {...props}
    >
      <td className="py-3 min-w-[10rem]">
        <div className="flex items-center gap-4">
          <Avatar.Root
            fallbackName={symbol}
            className="w-8 h-8 md:w-11 md:h-11"
          >
            <Avatar.Image src={avatar} alt={name} />
          </Avatar.Root>

          <div className="flex flex-col">
            <Text className="font-bold uppercase">{symbol}</Text>

            <Text className="text-sm text-gray-400">{name}</Text>
          </div>
        </div>
      </td>

      {income.stockStatus === 'up' ? (
        <td className="min-w-[5rem]">
          <div className="flex items-center gap-1 font-medium text-green-500">
            +{income.percentage}%
          </div>
        </td>
      ) : (
        <td className="min-w-[5rem]">
          <div className="flex items-center gap-1 font-medium text-red-500">
            -{income.percentage}%
          </div>
        </td>
      )}

      <td className="min-w-[5rem]">${price}</td>

      <td className="min-w-[5rem]">{balance}</td>
    </tr>
  )
}

TokensTableTr.displayName = 'TokensTable.Tr'

export const TokensTable = {
  Th: TokensTableTh,
  Tr: TokensTableTr
}
