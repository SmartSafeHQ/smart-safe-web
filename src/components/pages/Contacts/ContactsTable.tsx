import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode, ThHTMLAttributes } from 'react'
import { ArrowSquareOut, Copy, DotsThreeVertical } from '@phosphor-icons/react'

import { Text } from '@components/Text'
import { HoverCard } from '@components/HoverCard'
import { DropdownMenu } from '@components/DropdownMenu'

import { ContactProps } from '@contexts/ContactsContext'
import { handleCopyToClipboard } from '@utils/clipboard'

interface ContactsTableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
}

function ContactsTableTh({ children, className }: ContactsTableThProps) {
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

ContactsTableTh.displayName = 'ContactsTable.Th'

interface ContactsTableTrProps {
  contact: {
    contactId: number
    contactName: string
    contactAddress: string
    formattedAddress: string
  }
  handleEditContact: (_contact: ContactProps) => void
  handleDeleteContact: (_contact: ContactProps) => void
}

function ContactsTableTr({
  contact,
  handleEditContact,
  handleDeleteContact
}: ContactsTableTrProps) {
  return (
    <tr className="[&>*]:min-w-[7rem] font-medium border-b-1 border-zinc-300 dark:border-zinc-700">
      <td className="pl-2 py-3">
        <Text className="font-medium md:text-base">{contact.contactName}</Text>
      </td>

      <td>
        <div className="flex items-center gap-6 text-zinc-600 dark:text-zinc-400">
          <Text>{contact.formattedAddress}</Text>

          <div className="flex items-center gap-2">
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <button
                  onClick={() => handleCopyToClipboard(contact.contactAddress)}
                >
                  <Copy className="w-5 h-5" />
                </button>
              </HoverCard.Trigger>

              <HoverCard.Content className="text-sm">
                copy address
                <HoverCard.Arrow />
              </HoverCard.Content>
            </HoverCard.Root>

            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <Link
                  href={`https://etherscan.io/address/${contact.contactAddress}`}
                  target="_blank"
                >
                  <ArrowSquareOut className="w-5 h-5" />
                </Link>
              </HoverCard.Trigger>

              <HoverCard.Content className="text-sm">
                see on explore
                <HoverCard.Arrow />
              </HoverCard.Content>
            </HoverCard.Root>
          </div>
        </div>
      </td>

      <td className="py-3 pr-1 flex items-center justify-end">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button
              aria-label="Manage contacts option"
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
              onSelect={() => handleEditContact(contact)}
              className="px-3 py-2 rounded-md text-sm"
            >
              edit
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onSelect={() => handleDeleteContact(contact)}
              className="px-3 py-2 rounded-md text-sm"
            >
              <Text className="text-sm text-red-500">delete</Text>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </td>
    </tr>
  )
}

ContactsTableTr.displayName = 'ContactsTable.Tr'

export const ContactsTable = {
  Th: ContactsTableTh,
  Tr: ContactsTableTr
}
