import { useState } from 'react'
import Head from 'next/head'

import { Tabs } from '@components/Tabs'
import { Button } from '@components/Button'
import { DialogModal } from '@components/Dialogs/DialogModal'
import { SettingsTab } from '@components/pages/Seetings'

export type NavTabs = 'security' | 'keys'

const Settings = () => {
  const [, setTab] = useState<NavTabs>('security')

  return (
    <div className="flex flex-1 flex-col items-center px-2 pt-6 bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>InWallet | Settings</title>
        <meta name="description" content="InWallet dashboard settings" />
      </Head>

      <div className="w-full max-w-5xl flex flex-1 flex-col items-stretch">
        <Tabs.Root
          defaultValue="security"
          onValueChange={tabValue => setTab(tabValue as NavTabs)}
        >
          <Tabs.List aria-label="Manage your account" className="w-full">
            <Tabs.Trigger
              value="security"
              className="py-2 w-full max-w-[10rem]"
              defaultChecked
            >
              security
            </Tabs.Trigger>

            <Tabs.Trigger value="keys" className="py-2 w-full max-w-[10rem]">
              keys
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="security">
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

                <div className="w-full flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-14">
                  <strong className="w-full font-semibold text-start md:max-w-[7rem]">
                    SignIn verifications
                  </strong>

                  <div className="flex items-start gap-4">
                    <DialogModal.Trigger>
                      <Button className="w-min !px-3 !py-2 text-xs">
                        Enable
                      </Button>
                    </DialogModal.Trigger>

                    <div className="w-full max-w-2xl flex flex-col items-start justify-start">
                      <strong className="font-semibold text-left">
                        SignIn
                      </strong>

                      <span className="text-gray-400 text-xs md:text-sm">
                        Two-factor authentication adds an additional layer of
                        security to your account by requiring more than just a
                        password to sign in.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-14">
                  <strong className="w-full font-semibold text-start md:max-w-[7rem]">
                    Send transaction
                  </strong>

                  <div className="flex items-start gap-4">
                    <Button className="w-min !px-3 !py-2 text-xs">
                      Enable
                    </Button>

                    <div className="w-full max-w-2xl flex flex-col items-start justify-start">
                      <strong className="font-semibold text-left">Send</strong>

                      <span className="text-gray-400 text-xs md:text-sm">
                        Secure your funds with two-factor authentication on
                        transact funds for extra protection.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col items-start gap-4 md:flex-row md:gap-14">
                  <strong className="w-full font-semibold text-start md:max-w-[7rem]">
                    Private keys
                  </strong>

                  <div className="flex items-start gap-4">
                    <Button className="w-min !px-3 !py-2 text-xs">
                      Enable
                    </Button>

                    <div className="w-full max-w-2xl flex flex-col items-start justify-start">
                      <strong className="font-semibold text-left">
                        Export
                      </strong>

                      <span className="text-gray-400 text-xs md:text-sm">
                        To export your wallet&apos;s private keys and access
                        your account funds without InWallet dependency will
                        require two-factor authentication.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SettingsTab.Root>
          </Tabs.Content>

          <Tabs.Content value="keys">
            <section className="w-full h-full p-6 flex flex-col justify-start items-stretch gap-4">
              keys
            </section>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default Settings
