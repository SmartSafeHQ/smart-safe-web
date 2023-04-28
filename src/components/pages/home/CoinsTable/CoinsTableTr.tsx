import { HTMLAttributes } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { Text } from '@components/Text'
import { CoinsTableDataFetching } from './CoinsTableDataFetching'

import { formatToCurrency } from '@utils/global/coins'
import type { SupportedNetworks } from '@utils/global/types'
import { useCoinPortfolio } from '@hooks/global/coins/queries/useCoinPortfolio'
import { useCoinValueInUsd } from '@hooks/global/coins/queries/useCoinValueInUsd'
import { useGetBalance } from '@hooks/web3/useGetBalance'
import { useConverCurrencies } from '@hooks/buyAndSell/queries/useConverCurrencies'
import { useAuth } from '@contexts/AuthContext'

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

interface StableCoinsTableTrProps extends HTMLAttributes<HTMLTableRowElement> {
  networkName: string
  symbol: string
  rpcUrl: string
  avatar: string
  parityCurrencySymbol: string
  contractAddress: string
  contractName: string
}

export function StableCoinsTableTr({
  networkName,
  contractAddress,
  contractName,
  parityCurrencySymbol,
  symbol,
  rpcUrl,
  avatar,
  className,
  ...props
}: StableCoinsTableTrProps) {
  const { customer } = useAuth()
  const {
    data: portfolioData,
    isLoading: portfolioIsLoading,
    isRefetching: portfolioIsRefetching,
    error: portfolioError
  } = useGetBalance({
    contractAddress,
    contractName,
    customerAddress: customer?.wallets.evm.address,
    networkRpcUrl: rpcUrl
  })

  const {
    data: currencyData,
    isLoading: currencyIsLoading,
    isFetching: currencyIsFetching,
    isError: currencyIsError
  } = useConverCurrencies(parityCurrencySymbol, 'usd')

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
          <div className="w-8 h-8 flex items-center justify-center md:w-11 md:h-11">
            <Image
              src={avatar}
              alt={networkName}
              width={32}
              height={32}
              className="w-8 h-8"
            />
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
            isLoading={currencyIsLoading || portfolioIsLoading || !customer}
            isRefetching={currencyIsFetching || portfolioIsRefetching}
            error={!!currencyIsError || !!portfolioError}
            skeletonClassName="h-6"
          >
            {portfolioData &&
              currencyData &&
              `$${(+portfolioData * currencyData.value).toFixed(2)}`}
          </CoinsTableDataFetching>

          <CoinsTableDataFetching
            isLoading={portfolioIsLoading || !customer}
            isRefetching={portfolioIsRefetching}
            error={!!portfolioError}
            className="uppercase text-sm text-gray-500 dark:text-gray-400"
            skeletonClassName="h-6 mt-1"
          >
            {portfolioData && `${(+portfolioData).toFixed(2)} ${symbol}`}
          </CoinsTableDataFetching>
        </div>
      </td>

      <td>
        <CoinsTableDataFetching
          isLoading={currencyIsLoading}
          isRefetching={currencyIsFetching}
          error={!!currencyIsError}
        >
          {currencyData && `$${currencyData.value.toFixed(2)}`}
        </CoinsTableDataFetching>
      </td>

      <td>
        <CoinsTableDataFetching
          isLoading={false}
          isRefetching={false}
          error={false}
        >
          0.00%
        </CoinsTableDataFetching>
      </td>
    </tr>
  )
}

StableCoinsTableTr.displayName = 'CoinsTable.StableTr'
