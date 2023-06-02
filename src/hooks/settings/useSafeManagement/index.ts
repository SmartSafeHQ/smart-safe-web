import { useMemo } from 'react'
import { useWallets } from '@web3-onboard/react'

import { useSafe } from '@contexts/SafeContext'
import { useSafeOwners } from '@hooks/safe/queries/useSafeOwners'
import { useContactsQuery } from '@hooks/contacts/queries/useContactsQuery'
import { useSafeThreshold } from '@hooks/safe/queries/useSafeThreshold'
import { useSafeOwnersCount } from '@hooks/safe/queries/useSafeOwnersCount'
import {
  RemoveOwnerFunctionInput,
  useRemoveOwner
} from '@hooks/safe/mutation/useRemoveOwner'
import { useAddOwnerHook } from '@hooks/settings/useSafeManagement/useAddOwnerHook'
import { useChangeThresholdHook } from '@hooks/settings/useSafeManagement/useChangeThresholdHook'
import { useSafeTxNonce } from '@hooks/safe/queries/useSafeTxNonce'
import { useSafeRequiredTxNonce } from '@hooks/safe/queries/useSafeRequiredTxNonce'

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
    safe?.chain.rpcUrl,
    !!safe
  )
  const { data: ownersCount } = useSafeOwnersCount(
    safe?.address,
    safe?.chain.rpcUrl,
    !!safe
  )
  const { data: safeThreshold } = useSafeThreshold(
    safe?.address,
    safe?.chain.rpcUrl,
    !!safe
  )
  const { data: safeOwners, error: safeOwnersError } = useSafeOwners(
    safe?.address,
    safe?.chain.rpcUrl,
    !!safe
  )
  const { data: transactionNonce } = useSafeTxNonce(
    safe?.address,
    safe?.chain.rpcUrl,
    !!safe
  )
  const { mutateAsync: removeOwnersMutation } = useRemoveOwner()

  const ownersData = useMemo(() => {
    if (!contactList || !safeOwners || !wallets) {
      return
    }

    return safeOwners.map(owner => {
      if (owner.address.toLowerCase() === wallets?.accounts[0].address) {
        return {
          address: owner.address,
          formattedAddress: owner.formattedAddress,
          name: 'You'
        }
      }

      const ownerData = contactList.find(
        ({ contactAddress }) => contactAddress === owner.address
      )

      return {
        address: ownerData?.contactAddress ?? owner.address,
        formattedAddress: ownerData?.formattedAddress ?? owner.formattedAddress,
        name: ownerData?.contactName ?? ''
      }
    })
  }, [contactList, safeOwners, wallets])

  async function removeOwner(input: RemoveOwnerFunctionInput) {
    try {
      await removeOwnersMutation(input)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    safe,
    ownersCount,
    removeOwner,
    safeThreshold,
    ownersData,
    safeOwnersError,
    transactionNonce,
    setAddOwnerOpen,
    addOwnerMutation,
    isAddOwnerModalOpen,
    requiredTransactionNonce,
    setIsChangeThresholdOpen,
    isChangeThresholdModalOpen,
    addOwnerMutationIsLoading
  }
}
