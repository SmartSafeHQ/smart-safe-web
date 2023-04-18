import Link from 'next/link'

import { Tabs } from '@components/Tabs'
import { Text } from '@components/Text'
import { ScrollArea } from '@components/ScrollArea'

import { useI18n } from '@hooks/useI18n'

export const SMART_ACCOUNT_TABS_VALUES = Object.freeze({
  CONTACTS: 'contacts',
  WITHDRAW_AUTH: 'withdrawAuth',
  PAYMENT_SCHEDULE: 'paymentSchedule',
  STREAM_PAYMENTS: 'streamPayments',
  ACCOUNT_RECOVERY: 'accountRecovery'
})

export function SmartAccountTabsList() {
  const { t } = useI18n()

  return (
    <ScrollArea className="w-full max-w-full">
      <Tabs.List
        aria-label={t.saGlobal.tabsList.ariaLabel}
        className="w-full min-w-[36rem] text-center text-sm"
      >
        <Tabs.Trigger
          value={SMART_ACCOUNT_TABS_VALUES.CONTACTS}
          className="max-w-[8rem]"
          asChild
        >
          <Link href="/dashboard/smart-account/contacts">
            <Text>{t.saGlobal.tabsList.contacts}</Text>
          </Link>
        </Tabs.Trigger>

        <Tabs.Trigger
          value={SMART_ACCOUNT_TABS_VALUES.WITHDRAW_AUTH}
          className="max-w-[11rem]"
          asChild
        >
          <Link href="/dashboard/smart-account/withdraw-authorization">
            <Text>{t.saGlobal.tabsList.withdrawAuth}</Text>
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
            <Text>{t.saGlobal.tabsList.paymentSchedule}</Text>
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
            <Text>{t.saGlobal.tabsList.streamPayments}</Text>
          </Link>
        </Tabs.Trigger>

        <Tabs.Trigger
          value={SMART_ACCOUNT_TABS_VALUES.ACCOUNT_RECOVERY}
          className="w-full max-w-[10rem] pointer-events-none"
          disabled
          asChild
        >
          <Link href="/dashboard/smart-account/account-recovery" aria-disabled>
            <Text>{t.saGlobal.tabsList.accountRecovery}</Text>
          </Link>
        </Tabs.Trigger>
      </Tabs.List>
    </ScrollArea>
  )
}
