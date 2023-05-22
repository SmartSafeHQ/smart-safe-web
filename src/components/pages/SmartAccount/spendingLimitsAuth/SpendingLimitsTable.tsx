import clsx from 'clsx'
import Image from 'next/image'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { ReactNode, ThHTMLAttributes } from 'react'
import { DotsThreeVertical } from '@phosphor-icons/react'

import { Text } from '@components/Text'
import { HoverCard } from '@components/HoverCard'
import { DropdownMenu } from '@components/DropdownMenu'

import { SelectedSpendingLimitsProps } from '@contexts/smart-account/SpendingLimitsAuthContext'
import { handleCopyToClipboard } from '@utils/clipboard'

dayjs.extend(utc)

interface SpendingLimitsTableThProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
}

function SpendingLimitsTableTh({
  children,
  className
}: SpendingLimitsTableThProps) {
  return (
    <th
      className={clsx(
        'whitespace-nowrap text-start font-medium text-xs md:text-xs',
        className
      )}
    >
      {children}
    </th>
  )
}

SpendingLimitsTableTh.displayName = 'SpendingLimitsTable.Th'

interface SpendingLimitsTableTrProps {
  spendingLimits: SelectedSpendingLimitsProps
  handleDeleteSpendingLimits: (_withdrawal: SelectedSpendingLimitsProps) => void
}

function SpendingLimitsTableTr({
  spendingLimits,
  handleDeleteSpendingLimits
}: SpendingLimitsTableTrProps) {
  const formattedDate = dayjs(spendingLimits.dateFrom)
    .utc()
    .format('DD/MM/YYYY')

  return (
    <tr className="font-medium border-b-1 border-gray-300 dark:border-gray-700">
      <td className="pl-2 py-3 min-w-[8rem]">
        <div className="flex flex-col gap-1">
          {spendingLimits?.recipientName && (
            <Text className="text-sm md:text-base" asChild>
              <strong>{spendingLimits.recipientName}</strong>
            </Text>
          )}

          <HoverCard.Root>
            <HoverCard.Trigger
              asChild
              className="w-min text-sm capitalize text-gray-500 dark:text-gray-400"
            >
              <button
                onClick={() =>
                  handleCopyToClipboard(spendingLimits.wallet.address)
                }
              >
                {spendingLimits.wallet.formattedAddress}
              </button>
            </HoverCard.Trigger>

            <HoverCard.Content className="text-sm">
              copy address
              <HoverCard.Arrow />
            </HoverCard.Content>
          </HoverCard.Root>
        </div>
      </td>

      <td>
        <div className="flex items-center gap-2">
          <Text className="uppercase text-sm md:text-base">
            {spendingLimits.coinAmount} {spendingLimits.coin.symbol}
          </Text>

          <Image
            src={spendingLimits.coin.avatar}
            alt={`${spendingLimits.coin.symbol} avatar`}
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </div>
      </td>

      <td>
        <Text className="text-sm text-gray-500 dark:text-gray-400 md:text-base">
          {formattedDate}
        </Text>
      </td>

      <td className="py-3 pr-1">
        <div className="flex items-center justify-end">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button
                aria-label="Spending limit authorization management options"
                className="p-1 rounded-sm transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <DotsThreeVertical className="w-6 h-6" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              sideOffset={8}
              align="end"
              className="min-w-[10rem] p-2"
            >
              <DropdownMenu.Item
                onSelect={() => handleDeleteSpendingLimits(spendingLimits)}
                className="px-3 py-2 rounded-md text-sm"
              >
                <Text className="text-sm text-red-500">delete</Text>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </td>
    </tr>
  )
}

SpendingLimitsTableTr.displayName = 'SpendingLimitsTableTr.Tr'

export const SpendingLimitsTable = {
  Th: SpendingLimitsTableTh,
  Tr: SpendingLimitsTableTr
}
