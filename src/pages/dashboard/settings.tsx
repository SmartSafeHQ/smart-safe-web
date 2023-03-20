import { useEffect, useState } from 'react'
import Head from 'next/head'

import { Tabs } from '@components/Tabs'
import { SecurityTab } from '@components/pages/Settings/Security'
import { ExportKeys } from '@components/pages/Settings/Security/ExportKeys'

import { useI18n } from '@hooks/useI18n'
import { useAccount2faSettings } from '@hooks/accounts/queries/useAccount2faSettings'
import { Security2FAProvider } from '@contexts/Security2FAContext'
import { useAuth } from '@contexts/AuthContext'

export type NavTabs = 'security' | 'export-keys'

const Settings = () => {
  const { t } = useI18n()
  const { customer, verify2FA } = useAuth()

  const { data: account2FAData } = useAccount2faSettings(customer?.id)

  const [tab, setTab] = useState<NavTabs>('security')

  useEffect(() => {
    if (tab === 'export-keys' && account2FAData?.exportKeys2faEnabled) {
      verify2FA()
    }
  }, [tab])

  return (
    <div className="flex flex-1 flex-col items-center px-2 pt-6 bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{t.settings.security.headTitle}</title>
        <meta
          name="description"
          content={t.settings.security.headDescription}
        />
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
              {t.settings.security.security}
            </Tabs.Trigger>

            <Tabs.Trigger
              value="export-keys"
              className="py-2 w-full max-w-[10rem]"
            >
              {t.settings.security.keys}
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="security">
            <Security2FAProvider>
              <SecurityTab />
            </Security2FAProvider>
          </Tabs.Content>

          <Tabs.Content value="export-keys">
            <ExportKeys />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default Settings
