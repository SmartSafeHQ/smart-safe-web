import { WarningCircle } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { Verify2FAModal } from '@components/pages/Layouts/Verify2FAModal'

import { useI18n } from '@hooks/useI18n'
import {
  Security2FAFieldValues,
  security2FAvalidationSchema
} from '@hooks/settings/useSettingsSecurity/useSecuritySignIn2FA'

interface DisableSigIn2FAModalProps {
  onSubmit: SubmitHandler<{
    code: string
  }>
}

export function DisableSigIn2FAModal({ onSubmit }: DisableSigIn2FAModalProps) {
  const { t } = useI18n()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Security2FAFieldValues>({
    resolver: zodResolver(security2FAvalidationSchema)
  })

  return (
    <Verify2FAModal.Root
      title={t.settings.security.mDisableTitle}
      description={t.settings.security.mDisableDesc}
    >
      <Verify2FAModal.Content
        inputLabel={t.settings.security.modalInputLabel}
        inputPlaceholder={t.settings.security.modalInputPlaceholder}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
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
