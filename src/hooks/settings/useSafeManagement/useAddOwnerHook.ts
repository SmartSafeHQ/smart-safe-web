import { useState } from 'react'

import { useAddOwner } from '@hooks/transactions/mutation/useAddOwner'

export interface AddOwnerProps {
  safeAddress: string
  ownerAddress: string
  Threshold: number
  transactionNonce: number
}

export function useAddOwnerHook() {
  const [isAddOwnerModalOpen, setAddOwnerOpen] = useState(false)

  const {
    mutateAsync: addOwnerMutation,
    isLoading: addOwnerMutationIsLoading
  } = useAddOwner()

  return {
    addOwnerMutation,
    setAddOwnerOpen,
    isAddOwnerModalOpen,
    addOwnerMutationIsLoading
  }
}
