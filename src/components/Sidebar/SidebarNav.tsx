import { NavLink } from './NavLink'
import { SIDEBAR_NAV_LINKS } from '@utils/sidebarDrawerUtils'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'

export function SidebarNav() {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-1">
      {SIDEBAR_NAV_LINKS.map(navLink => (
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
