import { useMemo } from 'react'
import { useWallets } from '@web3-onboard/react'
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
import { useCreateContact } from '@hooks/contacts/mutations/useCreateContact'

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
  const [wallets] = useWallets()

  const { mutateAsync: addOwnerMutation } = useAddOwner()
  const { mutateAsync: changeThresholdMutation } = useChangeThreshold()
  const { mutateAsync: createContactMutation } = useCreateContact()
  const { data: contactList } = useContactsQuery(safe?.ownerId, !!safe)

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

  return {
    safe,
    safeThreshold,
    ownersData,
    safeOwners,
    safeOwnersError,
    transactionNonce,
    addOwnerMutation,
    changeThresholdMutation,
    createContactMutation,
    thresholdIsFetching,
    safeOwnersIsFetching,
    isAddOwnerOpen,
    setIsAddOwnerOpen,
    setIsChangeThresholdOpen,
    isChangeThresholdOpen
  }
}