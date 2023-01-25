import { HTMLAttributes, ReactNode, ThHTMLAttributes } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { Text } from '@components/Text'
import { Avatar } from '@components/Avatar'
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
        'first:pl-4 pb-2 whitespace-nowrap text-start font-semibold text-xs md:text-sm',
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
  explorerLink: string
  contract: {
    address: string
    calledAt: Date
    link: string
  }
  receiver: {
    email: string
    name: string
    walletAddress: string
  }
  token: {
    symbol: string
    avatar: string
  }
  category: 'swap' | 'send' | 'mint' | 'receive'
  value: {
    type: 'withdraw' | 'income'
    valueInDollar: number
    valueInTokens: number
  }
}

export function TransactionsTableTr({
  explorerLink,
  contract,
  receiver,
  token,
  category,
  value,
  className,
  ...props
}: TransactionsTableTrProps) {
  const formattedWallet = `${receiver.walletAddress.slice(0, 6)}...
  ${receiver.walletAddress.slice(-6)}`
  return (
    <tr
      className={clsx(
        'text-gray-800 dark:text-gray-50 font-medium border-b-[0.5px] border-gray-400 dark:border-gray-600',
        className
      )}
      {...props}
    >
      <td className="pl-4 py-3 min-w-[14rem]">
        <div className="flex items-center gap-4">
          <Avatar.Root
            fallbackName={token.symbol}
            className="w-8 h-8 md:w-11 md:h-11"
          >
            <Avatar.Image src={token.avatar} alt={`${token.symbol} contract`} />
          </Avatar.Root>

          <div className="flex flex-col">
            <Text asChild className="font-bold capitalize">
              <Link href={contract.link} target="_blank">
                Contract call
              </Link>
            </Text>

            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {dayjs(contract.calledAt).format('DD/MM/YYYY hh:mm')}
            </Text>
          </div>
        </div>
      </td>

      <td className="py-3 min-w-[14rem]">
        <div className="flex items-center gap-4">
          <Avatar.Root
            fallbackName={receiver.name.substring(0, 2)}
            className="w-8 h-8 md:w-11 md:h-11"
          >
            <Avatar.Image src="#" alt={receiver.name} />
          </Avatar.Root>

          <div className="flex flex-col">
            <Text className="font-bold uppercase">{receiver.name}</Text>

            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {formattedWallet}
            </Text>
          </div>
        </div>
      </td>

      {value.type === 'income' ? (
        <td className="min-w-[7rem]">
          <div className="flex flex-col">
            <Text className="uppercase font-semibold">
              ${value.valueInDollar}
            </Text>

            <Text className="uppercase text-sm text-green-500">
              +{value.valueInTokens} {token.symbol}
            </Text>
          </div>
        </td>
      ) : (
        <td className="min-w-[7rem]">
          <div className="flex flex-col">
            <Text className="uppercase font-semibold">
              ${value.valueInDollar}
            </Text>

            <Text className="uppercase text-sm text-red-500">
              -{value.valueInTokens} {token.symbol}
            </Text>
          </div>
        </td>
      )}

      <td className="min-w-[7rem] font-semibold capitalize">{category}</td>

      <td className="min-w-[10rem]">
        <Text
          asChild
          className="w-full flex items-center gap-2 text-center text-gray-500 dark:text-gray-100 font-semibold transition-all hover:text-cyan-500"
        >
          <Link href={explorerLink} target="_blank">
            <Text>Explorer link</Text>

            <ArrowSquareOut
              className="w-4 h-4 md:hidden lg:inline"
              weight="bold"
            />
          </Link>
        </Text>
      </td>
    </tr>
  )
}

TransactionsTableTr.displayName = 'TransactionsTable.Tr'

export const TransactionsTable = {
  Th: TransactionsTableTh,
  Tr: TransactionsTableTr
}
