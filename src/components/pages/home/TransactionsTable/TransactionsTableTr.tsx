import { HTMLAttributes } from 'react'
import dayjs from 'dayjs'
import clsx from 'clsx'
import { ArrowSquareOut } from 'phosphor-react'

import { Text } from '@components/Text'
import { HoverCard } from '@components/HoverCard'
import { Avatar } from '@components/Avatar'

import { handleCopyToClipboard } from '@utils/global'
import { useI18n } from '@hooks/useI18n'

interface TransactionsTableTrProps extends HTMLAttributes<HTMLTableRowElement> {
  transactionLink: string
  transactedAt: Date
  category: 'debit' | 'credit'
  sender: string
  receiver: string
  coin: {
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
  coin,
  category,
  value,
  className,
  ...props
}: TransactionsTableTrProps) {
  const { t } = useI18n()

  return (
    <tr
      className={clsx(
        'text-gray-800 dark:text-gray-50 font-medium border-b-[0.5px] border-gray-400 dark:border-gray-600',
        className
      )}
      {...props}
    >
      <td className="min-w-[4rem] pl-2 md:pl-3">
        <HoverCard.Root openDelay={100}>
          <HoverCard.Trigger>
            <Avatar.Root fallbackName={coin.symbol} className="w-10 h-10">
              <Avatar.Image src={coin.avatar} alt={`${coin.symbol} contract`} />
            </Avatar.Root>
          </HoverCard.Trigger>

          <HoverCard.Content
            side="right"
            variant="highlighted"
            className="text-sm uppercase"
          >
            {coin.symbol}
            <HoverCard.Arrow />
          </HoverCard.Content>
        </HoverCard.Root>
      </td>

      <td className="min-w-[8rem] py-6">
        <HoverCard.Root openDelay={100}>
          <HoverCard.Trigger>
            <button
              onClick={() => handleCopyToClipboard(sender)}
            >{`${sender.slice(0, 4)}...${sender.slice(-4)}`}</button>
          </HoverCard.Trigger>

          <HoverCard.Content variant="highlighted" className="text-sm">
            {t.home.copyAddress}
            <HoverCard.Arrow />
          </HoverCard.Content>
        </HoverCard.Root>
      </td>

      <td className="min-w-[8rem] py-3">
        <HoverCard.Root>
          <HoverCard.Trigger>
            <button
              onClick={() => handleCopyToClipboard(receiver)}
            >{`${receiver.slice(0, 4)}...${receiver.slice(-4)}`}</button>
          </HoverCard.Trigger>

          <HoverCard.Content variant="highlighted" className="text-sm">
            {t.home.copyAddress}
            <HoverCard.Arrow />
          </HoverCard.Content>
        </HoverCard.Root>
      </td>

      <td className="min-w-[8rem]">
        <div className="flex flex-col">
          <Text
            className={clsx('uppercase', {
              'text-green-500': category === 'credit',
              'text-red-500': category === 'debit'
            })}
          >
            {value.valueInTokens} {coin.symbol}
          </Text>

          <Text className="text-sm text-gray-500 dark:text-gray-400">
            ${value.valueInDollar}
          </Text>
        </div>
      </td>

      <td className="min-w-[7rem] capitalize">{category}</td>

      <td className="min-w-[8rem]">
        <Text className="inline-block w-[5.5rem] text-sm break-all">
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
