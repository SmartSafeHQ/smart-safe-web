import { ethers } from 'ethers'
import { z } from 'zod'

import { SAFE_NAME_REGEX } from '@hooks/safes/create/useCreateSafeHook'

export const validationSchema = z.object({
  name: z
    .string()
    .min(1, 'name required')
    .regex(
      SAFE_NAME_REGEX,
      'Invalid contact name. Ensure that it does not contain any special characters, spaces, or more than 20 letters'
    ),
  owners: z
    .array(
      z.object({
        name: z.string().min(1, 'Owner name required'),
        address: z
          .string()
          .min(1, 'Owner address required')
          .refine(address => {
            const isAddressValid = ethers.isAddress(address)

            return isAddressValid
          }, 'Invalid owner address')
      })
    )
    .min(1, {
      message: 'At least 1 owner must be assigned.'
    })
    .refine(addresses => {
      // Check that the current address is unique
      const checkSomeOwnerAddressIsRepeated = addresses.find((owner, index) => {
        const findSomeOwnerWithSameAddress = addresses.some(
          (someOwner, someIndex) =>
            !!owner.address &&
            someIndex !== index &&
            someOwner.address === owner.address
        )

        return findSomeOwnerWithSameAddress
      })

      return !checkSomeOwnerAddressIsRepeated
    }, "Each safe owner's address must be unique."),
  threshold: z.string().min(1, 'Signatures count required')
})

export type FieldValues = z.infer<typeof validationSchema>
