import { ArrowSquareOut, Chats } from 'phosphor-react'
import Link from 'next/link'

import { NavLink } from './NavLink'
import { SIDEBAR_NAV_LINKS } from '@utils/sidebarDrawerUtils'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { Text } from '@components/Text'

import {
  TOKENVERSE_CONTACT_LINK,
  TOKENVERSE_TERMS_OF_SERVICES_LINK
} from '@utils/global/constants/links'

export function SidebarNav() {
  return (
    <div className="w-full h-full max-h-[82vh] flex flex-col items-start justify-start gap-6 md:sticky top-28 left-0 bottom-0 self-start">
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

      <footer className="flex flex-col gap-6 mt-auto">
        <Text
          asChild
          className="w-full flex flex-row items-center gap-5 text-lg capitalize text-gray-700 dark:text-gray-400 font-medium transition-all hover:brightness-75 md:flex-col md:gap-1 md:text-xs lg:flex-row lg:gap-5 lg:text-base"
        >
          <Link href={TOKENVERSE_CONTACT_LINK} target="_blank">
            <Chats className="w-6 h-6" weight="bold" />

            <Text>contact</Text>
          </Link>
        </Text>

        <Text
          asChild
          className="w-full flex flex-row items-center gap-3 text-base text-center text-gray-700 dark:text-gray-400 font-semibold transition-all hover:text-cyan-500 md:flex-col md:gap-1 md:text-xs lg:flex-row lg:gap-3 lg:text-base"
        >
          <Link href={TOKENVERSE_TERMS_OF_SERVICES_LINK} target="_blank">
            <Text>Terms of service</Text>

            <ArrowSquareOut
              className="w-4 h-4 md:hidden lg:inline"
              weight="bold"
            />
          </Link>
        </Text>
      </footer>
    </div>
  )
}
