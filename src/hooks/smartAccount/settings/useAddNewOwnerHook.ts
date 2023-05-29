import { useState } from 'react'

import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'
import { useAddNewOwner } from '@/hooks/transactions/mutation/useAddNewOwner'

export interface AddNewOwner {
  safeAddress: string
  ownerAddress: string
  newThreshold: number
  transactionNonce: number
}

export function useAddNewOwnerHook() {
  const [isAddNewOwnerModalOpen, setAddNewOwnerOpen] = useState(false)

  const {
    mutateAsync: addNewOwnerMutation,
    isLoading: addNewOwnerMutationIsLoading
  } = useAddNewOwner()

  async function addNewOwner({
    newThreshold,
    safeAddress,
    transactionNonce,
    ownerAddress
  }: AddNewOwner) {
    try {
      await addNewOwnerMutation({
        newThreshold,
        safeAddress,
        transactionNonce,
        ownerAddress
      })
    } catch (err) {
      getWe3ErrorMessageWithToast(err)
    }
  }

  return {
    addNewOwner,
    setAddNewOwnerOpen,
    isAddNewOwnerModalOpen,
    addNewOwnerMutationIsLoading
  }
}
