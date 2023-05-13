import { List } from '@phosphor-icons/react'
import Link from 'next/link'

import { SmartSafeTextLogo } from '@components/Logos/SmartSafeTextLogo'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { SidebarNav } from './SidebarNav'

export function SidebarDrawer() {
  return (
    <DialogDrawer.Content className="max-w-[15rem]">
      <div className="w-full flex items-center gap-4 pl-6">
        <DialogDrawer.Trigger>
          <button aria-label="Sidebar menu mobile">
            <List className="w-6 h-6" weight="regular" />
          </button>
        </DialogDrawer.Trigger>

        <Link href="/">
          <SmartSafeTextLogo className="w-32 h-14" />
        </Link>
      </div>

      <aside className="flex items-stretch justify-start p-3">
        <SidebarNav />
      </aside>
    </DialogDrawer.Content>
  )
}
