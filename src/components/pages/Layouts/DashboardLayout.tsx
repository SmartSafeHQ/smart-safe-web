import { ReactNode } from 'react'

import { Header } from '@components/Header'
import { Sidebar } from '@components/Sidebar'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { SidebarDrawer } from '@components/Sidebar/SidebarDrawer'
import { TokenverseWidget } from '@components/TokenverseWidget'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DialogDrawer.Root>
      <Header />

      <TokenverseWidget />

      <div className="w-full max-w-full flex flex-1 pt-16 md:pt-16">
        <Sidebar />

        <main className="w-full max-w-full flex flex-col pb-3 px-2 md:max-w-[calc(100vw_-_7.25rem)] lg:max-w-[calc(100vw_-_18rem)]">
          {children}
        </main>
      </div>

      <SidebarDrawer />
    </DialogDrawer.Root>
  )
}
