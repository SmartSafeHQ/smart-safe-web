import {
  CirclesThree,
  House,
  PaperPlaneTilt,
  AddressBook,
  UsersThree,
  Gear,
  ArrowsCounterClockwise,
  ArrowClockwise
} from '@phosphor-icons/react'

import { NavLink } from './NavLink'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'

import { useSafe } from '@contexts/SafeContext'

const NAV_LINKS = [
  {
    href: '',
    activePath: undefined,
    icon: House,
    title: 'Home',
    isDisabled: false
  },
  {
    href: 'assets',
    activePath: 'assets',
    icon: CirclesThree,
    title: 'Assets',
    isDisabled: false
  },
  {
    href: 'transactions/queue',
    activePath: 'transactions',
    icon: ArrowsCounterClockwise,
    title: 'Transactions',
    isDisabled: false
  },
  {
    href: 'send',
    activePath: 'send',
    icon: PaperPlaneTilt,
    title: 'Send',
    isDisabled: false
  },
  {
    href: 'smart-account/contacts',
    activePath: 'smart-account/contacts',
    icon: AddressBook,
    title: 'Address Book',
    isDisabled: false
  },
  {
    href: 'smart-account/spending-limits',
    activePath: 'smart-account/spending-limits',
    icon: UsersThree,
    title: 'Spending Limits',
    isDisabled: false
  },
  {
    href: 'smart-account/recurring-payments',
    activePath: 'smart-account/recurring-payments',
    icon: ArrowClockwise,
    title: 'Recurring Payments',
    isDisabled: false
  },
  {
    href: 'smart-account/settings',
    activePath: 'smart-account/settings',
    icon: Gear,
    title: 'Settings',
    isDisabled: false
  }
]

export function SidebarNav() {
  const { safe } = useSafe()

  return (
    <div className="flex flex-1 pr-2 overflow-hidden overflow-y-auto bg-zinc-50 dark:bg-zinc-950 md:max-lg:pr-0 lg:pr-4">
      <div className="flex flex-1 flex-col items-stretch justify-start md:w-[15rem] md:max-lg:w-[5rem] md:max-lg:px-1 lg:p-3">
        {NAV_LINKS.map(navLink => (
          <DialogDrawer.Close key={navLink.title}>
            <NavLink
              href={navLink.href}
              Icon={navLink.icon}
              isDisabled={navLink.isDisabled}
              basePath={`/dashboard/${safe?.address}`}
              activePath={navLink.activePath}
            >
              {navLink.title}
            </NavLink>
          </DialogDrawer.Close>
        ))}
      </div>
    </div>
  )
}
