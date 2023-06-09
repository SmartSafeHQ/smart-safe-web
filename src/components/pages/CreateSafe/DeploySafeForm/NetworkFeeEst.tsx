import clsx from 'clsx'
import Image from 'next/image'

import { Text } from '@components/Text'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useDeploySmartSafeProxyFee } from '@hooks/createSafe/queries/useDeploySmartSafeProxyFee'
import { useDeploySafeHook } from '@hooks/createSafe/useDeploySafeHook'

export function NetworkFeeEst() {
  const { ownersFields, safeInfos } = useDeploySafeHook()
  const {
    data: feeData,
    isLoading: feeIsLoading,
    isFetching: feeIsFetching,
    isPreviousData: feeIsPreviousData
  } = useDeploySmartSafeProxyFee(
    [ownersFields[0].address],
    safeInfos?.chain.rpcUrl,
    safeInfos?.chain.symbol,
    !!safeInfos
  )

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
        <Skeleton
          isLoading={feeIsLoading || feeIsPreviousData}
          className="w-full h-5"
        >
          <Text className="mr-2">Est. network fee:</Text>

          <Image
            src={safeInfos.chain.icon}
            alt="chain to deploy safe icon"
            width={20}
            height={20}
            className="mr-2"
          />

          {feeData && (
            <Text className="uppercase">
              {feeData.valueInToken.toPrecision(2)} {safeInfos.chain.symbol}
            </Text>
          )}
        </Skeleton>
      )}
    </div>
  )
}
