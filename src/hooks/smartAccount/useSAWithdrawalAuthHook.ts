import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'

import { useAuth } from '@contexts/AuthContext'
import { useSAWithdrawalAuth } from '@contexts/SAWithdrawalAuthContext'
import { ContactProps } from '@contexts/SAContactsContext'
import { useI18n } from '@hooks/useI18n'
import { useSmartAccountContacts } from '@hooks/smartAccount/queries/useContacts'
import { useWithdrawalAuths } from '@hooks/smartAccount/queries/useWithdrawalAuths'
import { useCreateWithdrawalAuthMutation } from '@hooks/smartAccount/mutations/useCreateWithdrawalAuthMutation'
import { STABLE_COINS } from '@utils/global/coins/stableCoinsConfig'
import { getWe3ErrorMessageWithToast } from '@utils/web3Utils'

const createWithdrawalValidationSchema = z.object({
  contactAddress: z.string().refine(address => {
    const isAddressValid = ethers.utils.isAddress(address)

    return isAddressValid
  }, 'Invalid contact address'),
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
  const { t, currentLocaleProps } = useI18n()
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
  const { mutateAsync } = useCreateWithdrawalAuthMutation()

  const {
    data: withdrawals,
    isLoading,
    error
  } = useWithdrawalAuths(
    customer?.id,
    customer?.wallets.smartAccountAddress.address ?? '',
    !!customer
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateWithdrawalFieldValues>({
    resolver: zodResolver(createWithdrawalValidationSchema)
  })

  const [searchContacts, setSearchContacts] = useState<
    ContactProps[] | undefined
  >(contacts)

  useEffect(() => {
    if (!contacts) return

    setSearchContacts(contacts)
  }, [contacts])

  function handleInputChange(currentValue = '') {
    if (!currentValue) {
      setSearchContacts(contacts)
      return
    }

    const searchResults = contacts?.filter(contact =>
      contact.wallet.address.startsWith(currentValue)
    )

    setSearchContacts(searchResults)
  }

  const onSubmitCreateWithdrawal: SubmitHandler<
    CreateWithdrawalFieldValues
  > = async data => {
    if (!customer) return
    if (!contacts) return

    try {
      const withdrawalCoin = STABLE_COINS.find(
        coin => coin.symbol === data.coinSymbol
      )

      const findContactForRecipient = contacts.find(
        contact => contact.wallet.address === data.contactAddress
      )

      if (!withdrawalCoin) {
        toast.error(t.saWithdrawalAuth.coinNotFound)
        return
      }

      await mutateAsync({
        ...data,
        smartAccountAddress: customer.wallets.smartAccountAddress.address,
        customerWalletPrivateKey: customer.wallets.evm.privateKey,
        coin: withdrawalCoin,
        recipientName: findContactForRecipient?.name
      })

      reset()
      setSearchContacts(contacts)
      setIsCreateWithdrawalOpen(false)
    } catch (e) {
      getWe3ErrorMessageWithToast(e, currentLocaleProps.id)
    }
  }

  return {
    t,
    customer,
    withdrawals,
    isLoading,
    error,
    searchContacts,
    setSearchContacts,
    handleInputChange,
    contacts,
    contactsIsLoading,
    control,
    register,
    handleSubmit,
    errors,
    setValue,
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
