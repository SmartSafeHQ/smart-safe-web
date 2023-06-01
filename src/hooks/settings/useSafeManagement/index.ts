import { useMemo } from 'react'
import { useWallets } from '@web3-onboard/react'

import { useSafe } from '@contexts/SafeContext'
import { useGetOwners } from '@hooks/transactions/queries/useGetOwners'
import { useContactsQuery } from '@hooks/contacts/queries/useContactsQuery'
import { useGetThreshold } from '@hooks/transactions/queries/useGetThreshold'
import { useGetOwnersCount } from '@hooks/transactions/queries/useGetOwnersCount'
import { useRemoveOwner } from '@hooks/transactions/mutation/useRemoveOwner'
import { useAddNewOwnerHook } from '@hooks/settings/useSafeManagement/useAddNewOwnerHook'
import { useChangeThresholdHook } from '@hooks/settings/useSafeManagement/useChangeThresholdHook'
import { useGetTransactionNonce } from '@hooks/transactions/queries/useGetTransactionNonce'
import { useGetRequiredTransactionNonce } from '@hooks/transactions/queries/useGetRequiredTransactionNonce'

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
    addNewOwnerMutation,
    addNewOwnerMutationIsLoading,
    isAddNewOwnerModalOpen,
    setAddNewOwnerOpen
  } = useAddNewOwnerHook()
  const { data: contactList } = useContactsQuery(safe?.ownerId || '')
  const { data: requiredTransactionNonce } = useGetRequiredTransactionNonce({
    safeAddress: safe?.address || '',
    enabled: !!safe?.address
  })
  const { data: ownersCount } = useGetOwnersCount({
    safeAddress: safe?.address || '',
    enabled: !!safe?.address
  })
  const { data: safeThreshold } = useGetThreshold({
    safeAddress: safe?.address || '',
    enabled: !!safe?.address
  })
  const { data: safeOwners } = useGetOwners({
    safeAddress: safe?.address || '',
    enabled: !!safe?.address
  })
  const { data: transactionNonce } = useGetTransactionNonce({
    safeAddress: safe?.address || '',
    enabled: !!safe?.address
  })
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
    setAddNewOwnerOpen,
    addNewOwnerMutation,
    isAddNewOwnerModalOpen,
    requiredTransactionNonce,
    setIsChangeThresholdOpen,
    isChangeThresholdModalOpen,
    addNewOwnerMutationIsLoading,
    isCurrentConnectWalletAnOwner
  }
}
