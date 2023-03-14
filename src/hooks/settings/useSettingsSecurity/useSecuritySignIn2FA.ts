import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Auth } from 'aws-amplify'
import { z } from 'zod'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { useEnableSignIn2FAMutation } from '@hooks/settings/mutation/useEnableSignIn2FAMutation'
import { useDisableSignIn2FAMutation } from '@hooks/settings/mutation/useDisableSignIn2FAMutation'

const validationSchema = z.object({
  code: z.string().min(1, { message: 'code required' })
})

type SecurityFieldValues = z.infer<typeof validationSchema>

export const useSecuritySignIn2FA = (setIsOpen: (_isOpen: boolean) => void) => {
  const [authCode, setAuthCode] = useState('')

  const {
    register: enableRegister,
    handleSubmit: enableHandleSubmit,
    formState: enableFormState,
    reset: enableReset
  } = useForm<SecurityFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const {
    register: disableRegister,
    handleSubmit: disableHandleSubmit,
    formState: disableFormState,
    reset: disableReset
  } = useForm<SecurityFieldValues>({
    resolver: zodResolver(validationSchema)
  })

  const { mutateAsync: enableMutateAsync } = useEnableSignIn2FAMutation()
  const { mutateAsync: disableMutateAsync } = useDisableSignIn2FAMutation()

  const { cognitoUser, customer, setCustomer, signOut } = useAuth()
  const { t } = useI18n()

  const enableOnSubmit: SubmitHandler<SecurityFieldValues> = async data => {
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

      enableReset()
      setIsOpen(false)
    } catch (e) {
      const error = e instanceof Error ? e : Error()
      const errorMessage = t.errors.authE.get(error.name)?.message

      toast.error(errorMessage ?? t.errors.default)
    }
  }

  const disableOnSubmit: SubmitHandler<SecurityFieldValues> = async data => {
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

      disableReset()
      setIsOpen(false)
    } catch (e) {
      const error = e instanceof Error ? e : Error()
      const errorMessage = t.errors.authE.get(error.name)?.message

      toast.error(errorMessage ?? t.errors.default)
    }
  }

  async function setupTOTPCode() {
    if (!cognitoUser) return

    try {
      const code = await Auth.setupTOTP(cognitoUser)

      const codeToScan =
        'otpauth://totp/AWSCognito:' +
        cognitoUser.username +
        '?secret=' +
        code +
        '&issuer=Cognito'

      setAuthCode(codeToScan)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    t,
    authCode,
    customer,
    setupTOTPCode,
    enableOnSubmit,
    disableOnSubmit,
    enableRegister,
    enableHandleSubmit,
    enableFormState,
    disableRegister,
    disableHandleSubmit,
    disableFormState
  }
}
