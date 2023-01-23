import { ReactNode } from 'react'

import { Header } from '@components/Header'
import { Sidebar } from '@components/Sidebar'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { SidebarDrawer } from '@components/Sidebar/SidebarDrawer'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DialogDrawer.Root>
      <Header />

      <div className="w-full max-w-full flex flex-1 pt-16 md:pt-20">
        <Sidebar />

        <main className="w-full h-full max-w-[calc(1700px_-_1rem)] flex flex-col pb-3 px-2">
          {children}
        </main>
      </div>

      <SidebarDrawer />
    </DialogDrawer.Root>
  )
}
