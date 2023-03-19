import { DeviceMobileCamera, Question, LockSimple } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Auth } from 'aws-amplify'
import Link from 'next/link'
import { z } from 'zod'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { TextInput } from '@components/Inputs/TextInput'
import { HoverCard } from '@components/HoverCard'
import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'
import { useSignIn2FAMutation } from '@hooks/accounts/mutations/useSignIn2FAMutation'
import { useAuth } from '@contexts/AuthContext'
import { getAuthErrorMessageWithToast } from '@utils/sessionsUtils'

interface Verify2FAModalProps {
  isOpen: boolean
  setIsOpen?: (_isOpen: boolean) => void
}

const validationSchema = z.object({
  code: z.string().min(1, { message: 'code required' })
})

export type FieldValues = z.infer<typeof validationSchema>

const LINK_2FA_INFO =
  'https://www.microsoft.com/en-us/security/business/security-101/what-is-two-factor-authentication-2fa'

export function Verify2FAModal({ isOpen, setIsOpen }: Verify2FAModalProps) {
  const { mutateAsync } = useSignIn2FAMutation()

  const { cognitoUser, setCustomer, setCognitoUser } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const { t, currentLocaleProps } = useI18n()

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      if (!cognitoUser.signInUserSession) {
        const { cognitoUser: authCognitoUser, customer } = await mutateAsync({
          cognitoUser,
          code: data.code
        })

        setCognitoUser(authCognitoUser)
        setCustomer(customer)
      } else {
        await Auth.verifyTotpToken(cognitoUser, data.code)
      }

      setIsOpen && setIsOpen(false)
      reset()
    } catch (e) {
      getAuthErrorMessageWithToast(e, currentLocaleProps.id)
    }
  }

  return (
    <DialogModal.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogModal.Content
        className="md:max-w-[30rem]"
        onCloseAutoFocus={e => e.preventDefault()}
        onPointerDownOutside={e => e.preventDefault()}
        onEscapeKeyDown={e => e.preventDefault()}
      >
        <header className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <LockSimple className="w-5 h-5" weight="bold" />

          <DialogModal.Title className="font-semibold">
            {t.settings.security.confirmAccess}
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
                  placeholder={t.settings.security.modalInputPlaceholder}
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
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
