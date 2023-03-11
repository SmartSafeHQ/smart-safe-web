import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SettingsTab } from '@components/pages/Seetings'
import { Enable2FASection } from '@components/pages/Seetings/Security/Enable2FASection'
import { EnableSigIn2FAModal } from '@components/pages/Seetings/Security/EnableSigIn2FAModal'

import { useI18n } from '@hooks/useI18n'

export function SecurityTab() {
  const { t } = useI18n()

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

        <DialogModal.Root>
          <Enable2FASection.Root>
            <Enable2FASection.Title>
              {t.settings.SecurityTab.signInVerify}
            </Enable2FASection.Title>

            <div className="flex items-start gap-4">
              <DialogModal.Trigger>
                <Button className="w-min !px-3 !py-2 text-xs">
                  {t.settings.SecurityTab.enable}
                </Button>
              </DialogModal.Trigger>

              <div className="w-full max-w-2xl flex flex-col items-start justify-start">
                <strong className="font-semibold text-left">
                  {t.settings.SecurityTab.signIn}
                </strong>

                <Enable2FASection.Description>
                  {t.settings.SecurityTab.signInDescription}
                </Enable2FASection.Description>
              </div>
            </div>
          </Enable2FASection.Root>

          <EnableSigIn2FAModal />
        </DialogModal.Root>

        <Enable2FASection.Root>
          <Enable2FASection.Title>
            {t.settings.SecurityTab.sendTransaction}
          </Enable2FASection.Title>

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
        </Enable2FASection.Root>

        <Enable2FASection.Root>
          <Enable2FASection.Title>
            {t.settings.SecurityTab.privateKeys}
          </Enable2FASection.Title>

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
        </Enable2FASection.Root>
      </div>
    </SettingsTab.Root>
  )
}
