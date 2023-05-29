import {
  CirclesThree,
  House,
  PaperPlaneTilt,
  Gear,
  ArrowsCounterClockwise,
  Users,
  ClockCountdown,
  Dna
} from '@phosphor-icons/react'

import { NavLink } from './NavLink'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { SidebarNavGroup } from '@components/Sidebar/SidebarNavGroup'

import { useSafe } from '@contexts/SafeContext'

const NAV_LINKS_SUB_GENERAL = [
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
  }
]

const NAV_LINKS_SUB_MANAGE = [
  {
    href: 'send',
    activePath: 'send',
    icon: PaperPlaneTilt,
    title: 'Send',
    isDisabled: false
  },
  {
    href: 'contacts',
    activePath: 'contacts',
    icon: Users,
    title: 'Contacts',
    isDisabled: false
  },
  {
    href: 'spending-limits',
    activePath: 'spending-limits',
    icon: ClockCountdown,
    title: 'Spending Limits',
    isDisabled: false
  },
  {
    href: 'recurring-payments',
    activePath: 'recurring-payments',
    icon: Dna,
    title: 'Recurring Payments',
    isDisabled: false
  }
]

const NAV_LINKS_SUB_SETTINGS = [
  {
    href: 'settings',
    activePath: 'settings',
    icon: Gear,
    title: 'Settings',
    isDisabled: false
  }
]

export function SidebarNav() {
  const { safe } = useSafe()

  return (
    <div className="flex flex-1 pr-2 overflow-hidden overflow-y-auto bg-zinc-50 dark:bg-zinc-950 md:max-lg:pr-0 lg:pr-4">
      <div className="flex flex-1 flex-col items-stretch justify-start md:w-[14rem] md:max-lg:w-[5rem] md:max-lg:px-1 lg:p-3">
        <SidebarNavGroup.Root>
          {NAV_LINKS_SUB_GENERAL.map(navLink => (
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
        </SidebarNavGroup.Root>

        <SidebarNavGroup.Root className="pt-3 mt-3 border-t-1 border-zinc-700">
          <SidebarNavGroup.Title>Manage funds</SidebarNavGroup.Title>

          {NAV_LINKS_SUB_MANAGE.map(navLink => (
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
        </SidebarNavGroup.Root>

        <SidebarNavGroup.Root className="pt-3 mt-3 border-t-1 border-zinc-700">
          {NAV_LINKS_SUB_SETTINGS.map(navLink => (
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
        </SidebarNavGroup.Root>
      </div>
    </div>
  )
}
