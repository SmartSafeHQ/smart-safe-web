import { SidebarNav } from './SidebarNav'

export function Sidebar() {
  return (
    <aside className="w-72 pb-4 px-3 hidden bg-white dark:bg-transparent md:flex md:w-24 md:pl-4 lg:w-72 lg:pl-6">
      <SidebarNav />
    </aside>
  )
}
