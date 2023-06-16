import Head from 'next/head'

import { PageLayout } from '@components/pages/Layouts/PageLayout'
import { Text } from '@components/Text'

const SmartGPT = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe | Smart GPT</title>
        <meta name="description" content="Management of smart GPT" />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <PageLayout.Root>
          <PageLayout.Header className="flex-col justify-between items-stretch gap-3 pb-8 pt-4 px-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-col items-stretch justify-between gap-4">
              <PageLayout.Title>Smart GPT</PageLayout.Title>

              <PageLayout.Description className="flex items-center gap-1">
                <Text>
                  Automate payments in your safe contract powered by the
                  Chainlink
                </Text>
              </PageLayout.Description>
            </div>
          </PageLayout.Header>

          <div className="w-full py-3 flex flex-col relative justify-start items-stretch gap-5">
            ai
          </div>
        </PageLayout.Root>
      </div>
    </div>
  )
}

export default SmartGPT
