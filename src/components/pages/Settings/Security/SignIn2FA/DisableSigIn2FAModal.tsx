import { WarningCircle } from 'phosphor-react'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { Verify2FAModal } from '@components/pages/Layouts/Verify2FAModal'
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
    <Verify2FAModal.Root
      title={t.settings.security.mDisableTitle}
      description={t.settings.security.mDisableDesc}
    >
      <Verify2FAModal.Content
        inputLabel={t.settings.security.modalInputLabel}
        inputPlaceholder={t.settings.security.modalInputPlaceholder}
        onSubmit={disableHandleSubmit(disableOnSubmit)}
        register={disableRegister}
        error={errors.code?.message}
      >
        <Verify2FAModal.Info
          Icon={WarningCircle}
          info={t.settings.security.mDisableInfo}
          iconClassName="w-8 h-8 text-red-500"
        />

        <Verify2FAModal.Footer>
          <DialogModal.Close>
            <Button className="bg-transparent text-gray-100 border-2 border-gray-500 hover:brightness-90 hover:bg-transparent">
              {t.settings.security.cancel}
            </Button>
          </DialogModal.Close>

          <Button type="submit" isLoading={isSubmitting} variant="red">
            {t.settings.security.disable2FA}
          </Button>
        </Verify2FAModal.Footer>
      </Verify2FAModal.Content>

      <DialogModal.IconClose />
    </Verify2FAModal.Root>
  )
}
