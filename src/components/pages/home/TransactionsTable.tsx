import { HTMLAttributes, ReactNode, ThHTMLAttributes } from 'react'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { Text } from '@components/Text'
import { ArrowSquareOut } from 'phosphor-react'

interface TransactionsTableThProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
}

export function TransactionsTableTh({
  children,
  className,
  ...props
}: TransactionsTableThProps) {
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

TransactionsTableTh.displayName = 'TransactionsTable.Th'

interface TransactionsTableTrProps extends HTMLAttributes<HTMLTableRowElement> {
  transactionLink: string
  transactedAt: Date
  category: 'debit' | 'credit'
  sender: {
    name: string
    walletAddress: string
  }
  receiver: {
    name: string
    walletAddress: string
  }
  token: {
    symbol: string
    avatar: string
  }
  value: {
    valueInDollar: number
    valueInTokens: number
  }
}

export function TransactionsTableTr({
  transactionLink,
  sender,
  transactedAt,
  receiver,
  token,
  category,
  value,
  className,
  ...props
}: TransactionsTableTrProps) {
  return (
    <tr
      className={clsx(
        'text-gray-800 dark:text-gray-50 font-medium border-b-[0.5px] border-gray-400 dark:border-gray-600',
        className
      )}
      {...props}
    >
      <td className="py-3 min-w-[10rem]">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <Text className="font-bold uppercase">{sender.name}</Text>

            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {sender.walletAddress.slice(0, 6)}...
              {sender.walletAddress.slice(-6)}
            </Text>
          </div>
        </div>
      </td>

      <td className="py-3 min-w-[10rem]">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <Text className="font-bold uppercase">{receiver.name}</Text>

            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {receiver.walletAddress.slice(0, 6)}...
              {receiver.walletAddress.slice(-6)}
            </Text>
          </div>
        </div>
      </td>

      <td className="min-w-[7rem]">
        {category === 'credit' ? (
          <div className="flex flex-col">
            <Text className="uppercase text-green-500">
              {value.valueInTokens} {token.symbol}
            </Text>

            <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              ${value.valueInDollar}
            </Text>
          </div>
        ) : (
          <div className="flex flex-col">
            <Text className="uppercase text-red-500">
              {value.valueInTokens} {token.symbol}
            </Text>

            <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              ${value.valueInDollar}
            </Text>
          </div>
        )}
      </td>

      <td className="min-w-[7rem] font-semibold capitalize">{category}</td>

      <td className="min-w-[8rem]">
        <Text className="text-sm font-semibold">
          {dayjs(transactedAt).format('DD/MM/YYYY hh:mm')}
        </Text>
      </td>

      <td>
        <div className="max-w-[7rem] flex items-center justify-center">
          <Text
            asChild
            className="p-2 bg-transparent rounded-md hover:bg-gray-500/10 transition-colors"
          >
            <a href={transactionLink} target="_blank" rel="noreferrer">
              <ArrowSquareOut className="w-6 h-6" weight="bold" />
            </a>
          </Text>
        </div>
      </td>
    </tr>
  )
}

TransactionsTableTr.displayName = 'TransactionsTable.Tr'

export const TransactionsTable = {
  Th: TransactionsTableTh,
  Tr: TransactionsTableTr
}
