import { Envelope, Lock } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useI18n } from '@hooks/useI18n'

import { Button } from '@components/Button'
import { TextInput } from '@components/Inputs/TextInput'
import { DialogModal } from '@components/Dialogs/DialogModal'

import { useLoginMutation } from '@hooks/accounts/mutations/useLoginMutation'
import { useLogin } from '@hooks/accounts/useLogin'
import { useAuth } from '@contexts/AuthContext'
import { getAuthErrorMessageWithToast } from '@utils/sessionsUtils'

interface LoginModalProps {
  isOpen: boolean
  setIsOpen: (_open: boolean) => void
}

const loginValidationSchema = z.object({
  email: z.string().email('invalid email'),
  password: z.string().min(1, { message: 'password required' })
})

export type LoginFieldValues = z.infer<typeof loginValidationSchema>

export function LoginModal({ isOpen, setIsOpen }: LoginModalProps) {
  const { mutateAsync } = useLoginMutation()

  const { handleSignupWidget } = useLogin()

  const { setCustomer, setCognitoUser } = useAuth()

  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    formState: { errors: loginErrors, isSubmitting: loginIsSubmitting }
  } = useForm<LoginFieldValues>({
    resolver: zodResolver(loginValidationSchema)
  })

  const { t, currentLocaleProps } = useI18n()

  const onSubmitLogin: SubmitHandler<LoginFieldValues> = async data => {
    try {
      const { cognitoUser, customer } = await mutateAsync(data)

      setCognitoUser(cognitoUser)

      if (customer) {
        setCustomer(customer)
      }

      setIsOpen(false)
    } catch (e) {
      getAuthErrorMessageWithToast(e, currentLocaleProps.id)
    }
  }

  return (
    <DialogModal.Root open={isOpen} modal={false}>
      <DialogModal.Content className="md:max-w-[36rem]">
        <div className="w-full flex flex-col justify-center py-8 px-1 sm:py-4 sm:px-8">
          <header className="w-full flex items-center flex-col gap-3 mb-6">
            <DialogModal.Title className="text-3xl font-bold text-gray-800 dark:text-gray-50">
              {t.signIn.headDescription}
            </DialogModal.Title>

            <div className="w-full flex items-center justify-center">
              <DialogModal.Description className="text-center text-gray-700 dark:text-gray-300  font-semibold">
                {t.signIn.title}
              </DialogModal.Description>
            </div>
          </header>

          <form
            onSubmit={loginHandleSubmit(onSubmitLogin)}
            className="flex flex-col gap-4 items-stretch w-full"
          >
            <TextInput.Root
              htmlFor="email"
              variant="secondary"
              error={loginErrors.email?.message}
            >
              <TextInput.Label>{t.signIn.email}</TextInput.Label>

              <TextInput.Content>
                <TextInput.Icon>
                  <Envelope />
                </TextInput.Icon>

                <TextInput.Input
                  {...loginRegister('email')}
                  required
                  type="email"
                  id="email"
                  placeholder={t.signIn.emailPlaceholder}
                />
              </TextInput.Content>
            </TextInput.Root>

            <TextInput.Root
              htmlFor="password"
              variant="secondary"
              error={loginErrors.password?.message}
            >
              <TextInput.Label>{t.signIn.password}</TextInput.Label>

              <TextInput.Content>
                <TextInput.Icon>
                  <Lock />
                </TextInput.Icon>

                <TextInput.Input
                  {...loginRegister('password')}
                  required
                  type="password"
                  id="password"
                  placeholder="************"
                />
              </TextInput.Content>
            </TextInput.Root>

            <button
              type="button"
              onClick={handleSignupWidget}
              className="text-left text-md text-brand-foregroundAccent1 dark:text-cyan-400 font-semibold hover:text-brand-foregroundAccent2 hover:dark:text-cyan-300"
            >
              {t.signIn.forgotPassword}
            </button>

            <Button
              type="submit"
              isLoading={loginIsSubmitting}
              className="mt-1"
            >
              {t.signIn.login}
            </Button>
          </form>

          <footer className="flex flex-col items-center gap-4 mt-8">
            <button
              onClick={handleSignupWidget}
              className="text-lg text-gray-700 dark:text-gray-300 font-medium underline transition-colors hover:text-gray-900 hover:dark:text-gray-100"
            >
              {t.signIn.createAccount}
            </button>
          </footer>
        </div>
      </DialogModal.Content>
    </DialogModal.Root>
  )
}
