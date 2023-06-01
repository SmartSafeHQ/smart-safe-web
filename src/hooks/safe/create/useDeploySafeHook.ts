import { useConnectWallet } from '@web3-onboard/react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'

import {
  DEFAULT_STEPS,
  StepProps,
  useCreateSafe
} from '@contexts/CreateSafeContext'
import {
  validationSchema,
  FieldValues
} from '@hooks/safe/create/deploySafeValidationSchema'
import { useSafe } from '@contexts/SafeContext'
import { useDeploySafeProxyMutation } from '@hooks/safe/create/mutation/useDeploySafeProxyMutation'
import { useSaveSmartSafeProxyData } from '@hooks/safe/create/mutation/useSaveSmartSafeProxyData'
import { useAddressSafes } from '@hooks/safe/queries/useAddressSafes'
import { getWe3ErrorMessageWithToast } from '@utils/web3/errors'

export const useDeploySafeHook = () => {
  const { push } = useRouter()
  const [{ wallet }] = useConnectWallet()
  const { formattedOwnerAddress } = useSafe()
  const { safeInfos, deployStatus, setDeployStatus } = useCreateSafe()
  const { mutateAsync: mutateDeploySafe } = useDeploySafeProxyMutation()
  const { mutateAsync: mutateSaveSmartSafeProxyData } =
    useSaveSmartSafeProxyData()
  const { refetch: refetchAddressSafes } = useAddressSafes(
    wallet?.accounts[0].address,
    !!wallet?.accounts[0]
  )

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
    getValues,
    setValue,
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

  function addStatusStep(steps: StepProps[]) {
    setDeployStatus(prev => {
      const prevSteps: StepProps[] =
        prev?.steps.map(step => ({ ...step, status: 'success' })) ?? []

      return {
        isDeployEnabled: true,
        steps: [...prevSteps, ...steps]
      }
    })
  }

  function addErrorToLastStatusStep(message: string) {
    setDeployStatus(prev => {
      const updattedSteps: StepProps[] = prev?.steps ?? []
      const stepErrorIndex = updattedSteps.length - 1

      const errorStep: StepProps = {
        status: 'error',
        message: updattedSteps[stepErrorIndex].message,
        error: message
      }

      updattedSteps[stepErrorIndex] = errorStep

      return {
        isDeployEnabled: false,
        steps: updattedSteps
      }
    })
  }

  function resetToDefaultSteps() {
    setDeployStatus({ steps: DEFAULT_STEPS, isDeployEnabled: true })
  }

  function finishDeploySuccess(safeAddress: string) {
    setDeployStatus(prev => {
      const prevSteps: StepProps[] =
        prev?.steps.map(step => ({ ...step, status: 'success' })) ?? []

      return {
        isDeployEnabled: true,
        safeAddress,
        steps: prevSteps
      }
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      if (!safeInfos || !wallet) throw new Error('no safe infos available')

      resetToDefaultSteps()

      addStatusStep([
        {
          status: 'loading',
          message: 'Waiting for your confirmation...'
        }
      ])

      const docHeight = document.documentElement.scrollHeight

      window.scrollTo({
        top: docHeight,
        behavior: 'smooth'
      })

      const { safeAddress, transaction } = await mutateDeploySafe({
        provider: wallet.provider,
        safeName: data.name,
        deployWalletAddress: wallet.accounts[0].address,
        chain: {
          id: safeInfos.chain.chainId,
          name: safeInfos.chain.networkName,
          symbol: safeInfos.chain.symbol
        },
        threshold: +data.threshold,
        owners: data.owners
      })

      addStatusStep([
        {
          status: 'loading',
          message: 'Processing transaction on the blockchain...'
        }
      ])

      // 1 - XDC addresses starts with `xdc` instead of `0x` e.g: `xdc8E6f42979b5517206Cf9e69A969Fac961D1b36B7`
      // for this reason, `await transaction.wait()` will throw an error, because it expects XDC network to return
      // and address starting with `0x`, but the network returns and address stating with `xdc`
      if (!safeInfos.chain.networkName.startsWith('XDC')) {
        await transaction.wait()
      }

      await mutateSaveSmartSafeProxyData({
        chainId: safeInfos.chain.chainId,
        deployWalletAddress: wallet.accounts[0].address,
        owners: data.owners,
        safeName: data.name,
        smartSafeProxyAddress: safeAddress
      })

      finishDeploySuccess(safeAddress)
      refetchAddressSafes()
    } catch (err) {
      const error = err as Error & { code?: string }

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

      error?.code === 'ACTION_REJECTED'
        ? addErrorToLastStatusStep('User rejected transaction')
        : addErrorToLastStatusStep('Unknown error')

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        console.error(error)

        const errorMessage = error.response?.data?.message ?? error.message
        toast.error(errorMessage)

        return
      }

      getWe3ErrorMessageWithToast(error)
    }
  }

  async function addNewOwner() {
    const checkLastOwnerFieldsIdValid = await trigger('owners')

    if (!checkLastOwnerFieldsIdValid) return

    append({ name: '', address: '' })
  }

  function removeOwner(index: number | number[]) {
    // check if there are more required signatures than owners
    const threshold = +getValues('threshold')
    const updattedOwnersCount = ownersFields.length - 1

    if (threshold > updattedOwnersCount) {
      setValue('threshold', String(updattedOwnersCount))
    }

    remove(index)
  }

  useEffect(() => {
    if (!wallet || !formattedOwnerAddress || !safeInfos) {
      console.log('wallet =>', wallet)
      console.log('formattedOwnerAddress =>', formattedOwnerAddress)
      console.log('safeInfos =>', safeInfos)

      push('/').then(() =>
        toast.error(
          'An unknown error occurred retrieving safe information. Please try again.'
        )
      )
    }
  }, [wallet, formattedOwnerAddress, safeInfos])

  return {
    push,
    wallet,
    formattedOwnerAddress,
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
    removeOwner,
    control,
    isSubmitting,
    deployStatus
  }
}
