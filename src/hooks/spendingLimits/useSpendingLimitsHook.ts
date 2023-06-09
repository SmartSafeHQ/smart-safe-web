import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import { useSafe } from '@contexts/SafeContext'
import { useSpendingLimits } from '@contexts/SpendingLimitsContext'
import { ContactProps } from '@contexts/ContactsContext'

import { useContactsQuery } from '@hooks/contacts/queries/useContactsQuery'
import { useSpendingLimitsQuery } from '@hooks/spendingLimits/queries/useSpendingLimitsQuery'
import { useCreateSpendingLimitsMutation } from '@hooks/spendingLimits/mutations/useCreateSpendingLimitsMutation'
import { useSafeTokens } from '@hooks/safe/queries/useSafeTokens'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'

const createSpendingLimitsValidationSchema = z.object({
  to: z.string().refine(address => {
    const isAddressValid = ethers.isAddress(address)

    return isAddressValid
  }, 'Invalid address'),
  tokenSymbol: z.string().min(1, { message: 'coin required' }),
  amount: z
    .number({ invalid_type_error: 'min 0.1' })
    .min(0.000001, { message: 'min 0.1' }),
  trigger: z.string().min(1, { message: 'time trigger required' })
})

export type CreateSpendingLimitsFieldValues = z.infer<
  typeof createSpendingLimitsValidationSchema
>

export const useSpendingLimitsHook = () => {
  const {
    isCreateSpendingLimitsOpen,
    setIsCreateSpendingLimitsOpen,
    isDeleteSpendingLimitsOpen,
    setIsDeleteSpendingLimitsOpen,
    selectedSpendingLimits,
    setSelectedSpendingLimits,
    handleDeleteSpendingLimits
  } = useSpendingLimits()
  const [{ wallet }] = useConnectWallet()
  const { safe } = useSafe()
  const { data: safeTokensData } = useSafeTokens(
    safe?.address,
    safe?.chain.chainId,
    !!safe
  )
  const { data: contacts, isLoading: contactsIsLoading } = useContactsQuery(
    safe?.ownerId,
    !!safe
  )
  const { mutateAsync } = useCreateSpendingLimitsMutation()

  const {
    data: spendingLimits,
    isLoading,
    error
  } = useSpendingLimitsQuery(
    safe?.address,
    safe?.chain.chainId,
    safe?.ownerId,
    !!safe
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateSpendingLimitsFieldValues>({
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

  const onSubmitCreateSpendingLimits: SubmitHandler<
    CreateSpendingLimitsFieldValues
  > = async data => {
    if (!wallet || !contacts || !safe) return

    try {
      const checkTokenExists = CHAINS_ATTRIBUTES.find(
        token => token.symbol === data.tokenSymbol
      )

      if (!checkTokenExists) {
        toast.error('token not found')
        return
      }

      await mutateAsync({
        ...data,
        safeAddress: safe.address,
        trigger: +data.trigger,
        provider: wallet.provider,
        ownerAddress: wallet.accounts[0].address,
        threshold: safe.threshold,
        chainId: checkTokenExists.chainId
      })

      toast.success('Automation successfully created!')

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
    safeTokensData,
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
    onSubmitCreateSpendingLimits,
    isCreateSpendingLimitsOpen,
    setIsCreateSpendingLimitsOpen,
    isDeleteSpendingLimitsOpen,
    setIsDeleteSpendingLimitsOpen,
    selectedSpendingLimits,
    setSelectedSpendingLimits,
    handleDeleteSpendingLimits
  }
}
