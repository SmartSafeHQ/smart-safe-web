import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useI18n } from '@hooks/useI18n'
import { useSignIn2FAMutation } from '@hooks/accounts/mutations/useSignIn2FAMutation'
import { useAuth } from '@contexts/AuthContext'
import {
  createAuthCookieString,
  getAuthErrorMessageWithToast,
  LAST_AUTH_COOKIE_NAME
} from '@utils/sessionsUtils'

const validationSchema = z.object({
  code: z.string().min(1, { message: 'code required' })
})

export type SignIn2FAFieldValues = z.infer<typeof validationSchema>

export const useSignIn2FA = () => {
  const { push } = useRouter()
  const { cognitoUser, setCognitoUser, setCustomer, setCustomer2FA } = useAuth()
  const { t, currentLocaleProps } = useI18n()

  const { register, handleSubmit, formState } = useForm<SignIn2FAFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const { mutateAsync } = useSignIn2FAMutation()

  const onSubmit: SubmitHandler<SignIn2FAFieldValues> = async data => {
    try {
      const { cognitoUser: authCognitoUser, customer } = await mutateAsync({
        cognitoUser,
        code: data.code
      })

      setCognitoUser(authCognitoUser)
      setCustomer(customer)
      setCustomer2FA({
        signInEnabled: true,
        send2faEnabled: false,
        exportKeys2faEnabled: false
      })

      createAuthCookieString(LAST_AUTH_COOKIE_NAME, new Date().toISOString(), 5)

      push('/dashboard/home')
    } catch (e) {
      getAuthErrorMessageWithToast(e, currentLocaleProps.id)
    }
  }

  return {
    t,
    register,
    handleSubmit,
    formState,
    onSubmit
  }
}
