import Image from 'next/image'

import { Text } from '@components/Text'

import { useCreateSafe } from '@contexts/create-safe/CreateSafeContext'

export function NetworkFeeEst() {
  const { safeInfos } = useCreateSafe()

  return (
    <div className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
      <Text className="mr-2">Est. network fee:</Text>

      {safeInfos && (
        <Image
          src={safeInfos.chain.icon}
          alt="chain to deploy safe icon"
          width={20}
          height={20}
          className="mr-2"
        />
      )}

      <Text>0.001 matic</Text>
    </div>
  )
}
