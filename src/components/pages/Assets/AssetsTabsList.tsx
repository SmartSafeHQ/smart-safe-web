import Link from 'next/link'

import { Tabs } from '@components/Tabs'
import { Text } from '@components/Text'
import { ScrollArea } from '@components/ScrollArea'

import { useSafe } from '@contexts/SafeContext'

export const SAFE_ASSETS_TABS_VALUES = Object.freeze({
  TOKENS: 'tokens'
})

export function AssetsTabsList() {
  const { safe } = useSafe()

  return (
    <ScrollArea>
      <Tabs.List
        aria-label="Manage your safe assets"
        className="w-full min-h-[2.75rem] text-center text-sm"
      >
        {safe && (
          <Tabs.Trigger
            value={SAFE_ASSETS_TABS_VALUES.TOKENS}
            className="max-w-[8rem]"
            asChild
          >
            <Link href={`/dashboard/${safe.address}/assets`}>
              <Text>Tokens</Text>
            </Link>
          </Tabs.Trigger>
        )}
      </Tabs.List>
    </ScrollArea>
  )
}
