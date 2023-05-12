import { ReactNode } from 'react'

import { Sidebar } from '@components/Sidebar'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { SidebarDrawer } from '@components/Sidebar/SidebarDrawer'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DialogDrawer.Root>
      <div className="w-full max-w-full flex flex-1 lg:gap-5">
        <Sidebar />

        <main className="flex flex-1 flex-col">{children}</main>
      </div>

      <SidebarDrawer />
    </DialogDrawer.Root>
  )
}
