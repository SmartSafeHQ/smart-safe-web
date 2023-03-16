import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useLoginMutation } from './mutations/useLoginMutation'
import { useAuth } from '@contexts/AuthContext'
import { useI18n } from '@hooks/useI18n'
import {
  createAuthCookieString,
  getAuthErrorMessageWithToast,
  LAST_AUTH_COOKIE_NAME
} from '@utils/sessionsUtils'

const validationSchema = z.object({
  email: z.string().email('invalid email'),
  password: z.string().min(1, { message: 'password required' })
})

export type LoginFieldValues = z.infer<typeof validationSchema>

export const useLogin = () => {
  const router = useRouter()
  const { widgetProvider, setCustomer, setCognitoUser } = useAuth()
  const { t, currentLocaleProps } = useI18n()

  const { register, handleSubmit, formState } = useForm<LoginFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const { mutateAsync } = useLoginMutation()

  const onSubmit: SubmitHandler<LoginFieldValues> = async data => {
    try {
      const { cognitoUser, customer } = await mutateAsync(data)

      setCognitoUser(cognitoUser)

      if (customer) {
        setCustomer(customer)

        createAuthCookieString(
          LAST_AUTH_COOKIE_NAME,
          new Date().toISOString(),
          5
        )

        router.push('/dashboard/home')
      }

      if (!customer) {
        router.push('/accounts/signIn2FA')
      }
    } catch (e) {
      getAuthErrorMessageWithToast(e, currentLocaleProps.id)
    }
  }

  function handleSignupWidget() {
    widgetProvider?.provider.overlay.show()
  }

  return {
    t,
    register,
    handleSubmit,
    formState,
    onSubmit,
    handleSignupWidget
  }
}
