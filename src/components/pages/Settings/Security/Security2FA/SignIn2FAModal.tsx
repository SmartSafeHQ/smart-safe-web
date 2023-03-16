import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { Verify2FAModal } from '@components/pages/Layouts/Verify2FAModal'

import { useSignIn2FAMutation } from '@hooks/accounts/mutations/useSignIn2FAMutation'
import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { getAuthErrorMessageWithToast } from '@utils/sessionsUtils'

interface SignIn2FAModalModalProps {
  isOpen: boolean
  setIsOpen: (_open: boolean) => void
}

const validationSchema = z.object({
  code: z.string().min(1, { message: 'code required' })
})

export type FieldValues = z.infer<typeof validationSchema>

export function SignIn2FAModal({
  isOpen,
  setIsOpen
}: SignIn2FAModalModalProps) {
  const { mutateAsync } = useSignIn2FAMutation()

  const { cognitoUser, setCustomer, setCognitoUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const { t, currentLocaleProps } = useI18n()

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      const { cognitoUser: authCognitoUser, customer } = await mutateAsync({
        cognitoUser,
        code: data.code
      })

      setCognitoUser(authCognitoUser)
      setCustomer(customer)
      setIsOpen(false)
    } catch (e) {
      getAuthErrorMessageWithToast(e, currentLocaleProps.id)
    }
  }

  return (
    <DialogModal.Root open={isOpen} modal={false}>
      <Verify2FAModal.Root title={t.signIn2FA.title}>
        <Verify2FAModal.Content
          inputLabel={t.settings.security.modalInputLabel}
          inputPlaceholder={t.settings.security.modalInputPlaceholder}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          error={errors.code?.message}
        >
          <Verify2FAModal.Info
            info={t.signIn2FA.description}
            iconClassName="w-8 h-8 text-gray-800 dark:text-gray-200"
            infoClassName="text-gray-800 dark:text-gray-200"
          />

          <Verify2FAModal.Footer>
            <Button type="submit" isLoading={isSubmitting}>
              {t.signIn2FA.verify}
            </Button>
          </Verify2FAModal.Footer>
        </Verify2FAModal.Content>
      </Verify2FAModal.Root>
    </DialogModal.Root>
  )
}
