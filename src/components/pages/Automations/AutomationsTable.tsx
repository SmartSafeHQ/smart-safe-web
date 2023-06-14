import clsx from 'clsx'
import Image from 'next/image'
import { ReactNode, ThHTMLAttributes } from 'react'
import { ArrowRight, DotsThreeVertical } from '@phosphor-icons/react'
import Link from 'next/link'

import { Text } from '@components/Text'
import { HoverCard } from '@components/HoverCard'
import { DropdownMenu } from '@components/DropdownMenu'

import { SelectedAutomationProps } from '@contexts/AutomationsContext'
import { handleCopyToClipboard } from '@utils/clipboard'

const CHAINLINK_NETWORKS = new Map<string, string>([
  ['MATIC', 'mumbai'],
  ['ETH', 'sepolia'],
  ['BNB', 'bnb-chain-testnet']
])

interface AutomationsTableThProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
}

function AutomationsTableTh({ children, className }: AutomationsTableThProps) {
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

AutomationsTableTh.displayName = 'AutomationsTable.Th'

interface AutomationsTableTrProps {
  automation: SelectedAutomationProps
  handleDeleteAutomation: (_withdrawal: SelectedAutomationProps) => void
}

function AutomationsTableTr({
  automation,
  handleDeleteAutomation
}: AutomationsTableTrProps) {
  const chainlinkNetworkLink = CHAINLINK_NETWORKS.get(automation.token.symbol)

  return (
    <tr className="font-medium border-b-1 border-zinc-300 dark:border-zinc-700">
      <td className="pl-2 py-3 min-w-[8rem]">
        <div className="flex flex-col gap-1">
          {automation?.recipientName && (
            <Text className="text-sm md:text-base" asChild>
              <strong>{automation.recipientName}</strong>
            </Text>
          )}

          <HoverCard.Root>
            <HoverCard.Trigger
              asChild
              className="w-min text-sm capitalize text-zinc-500 dark:text-zinc-400"
            >
              <button
                onClick={() => handleCopyToClipboard(automation.wallet.address)}
              >
                {automation.wallet.formattedAddress}
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
            {automation.amount} {automation.token.symbol}
          </Text>

          <Image
            src={automation.token.icon}
            alt={`${automation.token.symbol} icon`}
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </div>
      </td>

      <td>
        <Text className="text-sm text-zinc-500 dark:text-zinc-400">
          {automation.triggerTitle}
        </Text>
      </td>

      <td className="w-[9rem]">
        <Text
          asChild
          className="flex items-center gap-1 text-sm font-medium text-cyan-500 transition-colors hover:text-cyan-600 md:text-sm"
        >
          <Link
            href={`https://automation.chain.link/${chainlinkNetworkLink}/${automation.id}`}
            target="_blank"
          >
            view on chainlink
            <ArrowRight className="w-4 h-4 text-cyan-500" />
          </Link>
        </Text>
      </td>

      <td className="py-3 pr-1">
        <div className="flex items-center justify-end">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button
                aria-label="Payments automations management options"
                className="p-1 rounded-sm transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
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
                onSelect={() => handleDeleteAutomation(automation)}
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

AutomationsTableTr.displayName = 'AutomationsTableTr.Tr'

export const AutomationsTable = {
  Th: AutomationsTableTh,
  Tr: AutomationsTableTr
}
