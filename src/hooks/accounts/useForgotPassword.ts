import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useForgotPasswordMutation } from './mutations/useForgotPasswordMutation'

const validationSchema = z.object({
  email: z.string().email('invalid email')
})

type ForgotPasswordFieldValues = z.infer<typeof validationSchema>

export const useForgotPassword = () => {
  const router = useRouter()
  const { register, handleSubmit, formState } =
    useForm<ForgotPasswordFieldValues>({
      resolver: zodResolver(validationSchema)
    })

  const { mutateAsync } = useForgotPasswordMutation()

  const onSubmit: SubmitHandler<ForgotPasswordFieldValues> = async data => {
    try {
      await mutateAsync(data)

      toast.success('Recovery account code sent. Check your email!')

      router.push({
        pathname: 'reset-password',
        query: { email: data.email }
      })
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return { register, handleSubmit, formState, onSubmit }
}
