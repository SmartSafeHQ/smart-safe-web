import { useConnectWallet } from '@web3-onboard/react'
import { CaretUpDown } from '@phosphor-icons/react'

import { NavigationMenu } from '@components/NavigationMenu'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { SafeLinkItem } from '@components/Header/SafeLinkItem'
import { ScrollArea } from '@components/ScrollArea'
import { Text } from '@components/Text'

import { useSafe } from '@contexts/SafeContext'
import { useAddressSafes } from '@hooks/safes/retrieve/queries/useAddressSafes'

export function AddressSafesList() {
  const [{ wallet }] = useConnectWallet()

  const { safe } = useSafe()
  const { data: addressSafes, isLoading: isLoadingAddressSafes } =
    useAddressSafes(wallet?.accounts[0].address, !!wallet?.accounts[0])

  return (
    <NavigationMenu.Root className="flex items-stretch justify-start">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <Skeleton isLoading={isLoadingAddressSafes} className="w-44 h-10">
            <NavigationMenu.Trigger
              type="button"
              onPointerMove={event => event.preventDefault()}
              onPointerLeave={event => event.preventDefault()}
              className="h-10 text-left overflow-hidden rounded-md bg-zinc-50 transition-colors dark:bg-zinc-950 hover:bg-zinc-500/10 hover:dark:bg-zinc-50/10"
            >
              <div className="flex py-1 px-2 items-center justify-start text-left overflow-hidden rounded-md">
                <div className="flex items-center justify-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />

                  <Text className="px-2">{safe?.name}</Text>
                </div>

                <div className="flex items-center justify-center">
                  <CaretUpDown className="w-4 h-4" />
                </div>
              </div>
            </NavigationMenu.Trigger>
          </Skeleton>

          <NavigationMenu.Content
            onPointerEnter={event => event.preventDefault()}
            onPointerLeave={event => event.preventDefault()}
            className="fixed p-2"
          >
            <div className="flex mb-2">
              <Text className="font-medium text-sm text-zinc-600 dark:text-zinc-400">
                Your safes
              </Text>
            </div>

            <ScrollArea className="w-full h-80 pr-2">
              {addressSafes?.map(safe => {
                return (
                  <SafeLinkItem
                    key={safe.safeAddress}
                    safeAddress={safe.safeAddress}
                    safeName={safe.safeName}
                    safeFormattedAddress={safe.safeFormattedAddress}
                    hexColor={safe.chain.hexColor}
                    networkName={safe.chain.networkName}
                  />
                )
              })}
            </ScrollArea>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
