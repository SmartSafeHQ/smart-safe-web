import { useState } from 'react'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SettingsTab } from '@components/pages/Seetings'
import { Enable2FASection } from '@components/pages/Seetings/Security/Enable2FASection'
import { EnableSigIn2FAModal } from '@components/pages/Seetings/Security/EnableSigIn2FAModal'
import { DisableSigIn2FAModal } from '@components/pages/Seetings/Security/DisableSigIn2FAModal'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useSettingsSecurity } from '@hooks/settings/useSettingsSecurity/useSettingsSecurity'

export function SecurityTab() {
  const [isEnableSignInOpen, setIsEnableSignInOpen] = useState(false)
  const [isDisableSignInOpen, setIsDisableSignInOpen] = useState(false)

  const { t, customer } = useSettingsSecurity(setIsEnableSignInOpen)

  return (
    <SettingsTab.Root>
      <SettingsTab.Header>
        <SettingsTab.Title>{t.settings.SecurityTab.title}</SettingsTab.Title>

        <SettingsTab.Description>
          {t.settings.SecurityTab.description}
        </SettingsTab.Description>
      </SettingsTab.Header>

      <div className="w-full py-5 flex flex-col relative justify-start items-stretch gap-5 md:gap-11">
        <div className="w-full flex flex-col justify-start items-stretch mb-2 md:mb-0">
          <strong className="pb-2 text-lg font-medium">
            {t.settings.SecurityTab.subTitle01}
          </strong>

          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {t.settings.SecurityTab.subTitle02}
          </span>
        </div>

        <Enable2FASection.Root>
          <Enable2FASection.Title>
            {t.settings.SecurityTab.signInVerify}
          </Enable2FASection.Title>

          <Skeleton isLoading={!customer} className="w-full h-16">
            <div className="flex items-start gap-4">
              {customer?.enabled2fa ? (
                <DialogModal.Root
                  open={isDisableSignInOpen}
                  onOpenChange={setIsDisableSignInOpen}
                >
                  <DialogModal.Trigger>
                    <Button className="w-min !px-4 !py-2 text-xs" variant="red">
                      Disable
                    </Button>
                  </DialogModal.Trigger>

                  <DisableSigIn2FAModal setIsOpen={setIsDisableSignInOpen} />
                </DialogModal.Root>
              ) : (
                <DialogModal.Root
                  open={isEnableSignInOpen}
                  onOpenChange={setIsEnableSignInOpen}
                >
                  <DialogModal.Trigger>
                    <Button className="w-min !px-3 !py-2 text-xs">
                      {t.settings.SecurityTab.enable}
                    </Button>
                  </DialogModal.Trigger>

                  <EnableSigIn2FAModal setIsOpen={setIsEnableSignInOpen} />
                </DialogModal.Root>
              )}

              <div className="w-full max-w-2xl flex flex-col items-start justify-start">
                <strong className="font-semibold text-left">
                  {t.settings.SecurityTab.signIn}
                </strong>

                <Enable2FASection.Description>
                  {t.settings.SecurityTab.signInDescription}
                </Enable2FASection.Description>
              </div>
            </div>
          </Skeleton>
        </Enable2FASection.Root>

        <Enable2FASection.Root>
          <Enable2FASection.Title>
            {t.settings.SecurityTab.sendTransaction}
          </Enable2FASection.Title>

          <Skeleton isLoading={!customer} className="w-full h-16">
            <div className="flex items-start gap-4">
              <Button className="w-min !px-3 !py-2 text-xs">
                {t.settings.SecurityTab.enable}
              </Button>

              <div className="w-full max-w-2xl flex flex-col items-start justify-start">
                <strong className="font-semibold text-left">
                  {t.settings.SecurityTab.send}
                </strong>

                <Enable2FASection.Description>
                  {t.settings.SecurityTab.sendDescription}
                </Enable2FASection.Description>
              </div>
            </div>
          </Skeleton>
        </Enable2FASection.Root>

        <Enable2FASection.Root>
          <Enable2FASection.Title>
            {t.settings.SecurityTab.privateKeys}
          </Enable2FASection.Title>

          <Skeleton isLoading={!customer} className="w-full h-16">
            <div className="flex items-start gap-4">
              <Button className="w-min !px-3 !py-2 text-xs">
                {t.settings.SecurityTab.enable}
              </Button>

              <div className="w-full max-w-2xl flex flex-col items-start justify-start">
                <strong className="font-semibold text-left">
                  {t.settings.SecurityTab.export}
                </strong>

                <Enable2FASection.Description>
                  {t.settings.SecurityTab.keysDescrition}
                </Enable2FASection.Description>
              </div>
            </div>
          </Skeleton>
        </Enable2FASection.Root>
      </div>
    </SettingsTab.Root>
  )
}
