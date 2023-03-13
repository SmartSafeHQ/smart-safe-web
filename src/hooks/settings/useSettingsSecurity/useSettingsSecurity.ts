import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Auth } from 'aws-amplify'
import { z } from 'zod'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'

const validationSchema = z.object({
  code: z.string().min(1, { message: 'code required' })
})

export type SecurityFieldValues = z.infer<typeof validationSchema>

export const useSettingsSecurity = (setIsOpen: (_isOpen: boolean) => void) => {
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

  const { cognitoUser, customer, setCustomer, signOut } = useAuth()
  const { t } = useI18n()

  const enableOnSubmit: SubmitHandler<SecurityFieldValues> = async data => {
    try {
      if (!cognitoUser.signInUserSession) {
        toast.error('User not signed, please login')
        signOut()
        return
      }

      await Auth.verifyTotpToken(cognitoUser, data.code.replace(/\s/g, ''))
      Auth.setPreferredMFA(cognitoUser, 'TOTP')

      toast.success(t.settings.SecurityTab.successMessage)

      setCustomer(prevCustomer => {
        return prevCustomer && { ...prevCustomer, enabled2fa: true }
      })

      enableReset()
      setIsOpen(false)
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  const disableOnSubmit: SubmitHandler<SecurityFieldValues> = async data => {
    try {
      if (!cognitoUser.signInUserSession) {
        toast.error('User not signed, please login')
        signOut()
        return
      }

      await Auth.verifyTotpToken(cognitoUser, data.code.replace(/\s/g, ''))
      await Auth.setPreferredMFA(cognitoUser, 'NOMFA')

      toast.success(t.settings.SecurityTab.successMessage)

      setCustomer(prevCustomer => {
        return prevCustomer && { ...prevCustomer, enabled2fa: false }
      })

      disableReset()
      setIsOpen(false)
    } catch (error) {
      toast.error(`Error. ${(error as Error).message}`)
    }
  }

  useEffect(() => {
    if (!cognitoUser || authCode) return

    Auth.setupTOTP(cognitoUser)
      .then(code => {
        const codeToScan =
          'otpauth://totp/AWSCognito:' +
          cognitoUser.username +
          '?secret=' +
          code +
          '&issuer=Cognito'

        setAuthCode(codeToScan)
      })
      .catch(e => {
        console.log(e)
      })
  }, [cognitoUser])

  return {
    t,
    authCode,
    customer,
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
