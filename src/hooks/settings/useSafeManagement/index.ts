import { useMemo } from 'react'
import { useWallets } from '@web3-onboard/react'

import { useSafe } from '@contexts/SafeContext'
import { useSafeOwners } from '@hooks/transactions/queries/useSafeOwners'
import { useContactsQuery } from '@hooks/contacts/queries/useContactsQuery'
import { useSafeThreshold } from '@hooks/transactions/queries/useSafeThreshold'
import { useSafeOwnersCount } from '@hooks/transactions/queries/useSafeOwnersCount'
import { useRemoveOwner } from '@hooks/transactions/mutation/useRemoveOwner'
import { useAddOwnerHook } from '@hooks/settings/useSafeManagement/useAddOwnerHook'
import { useChangeThresholdHook } from '@hooks/settings/useSafeManagement/useChangeThresholdHook'
import { useSafeTxNonce } from '@hooks/transactions/queries/useSafeTxNonce'
import { useSafeRequiredTxNonce } from '@hooks/transactions/queries/useSafeRequiredTxNonce'

interface RemoveOwner {
  safeAddress: string
  prevOwnerAddress: string
  removeOwnerAddress: string
  transactionNonce: number
}

export function useSafeManagement() {
  const { safe } = useSafe()
  const [wallets] = useWallets()
  const { setIsChangeThresholdOpen, isChangeThresholdModalOpen } =
    useChangeThresholdHook()
  const {
    addOwnerMutation,
    addOwnerMutationIsLoading,
    isAddOwnerModalOpen,
    setAddOwnerOpen
  } = useAddOwnerHook()
  const { data: contactList } = useContactsQuery(safe?.ownerId, !!safe)
  const { data: requiredTransactionNonce } = useSafeRequiredTxNonce(
    safe?.address,
    !!safe
  )
  const { data: ownersCount } = useSafeOwnersCount(safe?.address, !!safe)
  const { data: safeThreshold } = useSafeThreshold(safe?.address, !!safe)
  const { data: safeOwners } = useSafeOwners(safe?.address, !!safe)
  const { data: transactionNonce } = useSafeTxNonce(safe?.address, !!safe)
  const { mutateAsync: removeOwnersMutation } = useRemoveOwner()

  const richOwnersData = useMemo(() => {
    if (!contactList || !safeOwners || !wallets) {
      return [{ address: '', name: '' }]
    }

    return safeOwners.map(ownerAddress => {
      if (ownerAddress.toLowerCase() === wallets?.accounts[0].address) {
        return {
          address: ownerAddress,
          name: 'You'
        }
      }

      const ownerData = contactList.find(
        ({ contactAddress }) => contactAddress === ownerAddress
      )

      return {
        address: ownerData?.contactAddress || ownerAddress,
        name: ownerData?.contactName || ''
      }
    })
  }, [contactList, safeOwners, wallets])

  async function removeOwner(input: RemoveOwner) {
    try {
      await removeOwnersMutation(input)
    } catch (err) {
      console.log(err)
    }
  }

  const isCurrentConnectWalletAnOwner = useMemo(() => {
    if (!wallets?.accounts?.[0]?.address || !safeOwners) {
      return false
    }

    const currentConnectedWallet = wallets.accounts[0].address

    return safeOwners.some(
      ownerAddress => ownerAddress.toLowerCase() === currentConnectedWallet
    )
  }, [wallets, safeOwners])

  return {
    safe,
    ownersCount,
    removeOwner,
    safeThreshold,
    richOwnersData,
    transactionNonce,
    setAddOwnerOpen,
    addOwnerMutation,
    isAddOwnerModalOpen,
    requiredTransactionNonce,
    setIsChangeThresholdOpen,
    isChangeThresholdModalOpen,
    addOwnerMutationIsLoading,
    isCurrentConnectWalletAnOwner
  }
}
