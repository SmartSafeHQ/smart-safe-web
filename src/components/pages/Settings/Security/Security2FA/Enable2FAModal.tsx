import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DeviceMobileCamera, LockSimple, Question } from 'phosphor-react'
import Link from 'next/link'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { TextInput } from '@components/Inputs/TextInput'
import { Text } from '@components/Text'
import { HoverCard } from '@components/HoverCard'

import {
  Security2FAFieldValues,
  security2FAvalidationSchema
} from '@hooks/settings/useSettingsSecurity/useSettingsSecurity2FA'
import { useI18n } from '@hooks/useI18n'
import { LINK_2FA_INFO } from '@utils/sessionsUtils'

interface Enable2FAModalProps {
  onSubmit: SubmitHandler<{
    code: string
  }>
}

export function Enable2FAModal({ onSubmit }: Enable2FAModalProps) {
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
      className="md:max-w-[30rem]"
      onCloseAutoFocus={() => reset()}
    >
      <header className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
        <LockSimple className="w-5 h-5" weight="bold" />

        <DialogModal.Title className="font-semibold">
          {t.settings.security.enableAuthVerify}
        </DialogModal.Title>
      </header>

      <div className="text-center w-full flex items-center flex-col gap-3 mb-6 pt-10">
        <DeviceMobileCamera className="w-10 h-10 text-gray-600 dark:text-gray-400" />

        <div className="flex items-center gap-4">
          <DialogModal.Title className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {t.settings.security.authCode}
          </DialogModal.Title>

          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <Link href={LINK_2FA_INFO} target="_blank">
                <Question className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </Link>
            </HoverCard.Trigger>

            <HoverCard.Content className="text-sm">
              {t.settings.security.knowMore}
              <HoverCard.Arrow />
            </HoverCard.Content>
          </HoverCard.Root>
        </div>
      </div>

      <section className="w-full flex flex-col gap-6 items-stretch">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 items-stretch w-full"
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
                placeholder={t.settings.security.modalAppPlaceholder}
              />
            </TextInput.Content>
          </TextInput.Root>

          <Button type="submit" isLoading={isSubmitting}>
            {t.settings.security.verify}
          </Button>
        </form>

        <Text className="text-sm text-gray-900 dark:text-gray-200">
          {t.settings.security.confirmDesc}
        </Text>
      </section>

      <DialogModal.IconClose />
    </DialogModal.Content>
  )
}
