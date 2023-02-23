import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useLoginMutation } from './mutations/useLoginMutation'
import { useAuth } from '@contexts/AuthContext'
import { useI18n } from '@hooks/useI18n'

const validationSchema = z.object({
  email: z.string().email('invalid email'),
  password: z.string().min(1, { message: 'password required' })
})

export type LoginFieldValues = z.infer<typeof validationSchema>

export const useLogin = () => {
  const router = useRouter()
  const { widgetProvider, setCustomer } = useAuth()
  const { t } = useI18n()

  const { register, handleSubmit, formState } = useForm<LoginFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const { mutateAsync } = useLoginMutation()

  const onSubmit: SubmitHandler<LoginFieldValues> = async data => {
    try {
      const customer = await mutateAsync(data)

      setCustomer(customer)

      router.push('/dashboard/home')
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
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
