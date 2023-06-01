import Head from 'next/head'

import { PageLayout } from '@components/pages/Layouts/PageLayout'
import { AccountManagement } from '@components/pages/Settings/AccountManagement'

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe | Settings</title>
        <meta
          name="description"
          content="Management of you multi sign safe rules and owners"
        />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <PageLayout.Root>
          <PageLayout.Header className="justify-center items-start gap-3 pb-8 pt-4 px-3">
            <PageLayout.Title>Account management</PageLayout.Title>

            <PageLayout.Description>
              Manage and add further protection to your smart safe.
            </PageLayout.Description>
          </PageLayout.Header>

          <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5">
            <AccountManagement />
          </div>
        </PageLayout.Root>
      </div>
    </div>
  )
}

export default Settings
