import { SidebarNav } from './SidebarNav'

export function Sidebar() {
  return (
    <aside className="fixed top-14 left-0 hidden items-stretch justify-start md:flex">
      <SidebarNav />
    </aside>
  )
}
