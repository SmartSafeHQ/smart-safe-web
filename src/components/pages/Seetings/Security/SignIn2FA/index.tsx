import { useState } from 'react'

import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { Security2FASection } from '@components/pages/Seetings/Security/Security2FASection'
import { DisableSigIn2FAModal } from '@components/pages/Seetings/Security/SignIn2FA/DisableSigIn2FAModal'
import { EnableSigIn2FAModal } from '@components/pages/Seetings/Security/SignIn2FA/EnableSigIn2FAModal'

import { useSecuritySignIn2FA } from '@hooks/settings/useSettingsSecurity/useSecuritySignIn2FA'

export function SignIn2FA() {
  const [isEnableSignInOpen, setIsEnableSignInOpen] = useState(false)
  const [isDisableSignInOpen, setIsDisableSignInOpen] = useState(false)

  const { t, customer, authCode, setupTOTPCode } = useSecuritySignIn2FA(
    setIsEnableSignInOpen
  )

  return (
    <div className="flex items-start gap-4">
      {customer?.auth2fa.signInEnabled ? (
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
          onOpenChange={open => {
            if (!authCode) {
              setupTOTPCode()
            }

            setIsEnableSignInOpen(open)
          }}
        >
          <DialogModal.Trigger>
            <Button className="w-min !px-3 !py-2 text-xs">
              {t.settings.security.enable}
            </Button>
          </DialogModal.Trigger>

          <EnableSigIn2FAModal
            authCode={authCode}
            setIsOpen={setIsEnableSignInOpen}
          />
        </DialogModal.Root>
      )}

      <div className="w-full max-w-2xl flex flex-col items-start justify-start">
        <strong className="font-semibold text-left">
          {t.settings.security.signIn}
        </strong>

        <Security2FASection.Description>
          {t.settings.security.signInDescription}
        </Security2FASection.Description>
      </div>
    </div>
  )
}
