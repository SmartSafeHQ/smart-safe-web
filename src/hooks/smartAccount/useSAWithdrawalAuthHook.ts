import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { getAxiosErrorMessageWithToast } from '@utils/global'
import { useWithdrawalAuths } from '@hooks/smartAccount/queries/useWithdrawalAuths'
import { useAuth } from '@contexts/AuthContext'
import { useSAWithdrawalAuth } from '@contexts/SAWithdrawalAuthContext'
import { useI18n } from '@hooks/useI18n'
import { useSmartAccountContacts } from '@/hooks/smartAccount/queries/useContacts'

const createWithdrawalValidationSchema = z.object({
  contactAddress: z.string().min(1, { message: 'contact required' }),
  coinSymbol: z.string().min(1, { message: 'coin required' }),
  amount: z
    .number({ invalid_type_error: 'min 0.1' })
    .min(0.1, { message: 'min 0.1' }),
  fromDate: z
    .date({
      required_error: 'date required',
      invalid_type_error: 'invalid date'
    })
    .min(new Date(), 'min date is tomorrow!')
})

export type CreateWithdrawalFieldValues = z.infer<
  typeof createWithdrawalValidationSchema
>

export const useSAWithdrawalAuthHook = () => {
  const { t } = useI18n()
  const { customer } = useAuth()
  const {
    isCreateWithdrawalOpen,
    setIsCreateWithdrawalOpen,
    isDeleteWithdrawalOpen,
    setIsDeleteWithdrawalOpen,
    selectedWithdrawal,
    setSelectedWithdrawal,
    handleDeleteWithdrawal
  } = useSAWithdrawalAuth()

  const { data: contacts, isLoading: contactsIsLoading } =
    useSmartAccountContacts(customer?.id, !!customer)

  const {
    data: withdrawals,
    isLoading,
    error
  } = useWithdrawalAuths(
    customer?.id,
    customer?.wallets.evm.address ?? '',
    !!customer
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateWithdrawalFieldValues>({
    resolver: zodResolver(createWithdrawalValidationSchema)
  })

  const onSubmitCreateWithdrawal: SubmitHandler<
    CreateWithdrawalFieldValues
  > = async data => {
    if (!customer) return

    console.log(data)

    try {
      reset()
      setIsCreateWithdrawalOpen(false)
    } catch (error) {
      console.log(error)

      getAxiosErrorMessageWithToast(error)
    }
  }

  return {
    t,
    customer,
    withdrawals,
    isLoading,
    error,
    contacts,
    contactsIsLoading,
    control,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    onSubmitCreateWithdrawal,
    isCreateWithdrawalOpen,
    setIsCreateWithdrawalOpen,
    isDeleteWithdrawalOpen,
    setIsDeleteWithdrawalOpen,
    selectedWithdrawal,
    setSelectedWithdrawal,
    handleDeleteWithdrawal
  }
}
