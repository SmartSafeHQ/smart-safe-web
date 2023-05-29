import { useMemo } from 'react'
import { useWallets } from '@web3-onboard/react'

import { useSafe } from '@contexts/SafeContext'
import { useGetOwners } from '@hooks/transactions/queries/useGetOwners'
import { useListContacts } from '@hooks/addressBook/queries/useListContacts'
import { useGetThreshold } from '@hooks/transactions/queries/useGetThreshold'
import { useGetOwnersCount } from '@hooks/transactions/queries/useGetOwnersCount'
import { useRemoveOwner } from '@hooks/transactions/mutation/useRemoveOwner'
import { useAddNewOwner } from '@hooks/transactions/mutation/useAddNewOwner'
import { useGetTransactionNonce } from '@hooks/transactions/queries/useGetTransactionNonce'
import { useChangeThresholdHook } from '@hooks/smartAccount/settings/useChangeThresholdHook'

interface AddNewOwner {
  safeAddress: string
  ownerAddress: string
  newThreshold: number
  transactionNonce: number
}

interface RemoveOwner {
  safeAddress: string
  prevOwnerAddress: string
  removeOwnerAddress: string
  transactionNonce: number
}

export function useAccountManagementHook() {
  const { safe } = useSafe()
  const [wallets] = useWallets()
  const {
    changeThreshold,
    setIsChangeThresholdOpen,
    isChangeThresholdModalOpen,
    changeThresholdMutationIsLoading
  } = useChangeThresholdHook()
  const { data: contactList } = useListContacts(safe?.ownerId || '')
  const { data: transactionNonce } = useGetTransactionNonce({
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
  const { mutateAsync: addNewOwnerMutation } = useAddNewOwner()
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

  async function addNewOwner(input: AddNewOwner) {
    try {
      await addNewOwnerMutation(input)
    } catch (err) {
      console.log(err)
    }
  }

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
    addNewOwner,
    removeOwner,
    safeThreshold,
    richOwnersData,
    changeThreshold,
    transactionNonce,
    setIsChangeThresholdOpen,
    isChangeThresholdModalOpen,
    isCurrentConnectWalletAnOwner,
    changeThresholdMutationIsLoading
  }
}
