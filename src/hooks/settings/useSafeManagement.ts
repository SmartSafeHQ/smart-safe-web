import { useMemo } from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'
import { z } from 'zod'

import { useSafe } from '@contexts/SafeContext'
import { useSafeOwners } from '@hooks/safe/queries/useSafeOwners'
import { useContactsQuery } from '@hooks/contacts/queries/useContactsQuery'
import { useSafeThreshold } from '@hooks/safe/queries/useSafeThreshold'
import { useSafeTxNonce } from '@hooks/safe/queries/useSafeTxNonce'
import { useAddOwner } from '@hooks/safe/mutation/useAddOwner'
import { useChangeThreshold } from '@hooks/safe/mutation/useChangeThreshold'
import { useSafeManagement } from '@contexts/settings/SafeManagementContext'
import { CONTACT_NAME_REGEX } from '@hooks/contacts/useContactsHook'
import { useAddOwnerRegistry } from '@hooks/settings/mutations/useAddOwnerRegistry'

export const addOwnerValidationSchema = z.object({
  ownerName: z
    .string()
    .min(3, 'name required')
    .regex(
      CONTACT_NAME_REGEX,
      'Invalid contact name. Ensure that it does not contain any special characters, spaces, or more than 20 letters'
    ),
  ownerAddress: z.string().refine(address => {
    const isAddressValid = ethers.isAddress(address)

    return isAddressValid
  }, 'Invalid owner address'),
  threshold: z.string().min(1)
})

export type AddOwnerFieldValues = z.infer<typeof addOwnerValidationSchema>

export const useSafeManagementHook = () => {
  const { safe } = useSafe()
  const {
    isAddOwnerOpen,
    setIsAddOwnerOpen,
    isChangeThresholdOpen,
    setIsChangeThresholdOpen
  } = useSafeManagement()
  const [{ wallet }] = useConnectWallet()

  const { mutateAsync: addOwnerMutation } = useAddOwner()
  const { mutateAsync: changeThresholdMutation } = useChangeThreshold()
  const { mutateAsync: addOwnerRegistryMutation } = useAddOwnerRegistry()
  const { data: contacts } = useContactsQuery(
    wallet?.accounts[0].address,
    !!wallet
  )

  const { data: safeThreshold, isFetching: thresholdIsFetching } =
    useSafeThreshold(safe?.address, safe?.chain.rpcUrl, !!safe)
  const {
    data: safeOwners,
    isFetching: safeOwnersIsFetching,
    error: safeOwnersError
  } = useSafeOwners(safe?.address, safe?.chain.rpcUrl, !!safe)
  const { data: transactionNonce } = useSafeTxNonce(
    safe?.address,
    safe?.chain.rpcUrl,
    !!safe
  )

  const ownersData = useMemo(() => {
    if (!contacts || !safeOwners || !wallet) {
      return
    }

    return safeOwners.map(owner => {
      if (owner.address.toLowerCase() === wallet?.accounts[0].address) {
        return {
          address: owner.address,
          formattedAddress: owner.formattedAddress,
          name: 'You'
        }
      }

      const ownerData = contacts.find(
        ({ address }) => address === owner.address
      )

      return {
        address: ownerData?.address ?? owner.address,
        formattedAddress: ownerData?.formattedAddress ?? owner.formattedAddress,
        name: ownerData?.name ?? ''
      }
    })
  }, [contacts, safeOwners, wallet])

  return {
    safe,
    safeThreshold,
    ownersData,
    safeOwners,
    safeOwnersError,
    transactionNonce,
    addOwnerMutation,
    changeThresholdMutation,
    addOwnerRegistryMutation,
    thresholdIsFetching,
    safeOwnersIsFetching,
    isAddOwnerOpen,
    setIsAddOwnerOpen,
    setIsChangeThresholdOpen,
    isChangeThresholdOpen
  }
}
