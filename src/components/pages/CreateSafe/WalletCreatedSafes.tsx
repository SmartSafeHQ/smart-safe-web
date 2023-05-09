import Link from 'next/link'
import Image from 'next/image'
import { useConnectWallet } from '@web3-onboard/react'

import { Text } from '@components/Text'
import { Heading } from '@components/Heading'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { SmartSafeIconLogo } from '@components/Logos/SmartSafeIconLogo'

import { useAddressSafes } from '@hooks/safes/retrieve/queries/useAddressSafes'

export function WalletCreatedSafes() {
  const [{ wallet }] = useConnectWallet()
  const {
    data: addressSafes,
    isFetching,
    isError
  } = useAddressSafes(wallet?.accounts[0].address, !!wallet?.accounts[0])

  return (
    <div className="w-full min-w-[24rem] min-h-[34rem] flex flex-col flex-1 items-stretch justify-start relative p-6 shadow-none rounded-lg bg-zinc-100 dark:bg-zinc-900 border-1 border-zinc-200 dark:border-zinc-700 lg:max-w-[27rem]">
      <div className="flex justify-center items-stretch mb-6 md:justify-start">
        <Heading className="text-xl font-semibold">Your safes</Heading>
      </div>

      {(!wallet || (addressSafes && addressSafes.length <= 0)) && (
        <div className="w-full flex flex-col items-center justify-center gap-5">
          <SmartSafeIconLogo className="w-20 h-20 opacity-60" />

          <Text className="text-sm text-center text-zinc-800 dark:text-zinc-400">
            You have no safes yet. Create your safe now!
          </Text>
        </div>
      )}

      <Skeleton isLoading={isFetching} totalOfLines={3} className="h-12">
        {isError && (
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <SmartSafeIconLogo className="w-20 h-20 opacity-60" />

            <Text className="text-sm text-center text-zinc-800 dark:text-zinc-400">
              Error while fetching your safes, try again :/
            </Text>
          </div>
        )}

        {addressSafes &&
          addressSafes.map(safe => (
            <div
              key={safe.safeId}
              className="w-full flex flex-col items-center justify-center gap-2"
            >
              <Link
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
            </div>
          ))}
      </Skeleton>
    </div>
  )
}
