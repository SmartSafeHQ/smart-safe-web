import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import { useSafe } from '@contexts/SafeContext'
import { useAutomations } from '@contexts/AutomationsContext'
import { ContactProps } from '@contexts/ContactsContext'

import { useContactsQuery } from '@hooks/contacts/queries/useContactsQuery'
import { useAutomationsQuery } from '@hooks/automations/queries/useAutomationsQuery'
import { useCreateAutomationMutation } from '@hooks/automations/mutations/useCreateAutomationMutation'
import { useSafeTokens } from '@hooks/safe/queries/useSafeTokens'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'

const createAutomationValidationSchema = z.object({
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

export type CreateAutomationFieldValues = z.infer<
  typeof createAutomationValidationSchema
>

export const useAutomationsHook = () => {
  const {
    isCreateAutomationOpen,
    setIsCreateAutomationOpen,
    isDeleteAutomationOpen,
    setIsDeleteAutomationOpen,
    selectedAutomation,
    setSelectedAutomation,
    handleDeleteAutomation
  } = useAutomations()
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
  const { mutateAsync } = useCreateAutomationMutation()

  const {
    data: automations,
    isLoading,
    error
  } = useAutomationsQuery(
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
  } = useForm<CreateAutomationFieldValues>({
    resolver: zodResolver(createAutomationValidationSchema)
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

  const onSubmitCreateAutomation: SubmitHandler<
    CreateAutomationFieldValues
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

      toast.success(
        'Automation successfully created! View it on the transactions tab'
      )

      reset()
      setSearchContacts(contacts)
      setIsCreateAutomationOpen(false)
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    }
  }

  return {
    automations,
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
    onSubmitCreateAutomation,
    isCreateAutomationOpen,
    setIsCreateAutomationOpen,
    isDeleteAutomationOpen,
    setIsDeleteAutomationOpen,
    selectedAutomation,
    setSelectedAutomation,
    handleDeleteAutomation
  }
}
