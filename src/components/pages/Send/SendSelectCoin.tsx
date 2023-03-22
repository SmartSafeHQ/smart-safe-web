import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { Avatar } from '@components/Avatar'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { CoinsDropDownInput } from '@components/Inputs/CoinsDropDownInput'

import { useCustomSendHook } from '@hooks/send/useSend'
import { useCoinPortfolio } from '@hooks/global/coins/queries/useCoinPortfolio'
import { useSend } from '@contexts/SendContext'
import { FetchCustomerCoinsResponse } from '@hooks/global/coins/queries/useCustomerCoins'

interface SendSelectCoinProps {
  coinsIsLoading: boolean
  coinsData?: FetchCustomerCoinsResponse
  handleChangeCoin: (_coinIndex: string) => void
}

export function SendSelectCoin({
  coinsData,
  coinsIsLoading,
  handleChangeCoin
}: SendSelectCoinProps) {
  const { t, customer } = useCustomSendHook()
  const { selectedCoin } = useSend()

  const { data: portfolioData, isLoading: portfolioIsLoading } =
    useCoinPortfolio({ coin: selectedCoin, accounts: customer?.wallets })

  return (
    <>
      <div className="flex flex-col items-start gap-6">
        <Heading asChild className="text-gray-800 dark:text-gray-50 text-4xl">
          <h1>{t.send.sendUsing}:</h1>
        </Heading>

        <Skeleton isLoading={coinsIsLoading} className="w-full h-12">
          {coinsData && (
            <CoinsDropDownInput
              coins={coinsData.coins}
              onValueChange={handleChangeCoin}
            />
          )}
        </Skeleton>
      </div>

      <Skeleton isLoading={coinsIsLoading} className="w-52 h-24 mx-auto">
        {selectedCoin && (
          <div className="w-full flex items-center justify-center gap-3">
            <Avatar.Root
              fallbackName={selectedCoin.symbol}
              className="w-24 h-24"
            >
              <Avatar.Image
                src={selectedCoin.avatar}
                alt={`${selectedCoin.symbol} coin`}
              />
            </Avatar.Root>

            <div className="flex flex-col justify-center items-start">
              <Heading className="text-3xl uppercase">
                {selectedCoin.symbol}
              </Heading>

              <Skeleton isLoading={portfolioIsLoading} className="w-28 h-6">
                {portfolioData && (
                  <div className="flex items-center gap-1">
                    <Text className="capitalize">{t.send.balance}:</Text>

                    <Text className="font-semibold">
                      {portfolioData.balance.toFixed(3)}
                    </Text>
                  </div>
                )}
              </Skeleton>
            </div>
          </div>
        )}
      </Skeleton>
    </>
  )
}
