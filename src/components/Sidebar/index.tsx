import { SidebarNav } from './SidebarNav'

export function Sidebar() {
  return (
    <aside className="hidden items-stretch justify-start md:flex">
      <SidebarNav />
    </aside>
  )
}
