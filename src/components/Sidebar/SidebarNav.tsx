import { Brain, House } from 'phosphor-react'

import { NavLink } from './NavLink'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'

const NAV_LINKS = [
  {
    href: '/dashboard/home',
    icon: House,
    title: 'home',
    isDisabled: false
  },
  {
    href: '/dashboard/smart-account/contacts',
    icon: Brain,
    title: 'smart account',
    isDisabled: false
  }
]

export function SidebarNav() {
  return (
    <div className="w-full h-full max-h-[82vh] flex flex-col items-start justify-start gap-6 md:sticky top-28 left-0 bottom-0 self-start">
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
  )
}
