import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { SidebarNav } from './SidebarNav'

import { useI18n } from '@hooks/useI18n'

export function SidebarDrawer() {
  const { t } = useI18n()

  return (
    <DialogDrawer.Content size="xs">
      <DialogDrawer.Title className="text-2xl font-semibold dark:text-gray-50">
        {t.sidebar.navigation}
      </DialogDrawer.Title>

      <SidebarNav />

      <DialogDrawer.IconClose />
    </DialogDrawer.Content>
  )
}
