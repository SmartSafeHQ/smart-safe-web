import { HTMLAttributes } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { Text } from '@components/Text'
import { CoinsTableDataFetching } from './CoinsTableDataFetching'

import { formatToCurrency } from '@utils/global/coins'
import { useCoinPortfolio } from '@hooks/global/coins/queries/useCoinPortfolio'
import { useCoinValueInUsd } from '@hooks/global/coins/queries/useCoinValueInUsd'
import { useAuth } from '@contexts/AuthContext'

import type { SupportedNetworks } from '@/utils/global/types'

interface CoinsTableTrProps extends HTMLAttributes<HTMLTableRowElement> {
  networkName: string
  networkType: SupportedNetworks
  symbol: string
  rpcUrl: string
  avatar: string
}

export function CoinsTableTr({
  networkName,
  networkType,
  symbol,
  rpcUrl,
  avatar,
  className,
  ...props
}: CoinsTableTrProps) {
  const { customer } = useAuth()
  const {
    data: portfolioData,
    isLoading: portfolioIsLoading,
    isRefetching: portfolioIsRefetching,
    error: portfolioError
  } = useCoinPortfolio({
    accounts: customer?.wallets,
    coin: { symbol, rpcUrl, networkType }
  })

  const {
    data: usdValueData,
    isLoading: usdValueIsLoading,
    isRefetching: usdValueIsRefetching,
    error: usdValueError
  } = useCoinValueInUsd(symbol)

  return (
    <tr
      className={clsx(
        '[&>*]:min-w-[7rem] text-gray-800 dark:text-gray-50 font-medium border-b-[0.5px] border-gray-400 dark:border-gray-600',
        className
      )}
      {...props}
    >
      <td className="pl-4 py-3 !min-w-[12rem]">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 md:w-11 md:h-11">
            <Image src={avatar} alt={networkName} width={44} height={44} />
          </div>

          <div className="flex flex-col">
            <Text className="font-bold uppercase">{symbol}</Text>

            <Text className="text-sm capitalize text-gray-500 dark:text-gray-400">
              {networkName}
            </Text>
          </div>
        </div>
      </td>

      <td>
        <div className="flex flex-col">
          <CoinsTableDataFetching
            isLoading={usdValueIsLoading || portfolioIsLoading}
            isRefetching={usdValueIsRefetching || portfolioIsRefetching}
            error={!!usdValueError || !!portfolioError}
            skeletonClassName="h-6"
          >
            {portfolioData &&
              usdValueData &&
              `$${(portfolioData?.balance * usdValueData?.valueInUsd).toFixed(
                2
              )}`}
          </CoinsTableDataFetching>

          <CoinsTableDataFetching
            isLoading={portfolioIsLoading}
            isRefetching={portfolioIsRefetching}
            error={!!portfolioError}
            className="uppercase text-sm text-gray-500 dark:text-gray-400"
            skeletonClassName="h-6 mt-1"
          >
            {portfolioData && `${portfolioData.balance} ${symbol}`}
          </CoinsTableDataFetching>
        </div>
      </td>

      <td>
        <CoinsTableDataFetching
          isLoading={usdValueIsLoading}
          isRefetching={usdValueIsRefetching}
          error={!!usdValueError}
        >
          {usdValueData && `$${usdValueData.valueInUsd.toFixed(2)}`}
        </CoinsTableDataFetching>
      </td>

      <td>
        <CoinsTableDataFetching
          isLoading={portfolioIsLoading}
          isRefetching={portfolioIsRefetching}
          error={!!portfolioError}
          classObject={
            portfolioData && {
              'text-green-500': portfolioData?.changePercent > 0,
              'text-red-500': portfolioData?.changePercent < 0
            }
          }
        >
          {portfolioData &&
            `${formatToCurrency({
              floatAmount: portfolioData.changePercent,
              signDisplay: 'exceptZero'
            })}%`}
        </CoinsTableDataFetching>
      </td>
    </tr>
  )
}

CoinsTableTr.displayName = 'CoinsTable.Tr'
