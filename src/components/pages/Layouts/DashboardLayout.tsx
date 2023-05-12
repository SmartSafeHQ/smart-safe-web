import { ReactNode } from 'react'

import { Sidebar } from '@components/Sidebar'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { SidebarDrawer } from '@components/Sidebar/SidebarDrawer'
import { Header } from '@components/Header'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DialogDrawer.Root>
      <Header />

      <div className="w-full max-w-full flex flex-1 lg:gap-5">
        <Sidebar />

        <main className="flex flex-1 flex-col ml-0 md:ml-60 md:max-lg:ml-[4.5rem] mt-14">
          {children}
        </main>
      </div>

      <SidebarDrawer />
    </DialogDrawer.Root>
  )
}
