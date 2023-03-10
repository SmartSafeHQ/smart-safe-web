import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SettingsTab } from '@components/pages/Seetings'
import { Enable2FASection } from '@components/pages/Seetings/Security/Enable2FASection'

export function SecurityTab() {
  return (
    <SettingsTab.Root>
      <SettingsTab.Header>
        <SettingsTab.Title>
          Manage your security verifications in InWallet
        </SettingsTab.Title>

        <SettingsTab.Description>
          Choose which operations will require security checks.
        </SettingsTab.Description>
      </SettingsTab.Header>

      <div className="w-full py-5 flex flex-col relative justify-start items-stretch gap-5 md:gap-11">
        <div className="w-full flex flex-col justify-start items-stretch mb-2 md:mb-0">
          <strong className="pb-2 text-lg font-medium">
            Two-factor authentication
          </strong>

          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Manage your account two-factor auth
          </span>
        </div>

        <Enable2FASection.Root>
          <Enable2FASection.Title>SignIn verifications</Enable2FASection.Title>

          <div className="flex items-start gap-4">
            <DialogModal.Trigger>
              <Button className="w-min !px-3 !py-2 text-xs">Enable</Button>
            </DialogModal.Trigger>

            <div className="w-full max-w-2xl flex flex-col items-start justify-start">
              <strong className="font-semibold text-left">SignIn</strong>

              <Enable2FASection.Description>
                Two-factor authentication adds an additional layer of security
                to your account by requiring more than just a password to sign
                in.
              </Enable2FASection.Description>
            </div>
          </div>
        </Enable2FASection.Root>

        <Enable2FASection.Root>
          <Enable2FASection.Title>Send transaction</Enable2FASection.Title>

          <div className="flex items-start gap-4">
            <Button className="w-min !px-3 !py-2 text-xs">Enable</Button>

            <div className="w-full max-w-2xl flex flex-col items-start justify-start">
              <strong className="font-semibold text-left">Send</strong>

              <Enable2FASection.Description>
                Secure your funds with two-factor authentication on transact
                funds for extra protection.
              </Enable2FASection.Description>
            </div>
          </div>
        </Enable2FASection.Root>

        <Enable2FASection.Root>
          <Enable2FASection.Title>Private keys</Enable2FASection.Title>

          <div className="flex items-start gap-4">
            <Button className="w-min !px-3 !py-2 text-xs">Enable</Button>

            <div className="w-full max-w-2xl flex flex-col items-start justify-start">
              <strong className="font-semibold text-left">Export</strong>

              <Enable2FASection.Description>
                To export your wallet&apos;s private keys and access your
                account funds without InWallet dependency will require
                two-factor authentication.
              </Enable2FASection.Description>
            </div>
          </div>
        </Enable2FASection.Root>
      </div>
    </SettingsTab.Root>
  )
}
