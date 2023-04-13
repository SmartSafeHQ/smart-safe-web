import Head from 'next/head'

import { Tabs } from '@components/Tabs'
import {
  SMART_ACCOUNT_TABS_VALUES,
  SmartAccountTabsList
} from '@components/pages/SmartAccount/SmartAccountTabsList'

import { useI18n } from '@hooks/useI18n'

const BuyAndSell = () => {
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
            contacts
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default BuyAndSell
