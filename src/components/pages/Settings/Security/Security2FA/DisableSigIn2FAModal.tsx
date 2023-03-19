import { WarningCircle } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { TextInput } from '@components/Inputs/TextInput'
import { Text } from '@components/Text'

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
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Security2FAFieldValues>({
    resolver: zodResolver(security2FAvalidationSchema)
  })

  return (
    <DialogModal.Content
      className="md:max-w-[36rem]"
      onCloseAutoFocus={() => reset()}
    >
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
          onSubmit={handleSubmit(onSubmit)}
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
                {...register('code')}
                required
                type="number"
                min={0}
                id="code"
                placeholder={t.settings.security.modalInputPlaceholder}
              />
            </TextInput.Content>
          </TextInput.Root>

          <div className="w-full flex items-start gap-2 text-gray-800 dark:text-gray-50">
            <WarningCircle className="w-8 h-8 text-red-500" />

            <Text className="text-sm">{t.settings.security.mDisableInfo}</Text>
          </div>

          <div className="w-full flex items-center gap-4 mt-2">
            <DialogModal.Close>
              <Button className="bg-transparent text-gray-600 dark:text-gray-100 border-2 border-gray-500 hover:brightness-90 hover:bg-transparent">
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
