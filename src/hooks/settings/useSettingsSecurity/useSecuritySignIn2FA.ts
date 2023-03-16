import { z } from 'zod'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Auth } from 'aws-amplify'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { useEnableSignIn2FAMutation } from '@hooks/settings/mutation/useEnableSignIn2FAMutation'
import { useDisableSignIn2FAMutation } from '@hooks/settings/mutation/useDisableSignIn2FAMutation'

export const security2FAvalidationSchema = z.object({
  code: z.string().min(1, { message: 'code required' })
})

export type Security2FAFieldValues = z.infer<typeof security2FAvalidationSchema>

export const useSecuritySignIn2FA = () => {
  const [authCode, setAuthCode] = useState('')
  const [isEnable2FAOpen, setIsEnable2FAOpen] = useState(false)
  const [isDisable2FAOpen, setIsDisable2FAOpen] = useState(false)

  const { mutateAsync: enableMutateAsync } = useEnableSignIn2FAMutation()
  const { mutateAsync: disableMutateAsync } = useDisableSignIn2FAMutation()

  const { customer, cognitoUser, setCustomer, signOut } = useAuth()
  const { t } = useI18n()

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

  const enableOnSubmit: SubmitHandler<Security2FAFieldValues> = async data => {
    try {
      if (!cognitoUser.signInUserSession) {
        toast.error(t.settings.security.notSigned)
        signOut()
        return
      }

      await enableMutateAsync({ cognitoUser, code: data.code })

      toast.success(t.settings.security.enableSuccessMessage)

      setCustomer(prevCustomer => {
        return (
          prevCustomer && { ...prevCustomer, auth2fa: { signInEnabled: true } }
        )
      })

      setIsEnable2FAOpen(false)
    } catch (e) {
      const error = e instanceof Error ? e : Error()
      const errorMessage = t.errors.authE.get(error.name)?.message

      toast.error(errorMessage ?? t.errors.default)
    }
  }

  const disableOnSubmit: SubmitHandler<Security2FAFieldValues> = async data => {
    try {
      if (!cognitoUser.signInUserSession) {
        toast.error(t.settings.security.notSigned)
        signOut()
        return
      }

      await disableMutateAsync({ cognitoUser, code: data.code })

      toast.success(t.settings.security.disableSuccessMessage)

      setCustomer(prevCustomer => {
        return (
          prevCustomer && { ...prevCustomer, auth2fa: { signInEnabled: false } }
        )
      })

      setIsDisable2FAOpen(false)
    } catch (e) {
      const error = e instanceof Error ? e : Error()
      const errorMessage = t.errors.authE.get(error.name)?.message

      toast.error(errorMessage ?? t.errors.default)
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
    enableOnSubmit,
    disableOnSubmit
  }
}
