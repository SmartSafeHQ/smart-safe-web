import { useState } from 'react'

import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'
import { useChangeThreshold } from '@/hooks/transactions/mutation/useChangeThreshold'

export interface ChangeThrehsold {
  safeAddress: string
  newThreshold: number
  transactionNonce: number
}

export function useChangeThresholdHook() {
  const [isChangeThresholdModalOpen, setIsChangeThresholdOpen] = useState(false)

  const {
    mutateAsync: changeThresholdMutation,
    isLoading: changeThresholdMutationIsLoading
  } = useChangeThreshold()

  async function changeThreshold({
    newThreshold,
    safeAddress,
    transactionNonce
  }: ChangeThrehsold) {
    try {
      await changeThresholdMutation({
        newThreshold,
        safeAddress,
        transactionNonce
      })
    } catch (err) {
      getWe3ErrorMessageWithToast(err)
    }
  }

  return {
    changeThreshold,
    setIsChangeThresholdOpen,
    isChangeThresholdModalOpen,
    changeThresholdMutationIsLoading
  }
}
