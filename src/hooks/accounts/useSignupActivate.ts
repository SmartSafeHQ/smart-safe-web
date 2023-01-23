import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'react-toastify'

import { useSignupActivateMutation } from './mutations/useSignupActivateMutation'
import { useResendConfirmCodeMutation } from './mutations/useResendConfirmCodeMutation'
import { formatSessionEmail } from '@utils/sessionsUtils'

const validationSchema = z.object({
  code: z.string().min(1, { message: 'code required' })
})

type SignupActivateFieldValues = z.infer<typeof validationSchema>

export const useSignupActivate = () => {
  const router = useRouter()
  const { register, handleSubmit, formState } =
    useForm<SignupActivateFieldValues>({
      resolver: zodResolver(validationSchema)
    })

  const { mutateAsync: signupMutateAsync } = useSignupActivateMutation()
  const { mutateAsync: resendConfirmCodeMutateAsync } =
    useResendConfirmCodeMutation()

  const email = router.query.email
  const formattedEmail = formatSessionEmail(String(email))

  const onSubmit: SubmitHandler<SignupActivateFieldValues> = async data => {
    if (!email) {
      toast.error('Error activating account')

      return
    }

    try {
      await signupMutateAsync({
        code: data.code,
        email: String(email)
      })

      toast.success('Account has been activated. Login!')

      router.push('/accounts/login')
    } catch (error) {
      toast.error(`Error activating account. ${(error as Error).message}`)
    }
  }

  async function resendConfirmCode(email: string) {
    if (!email) {
      toast.error('Error sending code')

      return
    }

    try {
      await resendConfirmCodeMutateAsync({
        email
      })

      toast.success('Confirmation code resent. Check your email!')
    } catch (error) {
      toast.error(`Error sending code. ${(error as Error).message}`)
    }
  }

  useEffect(() => {
    if (!email) {
      router.push('/accounts/signup')
    }
  }, [email, router])

  return {
    email,
    formattedEmail,
    register,
    handleSubmit,
    formState,
    onSubmit,
    resendConfirmCode
  }
}
