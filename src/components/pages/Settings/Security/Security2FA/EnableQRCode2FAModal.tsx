import { QRCodeCanvas } from 'qrcode.react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { TextInput } from '@components/Inputs/TextInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { Text } from '@components/Text'

import {
  Security2FAFieldValues,
  security2FAvalidationSchema
} from '@hooks/settings/useSettingsSecurity/useSettingsSecurity2FA'
import { useI18n } from '@hooks/useI18n'
import { LINK_2FA_INFO } from '@utils/sessionsUtils'

interface EnableQRCode2FAModalProps {
  authCode?: string
  onSubmit: SubmitHandler<{
    code: string
  }>
}

export function EnableQRCode2FAModal({
  authCode,
  onSubmit
}: EnableQRCode2FAModalProps) {
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
      className="md:max-w-[42rem]"
      onCloseAutoFocus={() => reset()}
    >
      <header className="text-left w-full flex items-start flex-col gap-3 mb-6 pt-2 px-2">
        <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
          {t.settings.security.mEnableTitle}
        </DialogModal.Title>

        <DialogModal.Description className="text-gray-700 dark:text-gray-300">
          {t.settings.security.mEnableDesc}

          <Text
            asChild
            className="mx-1 text-cyan-500 font-medium transition-color hover:text-cyan-600"
          >
            <Link
              href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&pli=1"
              target="_blank"
            >
              Google authenticator
            </Link>
          </Text>

          {t.settings.security.or}

          <Text
            asChild
            className="ml-1 text-cyan-500 font-medium transition-color hover:text-cyan-600"
          >
            <Link
              href="https://play.google.com/store/apps/details?id=com.azure.authenticator"
              target="_blank"
            >
              Micosoft authenticator.
            </Link>
          </Text>
        </DialogModal.Description>

        <Text
          asChild
          className="text-sm text-cyan-500 underline font-medium transition-color hover:text-cyan-600 md:flex-col"
        >
          <Link href={LINK_2FA_INFO} target="_blank">
            {t.settings.security.authAppInfoLink}
          </Link>
        </Text>
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
          <Text className="text-sm text-gray-600 dark:text-gray-300">
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
