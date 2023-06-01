import { useState } from 'react'

import { useAddNewOwner } from '@hooks/transactions/mutation/useAddNewOwner'

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

  return {
    addNewOwnerMutation,
    setAddNewOwnerOpen,
    isAddNewOwnerModalOpen,
    addNewOwnerMutationIsLoading
  }
}
