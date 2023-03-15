import { useState } from 'react'
import Head from 'next/head'

import { Tabs } from '@components/Tabs'
import { ExportKeys } from '@components/pages/Settings/Security/ExportKeys'

import { useI18n } from '@hooks/useI18n'

export type NavTabs = 'export-keys'

const Settings = () => {
  const { t } = useI18n()

  const [, setTab] = useState<NavTabs>('export-keys')

  return (
    <div className="flex flex-1 flex-col items-center px-2 pt-6 bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{t.settings.security.index.headTitle}</title>
        <meta
          name="description"
          content={t.settings.security.index.headDescription}
        />
      </Head>

      <div className="w-full max-w-5xl flex flex-1 flex-col items-stretch">
        <Tabs.Root
          defaultValue="export-keys"
          onValueChange={tabValue => setTab(tabValue as NavTabs)}
        >
          <Tabs.List aria-label="Manage your account" className="w-full">
            <Tabs.Trigger
              value="export-keys"
              className="py-2 w-full max-w-[10rem]"
            >
              {t.settings.security.index.exportKeys}
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="export-keys">
            <section className="w-full h-full p-6 flex flex-col justify-start items-stretch gap-4">
              <ExportKeys />
            </section>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default Settings
