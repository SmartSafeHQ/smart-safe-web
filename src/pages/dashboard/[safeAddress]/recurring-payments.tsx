import Head from 'next/head'

import { Button } from '@components/Button'
import { PageLayout } from '@components/pages/Layouts/PageLayout'

const RecurringPayments = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe | Smart Account Recurring Payments</title>
        <meta name="description" content="Management of recurring payments" />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <PageLayout.Root>
          <PageLayout.Header className="flex-col justify-between items-stretch gap-3 pb-8 pt-4 px-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-col items-stretch justify-between gap-4">
              <PageLayout.Title>Recurring Payments</PageLayout.Title>

              <PageLayout.Description>
                Manage the recurring payments you&apos;ve created
              </PageLayout.Description>
            </div>

            <Button className="w-max">Add recurrence</Button>
          </PageLayout.Header>

          <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5 mt-4">
            Under development
          </div>
        </PageLayout.Root>
      </div>
    </div>
  )
}

export default RecurringPayments
