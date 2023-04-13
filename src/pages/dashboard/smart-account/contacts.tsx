import Head from 'next/head'

import {
  SMART_ACCOUNT_TABS_VALUES,
  SmartAccountTabsList
} from '@components/pages/SmartAccount/SmartAccountTabsList'
import { Tabs } from '@components/Tabs'
import { SmartAccountTab } from '@components/pages/SmartAccount'

import { useI18n } from '@hooks/useI18n'

const SmartAccount = () => {
  const { t } = useI18n()

  return (
    <div className="flex flex-1 flex-col items-center px-2 pt-2 bg-gray-50 dark:bg-gray-900 md:pt-6">
      <Head>
        <title>{t.saContacts.headTitle}</title>
        <meta name="description" content={t.saContacts.headDescription} />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <Tabs.Root defaultValue={SMART_ACCOUNT_TABS_VALUES.CONTACTS}>
          <SmartAccountTabsList />

          <Tabs.Content value={SMART_ACCOUNT_TABS_VALUES.CONTACTS}>
            <SmartAccountTab.Root>
              <SmartAccountTab.Header>
                <SmartAccountTab.Title>
                  {t.saContacts.title}
                </SmartAccountTab.Title>

                <SmartAccountTab.Description>
                  {t.saContacts.description}
                </SmartAccountTab.Description>
              </SmartAccountTab.Header>

              <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5">
                contacts
              </div>
            </SmartAccountTab.Root>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default SmartAccount
