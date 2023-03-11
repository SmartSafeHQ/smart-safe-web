import { useState } from 'react'
import Head from 'next/head'

import { Tabs } from '@components/Tabs'
import { SecurityTab } from '@components/pages/Seetings/Security'

import { useI18n } from '@hooks/useI18n'

export type NavTabs = 'security' | 'keys'

const Settings = () => {
  const { t } = useI18n()

  const [, setTab] = useState<NavTabs>('security')

  return (
    <div className="flex flex-1 flex-col items-center px-2 pt-6 bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{t.settings.headTitle}</title>
        <meta name="description" content={t.settings.headDescription} />
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
              {t.settings.security}
            </Tabs.Trigger>

            <Tabs.Trigger value="keys" className="py-2 w-full max-w-[10rem]">
              {t.settings.keys}
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="security">
            <SecurityTab />
          </Tabs.Content>

          <Tabs.Content value="keys">
            <section className="w-full h-full p-6 flex flex-col justify-start items-stretch gap-4">
              {t.settings.keys}
            </section>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default Settings
