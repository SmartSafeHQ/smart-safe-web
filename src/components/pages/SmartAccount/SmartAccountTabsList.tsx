import Link from 'next/link'

import { Tabs } from '@components/Tabs'
import { Text } from '@components/Text'
import { ScrollArea } from '@components/ScrollArea'

export const SMART_ACCOUNT_TABS_VALUES = Object.freeze({
  PAYMENT_SCHEDULE: 'paymentSchedule',
  STREAM_PAYMENTS: 'streamPayments',
  ACCOUNT_RECOVERY: 'accountRecovery'
})

export function SmartAccountTabsList() {
  return (
    <ScrollArea>
      <Tabs.List
        aria-label="Manage your smart account"
        className="w-full min-w-[36rem] text-center text-sm"
      >
        <Tabs.Trigger
          value={SMART_ACCOUNT_TABS_VALUES.ACCOUNT_RECOVERY}
          className="w-full max-w-[10rem] pointer-events-none"
          disabled
          asChild
        >
          <Link href="/dashboard/smart-account/account-recovery" aria-disabled>
            <Text>account recovery</Text>
          </Link>
        </Tabs.Trigger>

        <Tabs.Trigger
          value={SMART_ACCOUNT_TABS_VALUES.PAYMENT_SCHEDULE}
          className="w-full max-w-[12rem] pointer-events-none"
          disabled
          asChild
        >
          <Link
            href="/dashboard/smart-account/payment-scheduling"
            aria-disabled
          >
            <Text>payment scheduling</Text>
          </Link>
        </Tabs.Trigger>

        <Tabs.Trigger
          value={SMART_ACCOUNT_TABS_VALUES.STREAM_PAYMENTS}
          className="w-full max-w-[13rem] pointer-events-none"
          disabled
          asChild
        >
          <Link
            href="/dashboard/smart-account/streaming-payments"
            aria-disabled
          >
            <Text>streaming payments</Text>
          </Link>
        </Tabs.Trigger>
      </Tabs.List>
    </ScrollArea>
  )
}
