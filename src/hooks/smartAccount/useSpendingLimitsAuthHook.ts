import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'

import { useSafe } from '@contexts/SafeContext'
import { useSpendingLimitsAuth } from '@contexts/smart-account/SpendingLimitsAuthContext'
import { ContactProps } from '@contexts/SAContactsContext'

import { useListContacts } from '@hooks/addressBook/queries/useListContacts'
import { useSpendingLimitsAuths } from '@hooks/smartAccount/queries/useSpendingLimitsAuths'
import { useCreateWithdrawalAuthMutation } from '@hooks/smartAccount/mutations/useCreateSpendingLimitsAuthMutation'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'

const createSpendingLimitsValidationSchema = z.object({
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
  typeof createSpendingLimitsValidationSchema
>

export const useSpendingLimitsAuthHook = () => {
  const {
    isCreateSpendingLimitsOpen,
    setIsCreateSpendingLimitsOpen,
    isDeleteSpendingLimitsOpen,
    setIsDeleteSpendingLimitsOpen,
    selectedSpendingLimits,
    setSelectedSpendingLimits,
    handleDeleteSpendingLimits
  } = useSpendingLimitsAuth()

  const { safe } = useSafe()
  const { data: contacts, isLoading: contactsIsLoading } = useListContacts(
    safe?.ownerId!
  )
  const { mutateAsync } = useCreateWithdrawalAuthMutation()

  const {
    data: spendingLimits,
    isLoading,
    error
  } = useSpendingLimitsAuths(1, '1')

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateWithdrawalFieldValues>({
    resolver: zodResolver(createSpendingLimitsValidationSchema)
  })

  const [searchContacts, setSearchContacts] = useState<
    ContactProps[] | null | undefined
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
      contact.contactAddress.startsWith(currentValue)
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
        contact => contact.contactAddress === data.contactAddress
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
        recipientName: findContactForRecipient?.contactName
      })

      reset()
      setSearchContacts(contacts)
      setIsCreateSpendingLimitsOpen(false)
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    }
  }

  return {
    spendingLimits,
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
    isCreateSpendingLimitsOpen,
    setIsCreateSpendingLimitsOpen,
    isDeleteSpendingLimitsOpen,
    setIsDeleteSpendingLimitsOpen,
    selectedSpendingLimits,
    setSelectedSpendingLimits,
    handleDeleteSpendingLimits
  }
}
