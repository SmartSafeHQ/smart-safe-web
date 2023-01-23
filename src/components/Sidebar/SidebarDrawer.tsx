import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { SidebarNav } from './SidebarNav'

export function SidebarDrawer() {
  return (
    <DialogDrawer.Content size="xs">
      <DialogDrawer.Title className="text-2xl font-semibold text-gray-50">
        Navigation
      </DialogDrawer.Title>

      <SidebarNav />

      <DialogDrawer.IconClose />
    </DialogDrawer.Content>
  )
}
