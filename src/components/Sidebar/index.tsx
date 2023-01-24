import { SidebarNav } from './SidebarNav'

export function Sidebar() {
  return (
    <aside className="w-72 pt-10 pb-4 pl-6 hidden md:flex md:w-24 md:pl-4 lg:w-72 lg:pl-6">
      <SidebarNav />
    </aside>
  )
}
