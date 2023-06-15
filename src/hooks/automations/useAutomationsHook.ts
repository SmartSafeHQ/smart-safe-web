import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useConnectWallet } from '@web3-onboard/react'

import { useSafe } from '@contexts/SafeContext'
import {
  CreateTimeBasedAutomationFieldValues,
  useAutomations
} from '@contexts/AutomationsContext'
import { useContactsQuery } from '@hooks/contacts/queries/useContactsQuery'
import { useAutomationsQuery } from '@hooks/automations/queries/useAutomationsQuery'
import { useCreateAutomationMutation } from '@hooks/automations/mutations/useCreateAutomationMutation'
import { useSafeTokens } from '@hooks/safe/queries/useSafeTokens'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'

export const useAutomationsHook = () => {
  const {
    isCreateAutomationOpen,
    setIsCreateAutomationOpen,
    isDeleteAutomationOpen,
    setIsDeleteAutomationOpen,
    selectedAutomation,
    setSelectedAutomation,
    createTimeBasedUseForm,
    handleDeleteAutomation
  } = useAutomations()
  const [{ wallet }] = useConnectWallet()
  const { safe } = useSafe()
  const { data: safeTokensData } = useSafeTokens(
    safe?.address,
    safe?.chain.chainId,
    !!safe
  )
  const { data: contacts } = useContactsQuery(safe?.ownerId, !!safe)
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
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = createTimeBasedUseForm

  const contactSearch = watch('to')

  const onSubmitCreateAutomation: SubmitHandler<
    CreateTimeBasedAutomationFieldValues
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
        intervalInSeconds: +data.intervalInSeconds,
        provider: wallet.provider,
        ownerAddress: wallet.accounts[0].address,
        threshold: safe.threshold,
        chainId: checkTokenExists.chainId
      })

      toast.success(
        'Automation successfully created! View it on the transactions tab'
      )

      reset()
      setIsCreateAutomationOpen(false)
    } catch (error) {
      getWe3ErrorMessageWithToast(error)
    }
  }

  return {
    automations,
    isLoading,
    error,
    safeTokensData,
    contacts,
    contactSearch,
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
