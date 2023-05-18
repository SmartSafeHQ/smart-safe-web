import Head from 'next/head'

import {
  AssetsTabsList,
  SAFE_ASSETS_TABS_VALUES
} from '@components/pages/Assets/AssetsTabsList'
import { Button } from '@components/Button'
import { Tabs } from '@components/Tabs'
import { PageLayout } from '@components/pages/Layouts/PageLayout'
import { AssetsList } from '@components/pages/Assets/AssetsList'

const Assets = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe | Safe assets</title>
        <meta
          name="description"
          content="SmartSafe decentralized assets list"
        />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <Tabs.Root defaultValue={SAFE_ASSETS_TABS_VALUES.TOKENS}>
          <AssetsTabsList />

          <Tabs.Content value={SAFE_ASSETS_TABS_VALUES.TOKENS}>
            <PageLayout.Root>
              <PageLayout.Header className="justify-center items-start gap-3 pb-8 pt-10 px-3">
                <div className="w-full flex flex-1 flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                  <PageLayout.Title>Assets</PageLayout.Title>

                  <Button className="w-max">Send</Button>
                </div>
              </PageLayout.Header>

              <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5 mt-6">
                <AssetsList />
              </div>
            </PageLayout.Root>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default Assets
