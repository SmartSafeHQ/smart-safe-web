import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { useConnectWallet } from '@web3-onboard/react'

import { Text } from '@components/Text'
import { Heading } from '@components/Heading'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { Collapsible } from '@components/Collapsible'
import { ScrollArea } from '@components/ScrollArea'
import { SmartSafeIconLogo } from '@components/Logos/SmartSafeIconLogo'

import { useAddressSafes } from '@hooks/safes/retrieve/queries/useAddressSafes'

export function WalletCreatedSafes() {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)
  const [{ wallet }] = useConnectWallet()
  const {
    data: addressSafes,
    isFetching,
    isError
  } = useAddressSafes(wallet?.accounts[0].address, !!wallet?.accounts[0])

  useEffect(() => {
    const onHandleResize = () => {
      setIsCollapsibleOpen(window.innerWidth >= 768)
    }

    window.addEventListener('resize', onHandleResize)

    onHandleResize()

    return () => {
      window.removeEventListener('resize', onHandleResize)
    }
  }, [])

  return (
    <Collapsible.Root
      open={isCollapsibleOpen}
      onOpenChange={setIsCollapsibleOpen}
      defaultOpen={false}
      className="flex flex-col flex-1 items-stretch justify-start relative p-6 shadow-none rounded-lg ring-zinc-900 dark:ring-zinc-100 focus-within:ring-1 bg-zinc-100 dark:bg-zinc-900 border-1 border-zinc-200 dark:border-zinc-700 lg:min-w-[20rem] lg:min-h-[34rem] lg:max-w-[27rem]"
    >
      <Collapsible.Trigger className="relative flex justify-center items-center md:justify-start gap-3 select-none outline-none cursor-pointer md:pointer-events-none">
        <CaretDown className="w-6 h-6 block md:hidden" />

        <Heading className="flex flex-1 text-xl font-semibold justify-center md:justify-start">
          Your safes
        </Heading>
      </Collapsible.Trigger>

      <Collapsible.Content>
        <div className="w-full flex flex-col items-stretch justify-start gap-2 pt-6">
          {(!wallet || (addressSafes && addressSafes.length <= 0)) && (
            <div className="w-full flex flex-col items-center justify-center gap-5">
              <SmartSafeIconLogo className="w-20 h-20 opacity-60" />

              <Text className="text-sm text-center text-zinc-800 dark:text-zinc-400">
                You have no safes yet. Create your safe now!
              </Text>
            </div>
          )}

          <Skeleton isLoading={isFetching} totalOfLines={3} className="h-40">
            {isError && (
              <div className="w-full flex flex-col items-center justify-center gap-5">
                <SmartSafeIconLogo className="w-20 h-20 opacity-60" />

                <Text className="text-sm text-center text-zinc-800 dark:text-zinc-400">
                  Error while fetching your safes, try again :/
                </Text>
              </div>
            )}

            <ScrollArea className="w-full h-[30rem] pr-2">
              <div className="w-full flex flex-col items-stretch justify-start gap-4">
                {!!wallet &&
                  addressSafes &&
                  addressSafes.map(safe => (
                    <Link
                      key={safe.safeId}
                      href={`/dashboard/${safe.safeAddress}`}
                      className="w-full flex items-center justify-start gap-3 p-3 rounded-md shadow-sm border-1 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-black hover:border-zinc-300 hover:dark:border-zinc-600"
                    >
                      <Image
                        src={safe.chain.icon}
                        alt="Deployed safe chain icon"
                        width={28}
                        height={28}
                        className="w-10 h-10"
                      />

                      <div className="flex flex-1 flex-col items-stretch justify-start gap-1">
                        <Text asChild>
                          <strong>{safe.safeName}</strong>
                        </Text>

                        <Text className="text-xs font-medium text-zinc-800 dark:text-zinc-400">
                          {safe.safeFormattedAddress}
                        </Text>
                      </div>
                    </Link>
                  ))}
              </div>
            </ScrollArea>
          </Skeleton>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
