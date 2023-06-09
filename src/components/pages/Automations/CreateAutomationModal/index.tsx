import { DialogModal } from '@components/Dialogs/DialogModal'
import { Tabs } from '@components/Tabs'
import { TimeBasedAutomationForm } from './TimeBasedAutomationForm'
import { CustomLogicAutomationForm } from './CustomLogicAutomationForm'

import { useAutomationsHook } from '@hooks/automations/useAutomationsHook'

export function CreateAutomationModal() {
  const {
    isSubmitting,
    reset,
    isCreateAutomationOpen,
    setIsCreateAutomationOpen
  } = useAutomationsHook()

  return (
    <DialogModal.Root
      open={isCreateAutomationOpen}
      onOpenChange={isOpen => {
        if (isSubmitting) return

        setIsCreateAutomationOpen(isOpen)
        reset()
      }}
    >
      <DialogModal.Content className="md:max-w-[36rem]">
        <DialogModal.Header className="gap-3">
          <DialogModal.Title className="text-3xl">
            Create automation
          </DialogModal.Title>

          <DialogModal.Description className="text-lg text-center">
            Automate your safe wallet payments
          </DialogModal.Description>
        </DialogModal.Header>

        <Tabs.Root defaultValue="time-based">
          <Tabs.List
            aria-label="Create smart safe automation"
            className="w-full min-h-[2.75rem] text-center text-sm"
          >
            <Tabs.Trigger value="time-based" className="max-w-[8rem]">
              Time based
            </Tabs.Trigger>

            <Tabs.Trigger value="custom-logic" className="max-w-[8rem]">
              Custom logic
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="time-based">
            <TimeBasedAutomationForm />
          </Tabs.Content>

          <Tabs.Content value="custom-logic">
            <CustomLogicAutomationForm />
          </Tabs.Content>
        </Tabs.Root>

        <DialogModal.IconClose />
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
