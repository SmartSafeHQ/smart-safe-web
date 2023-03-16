import { QRCodeCanvas } from 'qrcode.react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { TextInput } from '@components/Inputs/TextInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { Text } from '@components/Text'

import {
  Security2FAFieldValues,
  security2FAvalidationSchema
} from '@hooks/settings/useSettingsSecurity/useSecuritySignIn2FA'
import { useI18n } from '@hooks/useI18n'

interface EnableSigIn2FAModalProps {
  authCode?: string
  onSubmit: SubmitHandler<{
    code: string
  }>
}

export function Enable2FAModal({
  authCode,
  onSubmit
}: EnableSigIn2FAModalProps) {
  const { t } = useI18n()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Security2FAFieldValues>({
    resolver: zodResolver(security2FAvalidationSchema)
  })

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
            <QRCodeCanvas value={authCode ?? ''} size={240} />
          </Skeleton>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
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
                {...register('code')}
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
