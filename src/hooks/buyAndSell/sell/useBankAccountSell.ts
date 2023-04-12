import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { z } from 'zod'

import { useI18n } from '@hooks/useI18n'
import { useSellStableCoin } from '@contexts/SellStableCoinContext'

export const validationSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'min 0.1' })
    .min(0.1, { message: 'min 0.1' }),
  bankId: z.string().min(1, { message: 'bank required' }),
  cpf: z.string().min(1, { message: 'cpf required' }),
  name: z.string().min(1, { message: 'name required' }),
  branch: z.string().min(1, { message: 'branch required' }),
  accountNumber: z.string().min(1, { message: 'account number required' }),
  lastDigit: z.string().min(1, { message: 'last digit required' })
})

export type SellBankAccountFieldValues = z.infer<typeof validationSchema>

export const BANKS = [
  { bankId: '260', name: 'NuBank', iconUrl: '/banks/nubank.png' },
  { bankId: '341', name: 'Itaú Unibanco', iconUrl: '/banks/itau.png' },
  { bankId: '33', name: 'Santander', iconUrl: '/banks/santander.png' }
]

export const useBankAccountSell = () => {
  const { push } = useRouter()
  const { t } = useI18n()
  const { setBankAccount } = useSellStableCoin()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<SellBankAccountFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<SellBankAccountFieldValues> = async data => {
    try {
      console.log(data)
      setBankAccount(data)

      push('/dashboard/buy-and-sell/sell/data-confirmation')
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  return {
    t,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    onSubmit
  }
}
