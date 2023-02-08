import { HTMLAttributes, ReactNode, ThHTMLAttributes } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'
import { Avatar } from '@components/Avatar'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useCoinPortfolio } from '@hooks/global/coins/queries/useCoinPortfolio'
import { useCoinValueInUsd } from '@hooks/global/coins/queries/useCoinValueInUsd'

interface CoinsTableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
}

export function CoinsTableTh({
  children,
  className,
  ...props
}: CoinsTableThProps) {
  return (
    <th
      className={clsx(
        'first:pl-4 px-2 pb-2 whitespace-nowrap text-start font-semibold text-xs md:text-sm md:px-0',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

CoinsTableTh.displayName = 'CoinsTable.Th'

interface CoinsTableTrProps extends HTMLAttributes<HTMLTableRowElement> {
  network: string
  symbol: string
  rpcUrl: string
  avatar: string
  customerAccount?: string
}

export function CoinsTableTr({
  customerAccount,
  network,
  symbol,
  rpcUrl,
  avatar,
  className,
  ...props
}: CoinsTableTrProps) {
  const {
    data: portfolioData,
    isLoading: portfolioIsLoading,
    isRefetching: portfolioIsRefetching
  } = useCoinPortfolio({ rpcUrl, symbol }, customerAccount)

  const {
    data: usdValueData,
    isLoading: usdValueIsLoading,
    isRefetching: usdValueIsRefetching
  } = useCoinValueInUsd(symbol)

  return (
    <tr
      className={clsx(
        'text-gray-800 dark:text-gray-50 font-medium border-b-[0.5px] border-gray-400 dark:border-gray-600',
        className
      )}
      {...props}
    >
      <td className="pl-4 py-3 min-w-[10rem]">
        <div className="flex items-center gap-4">
          <Avatar.Root
            fallbackName={symbol}
            className="w-8 h-8 md:w-11 md:h-11"
          >
            <Avatar.Image src={avatar} alt={network} />
          </Avatar.Root>

          <div className="flex flex-col">
            <Text className="font-bold uppercase">{symbol}</Text>

            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {network}
            </Text>
          </div>
        </div>
      </td>

      <td className="min-w-[5rem]">
        <Skeleton isLoading={portfolioIsLoading} className="w-24 h-7">
          {portfolioData && (
            <Text
              className={clsx({
                'text-green-500': portfolioData.changePercent >= 0,
                'text-red-500': portfolioData.changePercent < 0,
                'animate-pulse': portfolioIsRefetching
              })}
            >
              {new Intl.NumberFormat('en-US', {
                signDisplay: 'exceptZero'
              }).format(Number(portfolioData.changePercent.toFixed(2)))}
              %
            </Text>
          )}
        </Skeleton>
      </td>

      <td className="min-w-[5rem] font-semibold">
        <Skeleton isLoading={usdValueIsLoading} className="w-24 h-7">
          {usdValueData && (
            <Text
              className={clsx('font-medium uppercase', {
                'animate-pulse': usdValueIsRefetching
              })}
            >
              ${usdValueData.valueInUsd.toFixed(2)}
            </Text>
          )}
        </Skeleton>
      </td>

      <td className="min-w-[5rem]">
        <div className="flex flex-col">
          <Skeleton
            isLoading={usdValueIsLoading || portfolioIsLoading}
            className="w-24 h-5"
          >
            {usdValueData && portfolioData && (
              <Text
                className={clsx('font-medium uppercase', {
                  'animate-pulse': usdValueIsRefetching || portfolioIsRefetching
                })}
              >
                ${(portfolioData.balance / usdValueData.valueInUsd).toFixed(2)}
              </Text>
            )}
          </Skeleton>

          <Skeleton isLoading={portfolioIsLoading} className="w-24 h-5 mt-2">
            {portfolioData && (
              <Text
                className={clsx(
                  'uppercase text-sm text-gray-500 dark:text-gray-400',
                  {
                    'animate-pulse': portfolioIsRefetching
                  }
                )}
              >
                {portfolioData?.balance} {symbol}
              </Text>
            )}
          </Skeleton>
        </div>
      </td>
    </tr>
  )
}

CoinsTableTr.displayName = 'CoinsTable.Tr'

export const CoinsTable = {
  Th: CoinsTableTh,
  Tr: CoinsTableTr
}
