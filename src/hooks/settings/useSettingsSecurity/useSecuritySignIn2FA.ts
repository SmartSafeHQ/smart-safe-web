import { z } from 'zod'
import { SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { useSecurity2FA } from '@contexts/Security2FAContext'
import { getAuthErrorMessageWithToast } from '@utils/sessionsUtils'
import { useEnableSignIn2FAMutation } from '../mutation/useEnableSignIn2FAMutation'
import { useDisableSignIn2FAMutation } from '../mutation/useDisableSignIn2FAMutation'
import { useEnableSend2FAMutation } from '../mutation/useEnableSend2FAMutation'
import { useDisableSend2FAMutation } from '../mutation/useDisableSend2FAMutation'
import { useEnableExportKeys2FAMutation } from '../mutation/useEnableExportKeys2FAMutation'
import { useDisableExportKeys2FAMutation } from '../mutation/useDisableExportKeys2FAMutation'
import { queryClient } from '@lib/reactQuery'
import {
  fetchAccount2faSettings,
  FetchAccount2faSettingsResponse
} from '@hooks/accounts/queries/useAccount2faSettings'

export const security2FAvalidationSchema = z.object({
  code: z.string().min(1, { message: 'code required' })
})

export type Security2FAFieldValues = z.infer<typeof security2FAvalidationSchema>

export type Options = 'signIn' | 'send' | 'export-keys'

export type Verify2FAFunctionProps = SubmitHandler<{
  code: string
}>

export const useSecuritySignIn2FA = () => {
  const {
    setIsEnable2FAOpen,
    setIsDisable2FAOpen,
    isEnable2FAOpen,
    enable2FAOption,
    authCode,
    isDisable2FAOpen
  } = useSecurity2FA()

  const { mutateAsync: enableSignIn2FAMutateAsync } =
    useEnableSignIn2FAMutation()
  const { mutateAsync: disableSignIn2FAMutateAsync } =
    useDisableSignIn2FAMutation()
  const { mutateAsync: enableSend2FAMutateAsync } = useEnableSend2FAMutation()
  const { mutateAsync: disableSend2FAMutateAsync } = useDisableSend2FAMutation()
  const { mutateAsync: enableExportKeys2FAMutateAsync } =
    useEnableExportKeys2FAMutation()
  const { mutateAsync: disableExportKeys2FAMutateAsync } =
    useDisableExportKeys2FAMutation()

  const { customer, cognitoUser, customer2FA, setCustomer2FA } = useAuth()
  const { t, currentLocaleProps } = useI18n()

  useEffect(() => {
    if (!customer) return

    queryClient
      .ensureQueryData<FetchAccount2faSettingsResponse>({
        queryKey: ['account2faSettings', customer.id],
        queryFn: () => fetchAccount2faSettings({ id: customer.id })
      })
      .then(response => {
        const fields = {
          sendEnabled: response.send2faEnabled === true ?? false,
          exportKeysEnabled: response.exportKeys2faEnabled === true ?? false
        }

        updateCustomer2FAState(fields)
      })
  }, [customer])

  function updateCustomer2FAState(input: { [key: string]: boolean }) {
    setCustomer2FA(
      prev =>
        prev && {
          ...prev,
          ...input
        }
    )
  }

  const enableSignIn2FAOnSubmit: SubmitHandler<
    Security2FAFieldValues
  > = async data => {
    try {
      if (!cognitoUser.signInUserSession || !customer) return

      await enableSignIn2FAMutateAsync({ cognitoUser, code: data.code })

      toast.success(t.settings.security.enableSuccessMessage)

      updateCustomer2FAState({ signInEnabled: true })

      setIsEnable2FAOpen(false)
    } catch (e) {
      getAuthErrorMessageWithToast(e, currentLocaleProps.id)
    }
  }

  const disableSignIn2FAOnSubmit: SubmitHandler<
    Security2FAFieldValues
  > = async data => {
    try {
      if (!cognitoUser.signInUserSession || !customer) return

      await disableSignIn2FAMutateAsync({ cognitoUser, code: data.code })

      toast.success(t.settings.security.disableSuccessMessage)

      updateCustomer2FAState({ signInEnabled: false })

      setIsDisable2FAOpen(false)
    } catch (e) {
      getAuthErrorMessageWithToast(e, currentLocaleProps.id)
    }
  }

  const enableSend2FAOnSubmit: SubmitHandler<
    Security2FAFieldValues
  > = async data => {
    try {
      if (!cognitoUser.signInUserSession || !customer) return

      await enableSend2FAMutateAsync({
        cognitoUser,
        code: data.code,
        id: customer.id
      })

      toast.success(t.settings.security.enableSuccessMessage)

      updateCustomer2FAState({ sendEnabled: true })

      setIsEnable2FAOpen(false)
    } catch (e) {
      getAuthErrorMessageWithToast(e, currentLocaleProps.id)
    }
  }

  const disableSend2FAOnSubmit: SubmitHandler<
    Security2FAFieldValues
  > = async data => {
    try {
      if (!cognitoUser.signInUserSession || !customer) return

      await disableSend2FAMutateAsync({
        cognitoUser,
        code: data.code,
        id: customer.id
      })

      toast.success(t.settings.security.disableSuccessMessage)

      updateCustomer2FAState({ sendEnabled: false })

      setIsDisable2FAOpen(false)
    } catch (e) {
      getAuthErrorMessageWithToast(e, currentLocaleProps.id)
    }
  }

  const enableExportKeys2FAOnSubmit: SubmitHandler<
    Security2FAFieldValues
  > = async data => {
    try {
      if (!cognitoUser.signInUserSession || !customer) return

      await enableExportKeys2FAMutateAsync({
        cognitoUser,
        code: data.code,
        id: customer.id
      })

      toast.success(t.settings.security.enableSuccessMessage)

      updateCustomer2FAState({ exportKeysEnabled: true })

      setIsEnable2FAOpen(false)
    } catch (e) {
      getAuthErrorMessageWithToast(e, currentLocaleProps.id)
    }
  }

  const disableExportKeys2FAOnSubmit: SubmitHandler<
    Security2FAFieldValues
  > = async data => {
    try {
      if (!cognitoUser.signInUserSession || !customer) return

      await disableExportKeys2FAMutateAsync({
        cognitoUser,
        code: data.code,
        id: customer.id
      })

      toast.success(t.settings.security.disableSuccessMessage)

      updateCustomer2FAState({ exportKeysEnabled: false })

      setIsDisable2FAOpen(false)
    } catch (e) {
      getAuthErrorMessageWithToast(e, currentLocaleProps.id)
    }
  }

  return {
    t,
    customer2FA,
    isEnable2FAOpen,
    enable2FAOption,
    authCode,
    isDisable2FAOpen,
    setIsEnable2FAOpen,
    setIsDisable2FAOpen,
    enableSignIn2FAOnSubmit,
    disableSignIn2FAOnSubmit,
    enableSend2FAOnSubmit,
    disableSend2FAOnSubmit,
    enableExportKeys2FAOnSubmit,
    disableExportKeys2FAOnSubmit
  }
}
