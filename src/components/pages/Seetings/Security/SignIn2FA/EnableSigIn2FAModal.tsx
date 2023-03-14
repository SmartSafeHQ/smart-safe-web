import { QRCodeCanvas } from 'qrcode.react'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { TextInput } from '@components/Inputs/TextInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { Text } from '@components/Text'

import { useSecuritySignIn2FA } from '@hooks/settings/useSettingsSecurity/useSecuritySignIn2FA'

interface EnableSigIn2FAModalProps {
  authCode: string
  setIsOpen: (_isOpen: boolean) => void
}

export function EnableSigIn2FAModal({
  authCode,
  setIsOpen
}: EnableSigIn2FAModalProps) {
  const {
    t,
    enableFormState: { errors, isSubmitting },
    enableHandleSubmit,
    enableOnSubmit,
    enableRegister
  } = useSecuritySignIn2FA(setIsOpen)

  return (
    <DialogModal.Content className="md:max-w-[36rem]">
      <header className="text-left w-full flex items-start flex-col gap-3 mb-6 pt-6 px-2">
        <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
          {t.settings.security.mEnableTitle}
        </DialogModal.Title>

        <DialogModal.Description className="text-gray-700 dark:text-gray-300">
          {t.settings.security.mEnableDesc}
        </DialogModal.Description>
      </header>

      <section className="w-full flex flex-col gap-4 items-stretch">
        <div className="w-full flex flex-col gap-4 items-center justify-center mb-4 rounded-md">
          <Skeleton isLoading={!authCode} className="w-60 h-60">
            <QRCodeCanvas value={authCode} size={240} />
          </Skeleton>
        </div>

        <form
          onSubmit={enableHandleSubmit(enableOnSubmit)}
          className="flex flex-col gap-4 items-stretch w-full"
        >
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            <p>{t.settings.security.mEnableInfo}</p>
          </Text>

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
                {...enableRegister('code')}
                required
                type="number"
                min={0}
                id="code"
                placeholder={t.settings.security.modalInputPlaceholder}
              />
            </TextInput.Content>
          </TextInput.Root>

          <Button type="submit" isLoading={isSubmitting} className="mt-2">
            {t.settings.security.enable}
          </Button>
        </form>
      </section>

      <DialogModal.IconClose />
    </DialogModal.Content>
  )
}
