import { WarningCircle } from 'phosphor-react'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { TextInput } from '@components/Inputs/TextInput'
import { Text } from '@components/Text'

import { useSecuritySignIn2FA } from '@hooks/settings/useSettingsSecurity/useSecuritySignIn2FA'

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
  } = useSecuritySignIn2FA(setIsOpen)

  return (
    <DialogModal.Content className="md:max-w-[36rem]">
      <header className="text-left w-full flex items-start flex-col gap-3 mb-9 pt-6">
        <DialogModal.Title className="text-2xl font-bold text-gray-800 dark:text-gray-50">
          {t.settings.security.mDisableTitle}
        </DialogModal.Title>

        <DialogModal.Description className="text-gray-700 dark:text-gray-300">
          {t.settings.security.mDisableDesc}
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
              {t.settings.security.modalInputLabel}
            </TextInput.Label>

            <TextInput.Content>
              <TextInput.Input
                {...disableRegister('code')}
                required
                type="number"
                min={0}
                id="code"
                placeholder={t.settings.security.modalInputPlaceholder}
              />
            </TextInput.Content>
          </TextInput.Root>

          <div className="w-full flex items-start gap-2">
            <WarningCircle className="w-8 h-8 text-red-500" />

            <Text className="text-sm text-gray-600 dark:text-gray-300">
              {t.settings.security.mDisableInfo}
            </Text>
          </div>

          <div className="w-full flex items-center gap-4 mt-2">
            <DialogModal.Close>
              <Button className="bg-transparent border-2 border-gray-500 hover:bg-gray-500">
                {t.settings.security.cancel}
              </Button>
            </DialogModal.Close>

            <Button type="submit" isLoading={isSubmitting} variant="red">
              {t.settings.security.disable2FA}
            </Button>
          </div>
        </form>
      </section>

      <DialogModal.IconClose />
    </DialogModal.Content>
  )
}
