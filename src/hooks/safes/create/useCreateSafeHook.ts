import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { useCreateSafe } from '@contexts/create-safe/CreateSafeContext'

export const SAFE_NAME_REGEX = /^[A-Za-z0-9_-]{1,20}$/

const validationSchema = z.object({
  name: z
    .string()
    .min(1, 'name required')
    .regex(
      SAFE_NAME_REGEX,
      'Invalid contact name. Ensure that it does not contain any special characters, spaces, or more than 20 letters'
    ),
  chainId: z.string().min(1, 'chain required')
})

export type FieldValues = z.infer<typeof validationSchema>

export const useCreateSafeHook = () => {
  const [{ wallet }] = useConnectWallet()
  const { push } = useRouter()

  const [, setChain] = useSetChain()
  const { safeInfos, setSafeInfos } = useCreateSafe()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      const checkWalletChainPermission = wallet?.chains.find(
        chain => chain.id === data.chainId
      )

      if (!checkWalletChainPermission) {
        const isChainChanged = await setChain({ chainId: data.chainId })

        if (!isChainChanged) return
      }

      const findSelectedChainInSupportedList = CHAINS_ATTRIBUTES.find(
        chain => chain.chainId === data.chainId
      )

      if (!findSelectedChainInSupportedList) {
        toast.error('Chain not found in supported chain list')
        return
      }

      setSafeInfos({
        name: data.name,
        chain: findSelectedChainInSupportedList
      })

      push('/create-safe')
    } catch (error) {
      console.log(error)

      const errorMessage = (error as Error)?.message

      toast.error(errorMessage)
    }
  }

  return {
    handleSubmit,
    onSubmit,
    control,
    safeInfos,
    wallet,
    setChain,
    register,
    errors,
    isSubmitting
  }
}
