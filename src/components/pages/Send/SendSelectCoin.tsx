import Image from 'next/image'

import { Text } from '@components/Text'
import { Heading } from '@components/Heading'
import { SelectInput } from '@/components/Inputs/SelectInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'

import { useSend } from '@contexts/SendContext'
import { useCustomSendHook } from '@hooks/send/useSend'
import { useCoinPortfolio } from '@hooks/global/coins/queries/useCoinPortfolio'
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
            <SelectInput.Root
              className="w-full"
              onValueChange={handleChangeCoin}
              defaultValue={coinsData.nativeTokens[0].symbol}
            >
              <SelectInput.Trigger className="min-h-[3rem] py-1 bg-gray-200 dark:bg-gray-800" />

              <SelectInput.Content className="bg-gray-200 dark:bg-gray-800">
                <SelectInput.Group labelText="Native Tokens">
                  {coinsData.nativeTokens.map(coin => (
                    <SelectInput.Item
                      key={coin.symbol}
                      value={coin.symbol}
                      className="min-h-[3rem] py-1"
                    >
                      <div className="w-full flex items-center justify-start gap-2">
                        <Image
                          src={coin.avatar}
                          alt={`${coin.symbol} coin`}
                          width={28}
                          height={28}
                          className="w-7 h-7"
                        />

                        <Text className="text-xl font-bold dark:text-gray-50 uppercase">
                          {coin.symbol}
                        </Text>
                      </div>
                    </SelectInput.Item>
                  ))}
                </SelectInput.Group>

                <SelectInput.Group labelText="Stable Coins">
                  {coinsData.stableCoins.map(stableCoin => (
                    <SelectInput.Item
                      key={stableCoin.symbol}
                      value={stableCoin.symbol}
                      className="min-h-[3rem] py-1"
                    >
                      <div className="w-full flex items-center justify-start gap-2">
                        <Image
                          src={stableCoin.avatar}
                          alt={`${stableCoin.symbol} coin`}
                          width={28}
                          height={28}
                          className="w-7 h-7"
                        />

                        <Text className="text-xl font-bold dark:text-gray-50 uppercase">
                          {stableCoin.symbol}
                        </Text>
                      </div>
                    </SelectInput.Item>
                  ))}
                </SelectInput.Group>
              </SelectInput.Content>
            </SelectInput.Root>
          )}
        </Skeleton>
      </div>

      <Skeleton isLoading={coinsIsLoading} className="w-52 h-24 mx-auto">
        {selectedCoin && (
          <div className="w-full flex items-center justify-center gap-3">
            <Image
              src={selectedCoin.avatar}
              alt={`${selectedCoin.symbol} coin`}
              width={96}
              height={96}
            />

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
