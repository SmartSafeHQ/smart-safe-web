import { SettingsTab } from '@components/pages/Settings'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { Security2FASection } from './Security2FA/Security2FASection'
import { Enable2FAModal } from './Security2FA/EnableSigIn2FAModal'
import { DisableSigIn2FAModal } from './Security2FA/DisableSigIn2FAModal'
import { Toggle2FA } from './Security2FA/Toggle2FA'

import { useSettingsSecurity2FA } from '@hooks/settings/useSettingsSecurity/useSettingsSecurity2FA'

export function SecurityTab() {
  const {
    t,
    customer2FA,
    account2FAData,
    account2FAError,
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
  } = useSettingsSecurity2FA()

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

          <Skeleton isLoading={!account2FAData} className="w-full h-16">
            <Toggle2FA
              option="signIn"
              isEnabled={customer2FA?.signInEnabled ?? false}
              enableFunction={enableSignIn2FAOnSubmit}
              disableFunction={disableSignIn2FAOnSubmit}
            >
              <div className="w-full max-w-2xl flex flex-col items-start justify-start">
                <strong className="font-semibold text-left">
                  {t.settings.security.signIn}
                </strong>

                <Security2FASection.Description>
                  {t.settings.security.signInDescription}
                </Security2FASection.Description>
              </div>
            </Toggle2FA>
          </Skeleton>
        </Security2FASection.Root>

        <Security2FASection.Root>
          <Security2FASection.Title>
            {t.settings.security.sendTransaction}
          </Security2FASection.Title>

          {!!account2FAError && <span>error</span>}

          <Skeleton isLoading={!account2FAData} className="w-full h-16">
            <Toggle2FA
              option="send"
              isEnabled={customer2FA?.send2faEnabled ?? false}
              enableFunction={enableSend2FAOnSubmit}
              disableFunction={disableSend2FAOnSubmit}
            >
              <div className="w-full max-w-2xl flex flex-col items-start justify-start">
                <strong className="font-semibold text-left">
                  {t.settings.security.send}
                </strong>

                <Security2FASection.Description>
                  {t.settings.security.sendDescription}
                </Security2FASection.Description>
              </div>
            </Toggle2FA>
          </Skeleton>
        </Security2FASection.Root>

        <Security2FASection.Root>
          <Security2FASection.Title>
            {t.settings.security.privateKeys}
          </Security2FASection.Title>

          {!!account2FAError && <span>error</span>}

          <Skeleton isLoading={!account2FAData} className="w-full h-16">
            <Toggle2FA
              option="export-keys"
              isEnabled={customer2FA?.exportKeys2faEnabled ?? false}
              enableFunction={enableExportKeys2FAOnSubmit}
              disableFunction={disableExportKeys2FAOnSubmit}
            >
              <div className="w-full max-w-2xl flex flex-col items-start justify-start">
                <strong className="font-semibold text-left">
                  {t.settings.security.export}
                </strong>

                <Security2FASection.Description>
                  {t.settings.security.keysDescrition}
                </Security2FASection.Description>
              </div>
            </Toggle2FA>
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
