import clsx from 'clsx'
import Image from 'next/image'

import { Text } from '@components/Text'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useSafe } from '@contexts/SafeContext'
import { useChainFee } from '@hooks/chains/queries/useChainFee'

export function SendFeeEst() {
  const { safe } = useSafe()
  const {
    data: feeData,
    isLoading: feeIsLoading,
    isFetching: feeIsFetching,
    isPreviousData: feeIsPreviousData
  } = useChainFee(safe?.chain.rpcUrl, !!safe)

  return (
    <div
      className={clsx(
        'flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400',
        {
          'animate-pulse': feeIsFetching
        }
      )}
    >
      {safe && (
        <Skeleton
          isLoading={feeIsLoading || feeIsPreviousData}
          className="w-full h-5"
        >
          <Text className="mr-2">Est. network fee:</Text>

          <Image
            src={safe.chain.icon}
            alt="chain to deploy safe icon"
            width={20}
            height={20}
            className="mr-2"
          />

          {feeData && (
            <Text className="uppercase">
              {feeData.valueInToken.toPrecision(1)} {safe.chain.symbol}
            </Text>
          )}
        </Skeleton>
      )}
    </div>
  )
}
