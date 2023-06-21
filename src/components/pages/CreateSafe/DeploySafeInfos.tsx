import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react'

import { Text } from '@components/Text'

import { useDeploySafeHook } from '@hooks/createSafe/useDeploySafeHook'

export function DeploySafeInfos() {
  const { wallet, formattedOwnerAddress, safeInfos } = useDeploySafeHook()

  return (
    <aside className="w-full flex flex-col items-stretch justify-start lg:w-72">
      {wallet && (
        <div className="flex items-center justify-center gap-3 p-6 rounded-lg bg-zinc-200 dark:bg-zinc-700">
          <Image
            src={`data:image/svg+xml;utf8,${encodeURIComponent(wallet.icon)}`}
            alt="wallet connector provider icon"
            width={24}
            height={24}
            className="w-6 h-6"
          />

          <Text className="text-sm font-medium">{formattedOwnerAddress}</Text>
        </div>
      )}

      <div className="w-full pt-6 flex flex-col items-stretch justify-start gap-4 lg:pt-14">
        <Text className="text-xs leading-5 hidden font-semibold uppercase text-zinc-800 dark:text-zinc-400 lg:block">
          Network deploy
        </Text>

        {safeInfos && (
          <div className="w-full flex items-center gap-3">
            <Image
              src={safeInfos.chain.icon}
              alt="chain to deploy safe icon"
              width={28}
              height={28}
              className="w-7 h-7"
            />

            <Text asChild className="font-medium capitalize">
              <strong>{safeInfos.chain.name}</strong>
            </Text>
          </div>
        )}
      </div>

      {safeInfos && safeInfos.chain.faucetUrl && (
        <div className="w-full pt-4 mt-4 flex flex-col items-stretch justify-start gap-4 border-t-1 border-zinc-300 dark:border-zinc-800 text-cyan-500 transition-colors hover:text-cyan-600 lg:pt-6 lg:mt-6">
          <Text
            asChild
            className="flex items-center gap-1 text-sm font-semibold"
          >
            <Link href={safeInfos.chain.faucetUrl} target="_blank">
              Get {safeInfos.chain.symbol} token faucet now!
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Text>
        </div>
      )}
    </aside>
  )
}
