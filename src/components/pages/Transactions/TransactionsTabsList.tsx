import Link from 'next/link'

import { Tabs } from '@components/Tabs'
import { Text } from '@components/Text'
import { ScrollArea } from '@components/ScrollArea'

import { useSafe } from '@contexts/SafeContext'

export const SAFE_TRANSACTIONS_TABS_VALUES = Object.freeze({
  QUEUE: 'queue',
  HISTORY: 'history'
})

export function TransactionsTabsList() {
  const { safe } = useSafe()

  return (
    <ScrollArea className="w-full max-w-full">
      <Tabs.List
        aria-label="Manage your smart account assets"
        className="w-full min-h-[2.75rem] text-center text-sm"
      >
        {safe && (
          <>
            <Tabs.Trigger
              value={SAFE_TRANSACTIONS_TABS_VALUES.QUEUE}
              className="max-w-[8rem]"
              asChild
            >
              <Link href={`/dashboard/${safe.address}/transactions/queue`}>
                <Text>Queue</Text>
              </Link>
            </Tabs.Trigger>

            <Tabs.Trigger
              value={SAFE_TRANSACTIONS_TABS_VALUES.HISTORY}
              className="max-w-[8rem] pointer-events-none"
              asChild
            >
              <Link href={`/dashboard/${safe.address}/transactions/history`}>
                <Text>history</Text>
              </Link>
            </Tabs.Trigger>
          </>
        )}
      </Tabs.List>
    </ScrollArea>
  )
}
