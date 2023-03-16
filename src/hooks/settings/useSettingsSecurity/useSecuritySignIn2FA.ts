import { z } from 'zod'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Auth } from 'aws-amplify'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { getAuthErrorMessageWithToast } from '@utils/sessionsUtils'
import { useEnableSignIn2FAMutation } from '../mutation/useEnableSignIn2FAMutation'
import { useDisableSignIn2FAMutation } from '../mutation/useDisableSignIn2FAMutation'
import { useEnableSend2FAMutation } from '../mutation/useEnableSend2FAMutation'
import { useDisableSend2FAMutation } from '../mutation/useDisableSend2FAMutation'
import { useEnableExportKeys2FAMutation } from '../mutation/useEnableExportKeys2FAMutation'
import { useDisableExportKeys2FAMutation } from '../mutation/useDisableExportKeys2FAMutation'

export const security2FAvalidationSchema = z.object({
  code: z.string().min(1, { message: 'code required' })
})

export type Security2FAFieldValues = z.infer<typeof security2FAvalidationSchema>

export const useSecuritySignIn2FA = () => {
  const [authCode, setAuthCode] = useState('')
  const [isEnable2FAOpen, setIsEnable2FAOpen] = useState(false)
  const [isDisable2FAOpen, setIsDisable2FAOpen] = useState(false)

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

  const { customer, cognitoUser, setCustomer, signOut } = useAuth()
  const { t, currentLocaleProps } = useI18n()

  async function setupTOTPCode() {
    const code = await Auth.setupTOTP(cognitoUser)

    const codeToScan =
      'otpauth://totp/AWSCognito:' +
      cognitoUser.username +
      '?secret=' +
      code +
      '&issuer=Cognito'

    return codeToScan
  }

  function validateUserSession() {
    if (!cognitoUser.signInUserSession) {
      toast.error(t.settings.security.notSigned)
      signOut()
    }
  }

  function updateCustomer2FAState(input: { [key: string]: boolean }) {
    setCustomer(
      prevCustomer =>
        prevCustomer && {
          ...prevCustomer,
          auth2fa: { ...prevCustomer.auth2fa, ...input }
        }
    )
  }

  const enableSignIn2FAOnSubmit: SubmitHandler<
    Security2FAFieldValues
  > = async data => {
    try {
      validateUserSession()

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
      validateUserSession()

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
      validateUserSession()

      await enableSend2FAMutateAsync({ cognitoUser, code: data.code })

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
      validateUserSession()

      await disableSend2FAMutateAsync({ cognitoUser, code: data.code })

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
      validateUserSession()

      await enableExportKeys2FAMutateAsync({ cognitoUser, code: data.code })

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
      validateUserSession()

      await disableExportKeys2FAMutateAsync({ cognitoUser, code: data.code })

      toast.success(t.settings.security.disableSuccessMessage)

      updateCustomer2FAState({ exportKeysEnabled: false })

      setIsDisable2FAOpen(false)
    } catch (e) {
      getAuthErrorMessageWithToast(e, currentLocaleProps.id)
    }
  }

  return {
    t,
    customer,
    cognitoUser,
    authCode,
    setAuthCode,
    isEnable2FAOpen,
    isDisable2FAOpen,
    setIsEnable2FAOpen,
    setIsDisable2FAOpen,
    setupTOTPCode,
    enableSignIn2FAOnSubmit,
    disableSignIn2FAOnSubmit,
    enableSend2FAOnSubmit,
    disableSend2FAOnSubmit,
    enableExportKeys2FAOnSubmit,
    disableExportKeys2FAOnSubmit
  }
}
