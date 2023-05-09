import { useConnectWallet } from '@web3-onboard/react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import { z } from 'zod'

import { useCreateSafe } from '@contexts/create-safe/CreateSafeContext'
import { useWallet } from '@contexts/WalletContext'
import { SAFE_NAME_REGEX } from '@hooks/safes/create/useCreateSafeHook'
import { useDeploySafeMutation } from '@hooks/safes/create/mutation/useDeploySafeMutation'

const validationSchema = z.object({
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
            const isAddressValid = ethers.utils.isAddress(address)

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
  requiredSignaturesCount: z.string().min(1, 'Signatures count required')
})

export type FieldValues = z.infer<typeof validationSchema>

export const useDeploySafeHook = () => {
  const { push } = useRouter()
  const [{ wallet }] = useConnectWallet()
  const { formattedAddress } = useWallet()
  const { safeInfos, deployStatus, setDeployStatus } = useCreateSafe()
  const { mutateAsync: mutateDeploySafe } = useDeploySafeMutation()

  const formMethods = useForm<FieldValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      owners: [{ name: '', address: wallet?.accounts[0].address }]
    }
  })

  const {
    control,
    register,
    trigger,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = formMethods

  const {
    fields: ownersFields,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'owners'
  })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      if (!safeInfos) throw new Error('no safe infos available')

      setDeployStatus({ isLoading: true, isDeployed: false })

      const docHeight = document.documentElement.scrollHeight

      window.scrollTo({
        top: docHeight,
        behavior: 'smooth'
      })

      const response = await mutateDeploySafe({
        safeName: data.name,
        safeNetwork: safeInfos.chain.chainId,
        requiredSignaturesCount: +data.requiredSignaturesCount,
        owners: data.owners
      })

      setDeployStatus({
        isLoading: false,
        isDeployed: true,
        safeId: response.id
      })
    } catch (error) {
      console.log(error)

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

      setDeployStatus({ isLoading: false, isDeployed: false })

      let errorMessage = (error as Error)?.message

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response?.data?.message
      }

      toast.error(errorMessage)
    }
  }

  async function addNewOwner() {
    const checkLastOwnerFieldsIdValid = await trigger('owners')

    if (!checkLastOwnerFieldsIdValid) return

    append({ name: '', address: '' })
  }

  useEffect(() => {
    if (!wallet || !formattedAddress || !safeInfos) push('/')
  })

  return {
    push,
    wallet,
    formattedAddress,
    safeInfos,
    formMethods,
    handleSubmit,
    onSubmit,
    errors,
    ownersFields,
    register,
    remove,
    watch,
    addNewOwner,
    control,
    isSubmitting,
    deployStatus
  }
}