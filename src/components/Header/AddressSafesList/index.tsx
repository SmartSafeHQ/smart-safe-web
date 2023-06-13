import { useConnectWallet } from '@web3-onboard/react'
import { CaretUpDown } from '@phosphor-icons/react'

import { NavigationMenu } from '@components/NavigationMenu'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { SafeLinkItem } from '@components/Header/AddressSafesList/SafeLinkItem'
import { CurrentSafeItem } from '@components/Header/AddressSafesList/CurrentSafeItem'
import { ScrollArea } from '@components/ScrollArea'
import { Text } from '@components/Text'

import { useSafe } from '@contexts/SafeContext'
import { useAddressSafes } from '@hooks/safe/queries/useAddressSafes'

export function AddressSafesList() {
  const [{ wallet }] = useConnectWallet()

  const { safe } = useSafe()
  const { data: addressSafes, isLoading: isLoadingAddressSafes } =
    useAddressSafes(wallet?.accounts[0].address, !!wallet?.accounts[0])

  return (
    <NavigationMenu.Root className="flex items-stretch justify-start">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <Skeleton
            isLoading={isLoadingAddressSafes || !safe}
            className="w-44 h-10"
          >
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
            className="fixed w-[calc(100vw-1rem)] left-2 py-2 px-2 sm:w-max sm:left-auto"
          >
            <div className="flex pl-2 pt-1 mb-1">
              <Text className="font-medium text-xs text-zinc-600 dark:text-zinc-400">
                Your safes
              </Text>
            </div>

            {safe && (
              <ScrollArea className="pr-2 max-h-[20rem]">
                <CurrentSafeItem
                  safeAddress={safe.address}
                  safeName={safe.name}
                  safeFormattedAddress={safe.formattedAddress}
                  hexColor={safe.chain.hexColor}
                  networkName={safe.chain.networkName}
                  explorerUrl={safe.chain.explorerUrl}
                />

                {addressSafes?.map((addressSafe, index) => {
                  if (addressSafe.safeAddress === safe.address) return null

                  return (
                    <SafeLinkItem
                      key={addressSafe.safeAddress}
                      index={index}
                      safeAddress={addressSafe.safeAddress}
                      safeName={addressSafe.safeName}
                      safeFormattedAddress={addressSafe.safeFormattedAddress}
                      hexColor={addressSafe.chain.hexColor}
                      networkName={addressSafe.chain.networkName}
                    />
                  )
                })}
              </ScrollArea>
            )}
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
