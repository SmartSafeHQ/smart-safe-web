import clsx from 'clsx'
import Image from 'next/image'

import { Text } from '@components/Text'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useSend } from '@contexts/SendContext'
import { useSafe } from '@contexts/SafeContext'
import { useChainFee } from '@hooks/chains/queries/useChainFee'

export function SendFeeEst() {
  const { selectedToken } = useSend()
  const { safe } = useSafe()
  const {
    data: feeData,
    isLoading: feeIsLoading,
    isFetching: feeIsFetching,
    isPreviousData: feeIsPreviousData
  } = useChainFee(safe?.chain.rpcUrl, !!selectedToken)

  return (
    <div
      className={clsx(
        'flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400',
        {
          'animate-pulse': feeIsFetching
        }
      )}
    >
      {selectedToken && (
        <Skeleton
          isLoading={feeIsLoading || feeIsPreviousData}
          className="w-full h-5"
        >
          <Text className="mr-2">Est. network fee:</Text>

          <Image
            src={selectedToken.icon}
            alt="chain to deploy safe icon"
            width={20}
            height={20}
            className="mr-2"
          />

          {feeData && (
            <Text className="uppercase">
              {feeData.valueInToken.slice(0, 7)} {selectedToken.symbol}
            </Text>
          )}
        </Skeleton>
      )}
    </div>
  )
}
