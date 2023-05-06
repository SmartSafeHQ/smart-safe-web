import clsx from 'clsx'
import Image from 'next/image'

import { Text } from '@components/Text'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useCreateSafe } from '@contexts/create-safe/CreateSafeContext'
import { useChainFee } from '@hooks/chains/queries/useChainFee'

export function NetworkFeeEst() {
  const { safeInfos } = useCreateSafe()
  const {
    data: feeData,
    isLoading: feeIsLoading,
    isFetching: feeIsFetching,
    isPreviousData: feeIsPreviousData
  } = useChainFee(safeInfos?.chain.rpcUrl ?? '', !!safeInfos)

  return (
    <div
      className={clsx(
        'flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400',
        {
          'animate-pulse': feeIsFetching
        }
      )}
    >
      {safeInfos && (
        <Skeleton isLoading={feeIsLoading || feeIsPreviousData} className="h-7">
          <Text className="mr-2">Est. network fee:</Text>

          <Image
            src={safeInfos.chain.icon}
            alt="chain to deploy safe icon"
            width={20}
            height={20}
            className="mr-2"
          />

          {feeData && (
            <Text>
              {feeData.valueInCoin.slice(0, 5)} {safeInfos.chain.networkName}
            </Text>
          )}
        </Skeleton>
      )}
    </div>
  )
}
