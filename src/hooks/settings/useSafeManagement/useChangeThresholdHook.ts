import { useState } from 'react'

export interface ChangeThrehsold {
  safeAddress: string
  newThreshold: number
  transactionNonce: number
}

export function useChangeThresholdHook() {
  const [isChangeThresholdModalOpen, setIsChangeThresholdOpen] = useState(false)

  return {
    setIsChangeThresholdOpen,
    isChangeThresholdModalOpen
  }
}
