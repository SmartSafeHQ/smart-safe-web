import { List } from '@phosphor-icons/react'
import Link from 'next/link'

import { SmartSafeIconLogo } from '@components/Logos/SmartSafeIconLogo'
import { SmartSafeTextLogo } from '@components/Logos/SmartSafeTextLogo'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { AddressSafesList } from '@components/Header/AddressSafesList'
import { ProfileDropdown } from '@components/Header/ProfileDropdown'

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full px-4 z-10 bg-zinc-50 dark:bg-zinc-950 md:px-7">
      <div className="w-full h-full max-w-8xl flex justify-between items-center">
        <div className="w-full flex items-center gap-4 h-min">
          <div className="flex items-center gap-4 h-min mr-2">
            <DialogDrawer.Trigger>
              <button
                aria-label="Sidebar menu mobile"
                className="flex md:hidden"
              >
                <List className="w-6 h-6" weight="regular" />
              </button>
            </DialogDrawer.Trigger>

            <Link href="/">
              <SmartSafeTextLogo className="w-32 h-14 hidden sm:block" />
              <SmartSafeIconLogo className="w-7 h-14 block sm:hidden" />
            </Link>
          </div>

          <AddressSafesList />
        </div>

        <ProfileDropdown />
      </div>
    </header>
  )
}
