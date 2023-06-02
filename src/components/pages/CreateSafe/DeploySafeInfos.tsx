import Image from 'next/image'

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
              <strong>{safeInfos.chain.networkName}</strong>
            </Text>
          </div>
        )}
      </div>
    </aside>
  )
}
