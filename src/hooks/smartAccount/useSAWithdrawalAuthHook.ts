import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'

import { useSAWithdrawalAuth } from '@contexts/SAWithdrawalAuthContext'
import { ContactProps } from '@contexts/SAContactsContext'

import { useSmartAccountContacts } from '@hooks/smartAccount/queries/useContacts'
import { useWithdrawalAuths } from '@hooks/smartAccount/queries/useWithdrawalAuths'
import { useCreateWithdrawalAuthMutation } from '@hooks/smartAccount/mutations/useCreateWithdrawalAuthMutation'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'

const createWithdrawalValidationSchema = z.object({
  contactAddress: z.string().refine(address => {
    const isAddressValid = ethers.isAddress(address)

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
    useSmartAccountContacts(1)
  const { mutateAsync } = useCreateWithdrawalAuthMutation()

  const { data: withdrawals, isLoading, error } = useWithdrawalAuths(1, '1')

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
    if (!contacts) return

    try {
      const withdrawalCoin = CHAINS_ATTRIBUTES.find(
        coin => coin.symbol === data.coinSymbol
      )

      const findContactForRecipient = contacts.find(
        contact => contact.wallet.address === data.contactAddress
      )

      if (!withdrawalCoin) {
        toast.error('coin not found')
        return
      }

      await mutateAsync({
        ...data,
        smartAccountAddress: 'address',
        customerWalletPrivateKey: 'privateKey',
        coin: withdrawalCoin,
        recipientName: findContactForRecipient?.name
      })

      reset()
      setSearchContacts(contacts)
      setIsCreateWithdrawalOpen(false)
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    }
  }

  return {
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
