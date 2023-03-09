import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useI18n } from '@hooks/useI18n'
import { formatSessionEmail } from '@utils/sessionsUtils'

const validationSchema = z.object({
  code: z.string().min(1, { message: 'code required' })
})

export type SignIn2FAFieldValues = z.infer<typeof validationSchema>

export const useSignIn2FA = () => {
  const router = useRouter()
  // const { setCustomer } = useAuth()
  const { t } = useI18n()

  const { register, handleSubmit, formState } = useForm<SignIn2FAFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  // const { mutateAsync } = useLoginMutation()

  const formattedEmail = formatSessionEmail('paulosilvadosreis2057@gmail.com')

  const onSubmit: SubmitHandler<SignIn2FAFieldValues> = async () => {
    try {
      // const customer = await mutateAsync(data)

      // setCustomer(customer)

      router.push('/dashboard/home')
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return {
    t,
    formattedEmail,
    register,
    handleSubmit,
    formState,
    onSubmit
  }
}
