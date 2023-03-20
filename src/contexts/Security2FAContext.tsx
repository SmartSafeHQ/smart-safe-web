import { Auth } from 'aws-amplify'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

import { useAuth } from '@contexts/AuthContext'
import {
  Options,
  Verify2FAFunctionProps
} from '@/hooks/settings/useSettingsSecurity/useSettingsSecurity2FA'

export type CustomerProps = {
  cognitoId: string
}

type Security2FAProviderProps = PropsWithChildren<Record<string, unknown>>

export interface Enable2FAOptionProps {
  option: Options
  enableFunction: Verify2FAFunctionProps
  disableFunction: Verify2FAFunctionProps
}

type Security2FAContextData = {
  authCode: string
  isEnable2FAOpen: boolean
  isDisable2FAOpen: boolean
  enable2FAOption?: Enable2FAOptionProps
  setAuthCode: (_authCode: string) => void
  setIsEnable2FAOpen: (_isOpen: boolean) => void
  setIsDisable2FAOpen: (_isOpen: boolean) => void
  setEnable2FAOption: (_option: Enable2FAOptionProps) => void
  handleSetupTOTP: (
    _option: Options,
    _enableFunction: Verify2FAFunctionProps,
    _disableFunction: Verify2FAFunctionProps
  ) => Promise<void>
  handleDisableTOTP: (
    _option: Options,
    _enableFunction: Verify2FAFunctionProps,
    _disableFunction: Verify2FAFunctionProps
  ) => Promise<void>
}

const Security2FAContext = createContext({} as Security2FAContextData)

export function Security2FAProvider({ children }: Security2FAProviderProps) {
  const [authCode, setAuthCode] = useState('')
  const [isEnable2FAOpen, setIsEnable2FAOpen] = useState(false)
  const [isDisable2FAOpen, setIsDisable2FAOpen] = useState(false)
  const [enable2FAOption, setEnable2FAOption] = useState<Enable2FAOptionProps>()

  const { cognitoUser, customer } = useAuth()

  async function handleSetupTOTP(
    option: Options,
    enableFunction: Verify2FAFunctionProps,
    disableFunction: Verify2FAFunctionProps
  ) {
    if (!cognitoUser) return

    setEnable2FAOption({
      option,
      enableFunction,
      disableFunction
    })

    setIsEnable2FAOpen(true)

    try {
      if (!authCode) {
        const code = await Auth.setupTOTP(cognitoUser)

        const codeToScan = `otpauth://totp/InWallet:${customer?.email}?secret=${code}&issuer=InWallet`

        setAuthCode(codeToScan)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDisableTOTP(
    option: Options,
    enableFunction: Verify2FAFunctionProps,
    disableFunction: Verify2FAFunctionProps
  ) {
    if (!cognitoUser) return

    setAuthCode('')
    setIsDisable2FAOpen(true)
    setEnable2FAOption({
      option,
      enableFunction,
      disableFunction
    })
  }

  return (
    <Security2FAContext.Provider
      value={{
        authCode,
        isEnable2FAOpen,
        isDisable2FAOpen,
        enable2FAOption,
        setAuthCode,
        setIsEnable2FAOpen,
        setIsDisable2FAOpen,
        setEnable2FAOption,
        handleSetupTOTP,
        handleDisableTOTP
      }}
    >
      {children}
    </Security2FAContext.Provider>
  )
}

export const useSecurity2FA = () => useContext(Security2FAContext)
