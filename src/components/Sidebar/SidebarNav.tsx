import {
  CirclesThree,
  House,
  PaperPlaneTilt,
  Gear,
  ArrowsCounterClockwise,
  Users,
  Dna
} from '@phosphor-icons/react'

import { NavLink } from './NavLink'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { SidebarNavGroup } from '@components/Sidebar/SidebarNavGroup'
import { ScrollArea } from '@components/ScrollArea'

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

const NAV_LINKS_SUB_AUTOMATIONS = [
  {
    href: 'automations',
    activePath: 'automations',
    icon: Dna,
    title: 'automations',
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
    <div className="flex flex-1 bg-zinc-50 dark:bg-zinc-950">
      <div className="flex flex-1 flex-col items-stretch justify-start md:w-[15rem] md:max-lg:w-[7rem] md:max-lg:px-1 lg:p-3">
        <ScrollArea className="pr-3 max-h-[calc(100vh-86px)]">
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
        </ScrollArea>

        <SidebarNavGroup.Root className="pt-3 mt-3 border-t-1 border-zinc-700">
          <SidebarNavGroup.Title>Automations</SidebarNavGroup.Title>

          {NAV_LINKS_SUB_AUTOMATIONS.map(navLink => (
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
