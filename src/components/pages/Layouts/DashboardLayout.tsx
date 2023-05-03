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
      <div className="w-full max-w-full flex flex-1 pt-16 md:pt-16">
        <Sidebar />

        <main className="w-full max-w-full flex flex-col pb-3 md:max-w-[calc(100vw_-_7.25rem)] lg:max-w-[calc(100vw_-_18rem)]">
          {children}
        </main>
      </div>

      <SidebarDrawer />
    </DialogDrawer.Root>
  )
}
