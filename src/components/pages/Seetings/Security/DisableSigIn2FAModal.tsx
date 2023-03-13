import { WarningCircle } from 'phosphor-react'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { TextInput } from '@components/Inputs/TextInput'
import { Text } from '@components/Text'

import { useSettingsSecurity } from '@hooks/settings/useSettingsSecurity/useSettingsSecurity'

interface DisableSigIn2FAModalProps {
  setIsOpen: (_isOpen: boolean) => void
}

export function DisableSigIn2FAModal({ setIsOpen }: DisableSigIn2FAModalProps) {
  const {
    t,
    disableFormState: { errors, isSubmitting },
    disableHandleSubmit,
    disableOnSubmit,
    disableRegister
  } = useSettingsSecurity(setIsOpen)

  return (
    <DialogModal.Content className="md:max-w-[36rem]">
      <header className="text-left w-full flex items-start flex-col gap-3 mb-9 pt-6">
        <DialogModal.Title className="text-2xl font-bold text-gray-800 dark:text-gray-50">
          Disable two factory authentication
        </DialogModal.Title>

        <DialogModal.Description className="text-gray-700 dark:text-gray-300">
          It&apos;s strongly recommended to keep 2FA enabled.
        </DialogModal.Description>
      </header>

      <section className="w-full flex flex-col gap-4 items-stretch">
        <form
          onSubmit={disableHandleSubmit(disableOnSubmit)}
          className="flex flex-col gap-4 items-stretch w-full"
        >
          <TextInput.Root
            htmlFor="code"
            error={errors.code?.message}
            variant="secondary"
          >
            <TextInput.Label className="text-gray-800 dark:text-gray-50">
              Enter the six-digits code from the application
            </TextInput.Label>

            <TextInput.Content>
              <TextInput.Input
                {...disableRegister('code')}
                required
                type="number"
                min={0}
                id="code"
                placeholder={t.settings.SecurityTab.modalInputPlaceholder}
              />
            </TextInput.Content>
          </TextInput.Root>

          <div className="w-full flex items-start gap-2">
            <WarningCircle className="w-8 h-8 text-red-500" />

            <Text className="text-sm text-gray-600 dark:text-gray-300">
              Disabling 2FA will make your account less secure and increase the
              risk of unauthorized access.
            </Text>
          </div>

          <div className="w-full flex items-center gap-4 mt-2">
            <DialogModal.Close>
              <Button className="bg-transparent border-2 border-gray-500 hover:bg-gray-500">
                Cancel
              </Button>
            </DialogModal.Close>

            <Button type="submit" isLoading={isSubmitting} variant="red">
              Disable 2FA
            </Button>
          </div>
        </form>
      </section>

      <DialogModal.IconClose />
    </DialogModal.Content>
  )
}
