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

  const { register, handleSubmit, formState, reset } =
    useForm<SecurityFieldValues>({
      resolver: zodResolver(validationSchema)
    })

  const { cognitoUser, signOut } = useAuth()
  const { t } = useI18n()

  const onSubmit: SubmitHandler<SecurityFieldValues> = async data => {
    // await Auth.setPreferredMFA(cognitoUser, 'NOMFA')

    try {
      if (!cognitoUser.signInUserSession) {
        toast.error('User not signed, please login')
        signOut()
        return
      }

      await Auth.verifyTotpToken(cognitoUser, data.code)
      Auth.setPreferredMFA(cognitoUser, 'TOTP')

      toast.success(t.settings.SecurityTab.successMessage)

      reset()
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
    register,
    handleSubmit,
    formState,
    onSubmit
  }
}
