import { CirclesThree, House } from 'phosphor-react'

import { NavLink } from './NavLink'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'

const NAV_LINKS = [
  {
    href: 'home',
    icon: House,
    title: 'Home',
    isDisabled: false
  },
  {
    href: 'assets',
    icon: CirclesThree,
    title: 'Assets',
    isDisabled: false
  }
]

export function SidebarNav() {
  return (
    <div className="flex flex-1 pr-2 overflow-hidden overflow-y-auto bg-zinc-50 dark:bg-zinc-950 md:w-[15rem] md:max-lg:w-[4.5rem] md:max-lg:pr-0 lg:pr-4">
      <div className="flex flex-1 flex-col items-stretch justify-start md:max-lg:px-1 lg:p-3">
        {NAV_LINKS.map(navLink => (
          <DialogDrawer.Close key={navLink.title}>
            <NavLink
              href={navLink.href}
              Icon={navLink.icon}
              isDisabled={navLink.isDisabled}
            >
              {navLink.title}
            </NavLink>
          </DialogDrawer.Close>
        ))}
      </div>
    </div>
  )
}
