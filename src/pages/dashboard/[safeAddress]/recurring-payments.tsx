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
          <PageLayout.Header className="justify-center items-start gap-3 pb-8 pt-10 px-3">
            <PageLayout.Title>Recurring Payments</PageLayout.Title>

            <PageLayout.Description>
              Manage the recurring payments you&apos;ve created
            </PageLayout.Description>
          </PageLayout.Header>

          <div className="w-full pb-3 flex flex-col relative justify-start items-stretch gap-5 mt-4">
            <Button className="w-max">Add recurrence</Button>
          </div>
        </PageLayout.Root>
      </div>
    </div>
  )
}

export default RecurringPayments
