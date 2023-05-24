import Head from 'next/head'

import { Button } from '@components/Button'
import { SmartAccountTab } from '@components/pages/SmartAccount'

import { useSAContactsHook } from '@hooks/smartAccount/useSAContactsHook'

const RecurringPayments = () => {
  const { setIsCreateContactOpen } = useSAContactsHook()

  return (
    <div className="flex flex-1 flex-col items-center px-2 pt-2 md:pt-6">
      <Head>
        <title>SmartSafe | Smart Account Recurring Payments</title>
        <meta name="description" content="Management of recurring payments" />
      </Head>

      <div className="w-full flex flex-1 flex-col items-stretch">
        <div className="w-full flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col relative justify-start items-stretch gap-3">
            <SmartAccountTab.Title>Recurring Payments</SmartAccountTab.Title>

            <SmartAccountTab.Description>
              Manage the recurring payments you&apos;ve created
            </SmartAccountTab.Description>
          </div>

          <Button
            className="w-max"
            onClick={() => setIsCreateContactOpen(true)}
          >
            Add recurrence
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RecurringPayments
