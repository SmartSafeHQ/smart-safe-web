import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useSignupMutation } from './mutations/useSignupMutation'

const validationSchema = z
  .object({
    name: z.string().min(1, { message: 'name required' }),
    email: z.string().email('invalid email'),
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

type SignupFieldValues = z.infer<typeof validationSchema>

export const useSignup = () => {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<SignupFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const { mutateAsync } = useSignupMutation()

  const onSubmit: SubmitHandler<SignupFieldValues> = async data => {
    try {
      await mutateAsync(data)

      toast.success('Account created successfully. Check your email!')

      router.push({
        pathname: '/accounts/signup-activate',
        query: { email: data.email }
      })
    } catch (error) {
      toast.error(`Error creating account. ${(error as Error).message}`)
    }
  }

  return { register, handleSubmit, formState, onSubmit }
}
