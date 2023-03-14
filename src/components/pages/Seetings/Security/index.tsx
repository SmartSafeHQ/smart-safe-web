import { Button } from '@components/Button'
import { SettingsTab } from '@components/pages/Seetings'
import { Security2FASection } from '@components/pages/Seetings/Security/Security2FASection'
import { SignIn2FA } from '@components/pages/Seetings/Security/SignIn2FA'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useAuth } from '@contexts/AuthContext'
import { useI18n } from '@hooks/useI18n'

export function SecurityTab() {
  const { customer } = useAuth()
  const { t } = useI18n()

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
            <SignIn2FA />
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
      </div>
    </SettingsTab.Root>
  )
}
