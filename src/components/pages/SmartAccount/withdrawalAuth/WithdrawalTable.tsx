import clsx from 'clsx'
import Image from 'next/image'
import dayjs from 'dayjs'
import { ReactNode, ThHTMLAttributes } from 'react'
import { DotsThreeVertical } from 'phosphor-react'

import { Text } from '@components/Text'
import { HoverCard } from '@components/HoverCard'
import { DropdownMenu } from '@components/DropdownMenu'

import { SelectedWithdrawalProps } from '@contexts/SAWithdrawalAuthContext'
import { useI18n } from '@hooks/useI18n'
import { handleCopyToClipboard } from '@utils/global'

interface WithdrawalTableThProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
}

function WithdrawalTableTh({ children, className }: WithdrawalTableThProps) {
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

WithdrawalTableTh.displayName = 'WithdrawalTable.Th'

interface WithdrawalTableTrProps {
  withdrawal: SelectedWithdrawalProps
  handleDeleteWithdrawal: (_withdrawal: SelectedWithdrawalProps) => void
}

function WithdrawalTableTr({
  withdrawal,
  handleDeleteWithdrawal
}: WithdrawalTableTrProps) {
  const { t } = useI18n()

  const formattedDate = dayjs(withdrawal.dateFrom).format('DD/MM/YYYY')

  return (
    <tr className="font-medium border-b-1 border-gray-300 dark:border-gray-700">
      <td className="pl-2 py-3 min-w-[8rem]">
        <div className="flex flex-col gap-1">
          {withdrawal?.recipientName && (
            <Text className="text-sm md:text-base" asChild>
              <strong>{withdrawal.recipientName}</strong>
            </Text>
          )}

          <HoverCard.Root>
            <HoverCard.Trigger
              asChild
              className="w-min text-sm capitalize text-gray-500 dark:text-gray-400"
            >
              <button
                onClick={() => handleCopyToClipboard(withdrawal.wallet.address)}
              >
                {withdrawal.wallet.formattedAddress}
              </button>
            </HoverCard.Trigger>

            <HoverCard.Content className="text-sm">
              {t.saWithdrawalAuth.copyAddr}
              <HoverCard.Arrow />
            </HoverCard.Content>
          </HoverCard.Root>
        </div>
      </td>

      <td>
        <div className="flex items-center gap-2">
          <Text className="uppercase text-sm md:text-base">
            {withdrawal.coinAmount} {withdrawal.coin.symbol}
          </Text>

          <Image
            src={withdrawal.coin.avatar}
            alt={`${withdrawal.coin.symbol} avatar`}
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
                aria-label={t.saWithdrawalAuth.menuAriaLabel}
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
                onSelect={() => handleDeleteWithdrawal(withdrawal)}
                className="px-3 py-2 rounded-md text-sm"
              >
                <Text className="text-sm text-red-500">
                  {t.saWithdrawalAuth.delete}
                </Text>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </td>
    </tr>
  )
}

WithdrawalTableTr.displayName = 'WithdrawalTable.Tr'

export const WithdrawalTable = {
  Th: WithdrawalTableTh,
  Tr: WithdrawalTableTr
}
