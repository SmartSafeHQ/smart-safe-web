import Link from 'next/link'

import { Tabs } from '@components/Tabs'
import { Text } from '@components/Text'
import { ScrollArea } from '@components/ScrollArea'

export const SMART_ACCOUNT_TABS_VALUES = Object.freeze({
  ACCOUNT_MANAGEMENT: 'accountManagement'
})

export function SmartAccountTabsList() {
  return (
    <ScrollArea>
      <Tabs.List
        aria-label="Manage your smart account"
        className="w-full text-center text-sm"
      >
        <Tabs.Trigger
          value={SMART_ACCOUNT_TABS_VALUES.ACCOUNT_MANAGEMENT}
          className="w-full max-w-[10rem] pointer-events-none"
          disabled
          asChild
        >
          <Link href="/dashboard/smart-account/account-recovery" aria-disabled>
            <Text>account recovery</Text>
          </Link>
        </Tabs.Trigger>
      </Tabs.List>
    </ScrollArea>
  )
}
