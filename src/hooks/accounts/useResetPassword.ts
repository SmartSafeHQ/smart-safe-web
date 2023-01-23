import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useResetPasswordMutation } from './mutations/useResetPasswordMutation'
import { formatSessionEmail } from '@utils/sessionsUtils'

const validationSchema = z
  .object({
    code: z.string().min(1, { message: 'code required' }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'at least 8 characters, lowercase, uppercase, one special, and number for greater security.'
      ),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' })
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match"
  })

type ResetPasswordFieldValues = z.infer<typeof validationSchema>

export const useResetPassword = () => {
  const router = useRouter()
  const { register, handleSubmit, formState } =
    useForm<ResetPasswordFieldValues>({
      resolver: zodResolver(validationSchema)
    })

  const { mutateAsync } = useResetPasswordMutation()

  const email = router.query.email
  const formattedEmail = formatSessionEmail(String(email))

  const onSubmit: SubmitHandler<ResetPasswordFieldValues> = async data => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password don't match")

      return
    }

    if (!email) {
      toast.error('Error on reset password code')

      return
    }

    try {
      await mutateAsync({
        email: String(email),
        code: data.code,
        password: data.password
      })

      toast.success('Password reseted successfully. Login!')

      router.push('/accounts/login')
    } catch (error) {
      toast.error(`Error resetting password. ${(error as Error).message}`)
    }
  }

  useEffect(() => {
    if (!email) {
      router.push('/accounts/login')
    }
  }, [email, router])

  return {
    formattedEmail,
    register,
    handleSubmit,
    formState,
    onSubmit
  }
}
