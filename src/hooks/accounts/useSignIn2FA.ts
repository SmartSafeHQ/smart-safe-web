import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useI18n } from '@hooks/useI18n'
import { useSignIn2FAMutation } from '@hooks/accounts/mutations/useSignIn2FAMutation'
import { useAuth } from '@contexts/AuthContext'

const validationSchema = z.object({
  code: z.string().min(1, { message: 'code required' })
})

export type SignIn2FAFieldValues = z.infer<typeof validationSchema>

export const useSignIn2FA = () => {
  const { push } = useRouter()
  const { cognitoUser, setCognitoUser, setCustomer } = useAuth()
  const { t } = useI18n()

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

      push('/dashboard/home')
    } catch (e) {
      const error = e instanceof Error ? e : Error()
      const errorMessage = t.errors.authE.get(error.name)?.message

      toast.error(errorMessage ?? t.errors.default)
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
