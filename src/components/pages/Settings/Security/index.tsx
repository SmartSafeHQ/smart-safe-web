import { SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

import { Button } from '@components/Button'
import { SettingsTab } from '@components/pages/Settings'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { Security2FASection } from './Security2FA/Security2FASection'
import { Enable2FAModal } from './Security2FA/EnableSigIn2FAModal'
import { DisableSigIn2FAModal } from './Security2FA/DisableSigIn2FAModal'
import { Toggle2FA } from './Security2FA/Toggle2FA'

import { useSecuritySignIn2FA } from '@hooks/settings/useSettingsSecurity/useSecuritySignIn2FA'

export type Options = 'signIn' | 'send' | 'export-keys'

export type Verify2FAFunctionProps = SubmitHandler<{
  code: string
}>

export interface Enable2FAOptionProps {
  option: Options
  enableFunction: Verify2FAFunctionProps
  disableFunction: Verify2FAFunctionProps
}

export function SecurityTab() {
  const [enable2FAOption, setEnable2FAOption] = useState<Enable2FAOptionProps>()

  const {
    t,
    customer,
    cognitoUser,
    setupTOTPCode,
    authCode,
    setAuthCode,
    isEnable2FAOpen,
    setIsEnable2FAOpen,
    isDisable2FAOpen,
    setIsDisable2FAOpen,
    enableOnSubmit,
    disableOnSubmit
  } = useSecuritySignIn2FA()

  console.log('isEnable2FAOpen =>', isEnable2FAOpen)
  console.log('isDisable2FAOpen =>', isDisable2FAOpen)

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
        const codeToScan = await setupTOTPCode()
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
    <SettingsTab.Root>
      <SettingsTab.Header>
        <SettingsTab.Title>{t.settings.security.title}</SettingsTab.Title>

        <SettingsTab.Description>
          {t.settings.security.description}
        </SettingsTab.Description>
      </SettingsTab.Header>

      <div className="w-full py-5 flex flex-col relative justify-start items-stretch gap-5 md:gap-11">
        <div className="w-full flex flex-col justify-start items-stretch mb-2 md:mb-0">
          <strong className="pb-2 text-lg font-medium">
            {t.settings.security.subTitle01}
          </strong>

          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {t.settings.security.subTitle02}
          </span>
        </div>

        <Security2FASection.Root>
          <Security2FASection.Title>
            {t.settings.security.signInVerify}
          </Security2FASection.Title>

          <Skeleton isLoading={!customer} className="w-full h-16">
            <Toggle2FA
              option="signIn"
              isEnabled={customer?.auth2fa.signInEnabled ?? false}
              handleSetupTOTP={handleSetupTOTP}
              handleDisableTOTP={handleDisableTOTP}
              enableFunction={enableOnSubmit}
              disableFunction={disableOnSubmit}
            />
          </Skeleton>
        </Security2FASection.Root>

        <Security2FASection.Root>
          <Security2FASection.Title>
            {t.settings.security.sendTransaction}
          </Security2FASection.Title>

          <Skeleton isLoading={!customer} className="w-full h-16">
            <div className="flex items-start gap-4">
              <Button className="w-min !px-3 !py-2 text-xs">
                {t.settings.security.enable}
              </Button>

              <div className="w-full max-w-2xl flex flex-col items-start justify-start">
                <strong className="font-semibold text-left">
                  {t.settings.security.send}
                </strong>

                <Security2FASection.Description>
                  {t.settings.security.sendDescription}
                </Security2FASection.Description>
              </div>
            </div>
          </Skeleton>
        </Security2FASection.Root>

        <Security2FASection.Root>
          <Security2FASection.Title>
            {t.settings.security.privateKeys}
          </Security2FASection.Title>

          <Skeleton isLoading={!customer} className="w-full h-16">
            <div className="flex items-start gap-4">
              <Button className="w-min !px-3 !py-2 text-xs">
                {t.settings.security.enable}
              </Button>

              <div className="w-full max-w-2xl flex flex-col items-start justify-start">
                <strong className="font-semibold text-left">
                  {t.settings.security.export}
                </strong>

                <Security2FASection.Description>
                  {t.settings.security.keysDescrition}
                </Security2FASection.Description>
              </div>
            </div>
          </Skeleton>
        </Security2FASection.Root>

        <DialogModal.Root
          open={isEnable2FAOpen}
          onOpenChange={setIsEnable2FAOpen}
        >
          {enable2FAOption && (
            <Enable2FAModal
              authCode={authCode}
              onSubmit={enable2FAOption.enableFunction}
            />
          )}
        </DialogModal.Root>

        <DialogModal.Root
          open={isDisable2FAOpen}
          onOpenChange={setIsDisable2FAOpen}
        >
          {enable2FAOption && (
            <DisableSigIn2FAModal onSubmit={enable2FAOption?.disableFunction} />
          )}
        </DialogModal.Root>
      </div>
    </SettingsTab.Root>
  )
}
