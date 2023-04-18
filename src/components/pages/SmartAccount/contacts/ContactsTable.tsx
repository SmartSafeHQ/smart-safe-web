import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode, ThHTMLAttributes } from 'react'
import { ArrowSquareOut, Copy, DotsThreeVertical } from 'phosphor-react'

import { Text } from '@components/Text'
import { HoverCard } from '@components/HoverCard'
import { DropdownMenu } from '@components/DropdownMenu'

import { ContactProps } from '@contexts/SAContactsContext'
import { useI18n } from '@hooks/useI18n'
import { handleCopyToClipboard } from '@utils/global'

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
  contact: ContactProps
  handleEditContact: (_contact: ContactProps) => void
  handleDeleteContact: (_contact: ContactProps) => void
}

function ContactsTableTr({
  contact,
  handleEditContact,
  handleDeleteContact
}: ContactsTableTrProps) {
  const { t } = useI18n()

  return (
    <tr className="[&>*]:min-w-[7rem] font-medium border-b-1 border-gray-300 dark:border-gray-700">
      <td className="pl-2 py-3">
        <Text className="font-medium md:text-base">{contact.name}</Text>
      </td>

      <td>
        <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
          <Text>{contact.wallet.formattedAddress}</Text>

          <div className="flex items-center gap-2">
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <button
                  onClick={() => handleCopyToClipboard(contact.wallet.address)}
                >
                  <Copy className="w-5 h-5" />
                </button>
              </HoverCard.Trigger>

              <HoverCard.Content className="text-sm">
                {t.saContacts.copyAddr}
                <HoverCard.Arrow />
              </HoverCard.Content>
            </HoverCard.Root>

            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <Link
                  href={`https://goerli.etherscan.io/${contact.wallet.address}`}
                  target="_blank"
                >
                  <ArrowSquareOut className="w-5 h-5" />
                </Link>
              </HoverCard.Trigger>

              <HoverCard.Content className="text-sm">
                {t.saContacts.seeExplorer}
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
              aria-label={t.saContacts.menuAriaLabel}
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
              onSelect={() => handleEditContact(contact)}
              className="px-3 py-2 rounded-md text-sm"
            >
              {t.saContacts.edit}
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onSelect={() => handleDeleteContact(contact)}
              className="px-3 py-2 rounded-md text-sm"
            >
              <Text className="text-sm text-red-500">
                {t.saContacts.delete}
              </Text>
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
