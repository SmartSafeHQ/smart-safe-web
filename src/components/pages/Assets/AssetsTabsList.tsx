import Link from 'next/link'

import { Tabs } from '@components/Tabs'
import { Text } from '@components/Text'
import { ScrollArea } from '@components/ScrollArea'

export const SAFE_ASSETS_TABS_VALUES = Object.freeze({
  TOKENS: 'tokens'
})

export function AssetsTabsList() {
  return (
    <ScrollArea className="w-full max-w-full">
      <Tabs.List
        aria-label="Manage your smart account assets"
        className="w-full text-center text-sm"
      >
        <Tabs.Trigger
          value={SAFE_ASSETS_TABS_VALUES.TOKENS}
          className="max-w-[8rem]"
          asChild
        >
          <Link href="/dashboard/aaa/assets">
            <Text>Tokens</Text>
          </Link>
        </Tabs.Trigger>
      </Tabs.List>
    </ScrollArea>
  )
}
