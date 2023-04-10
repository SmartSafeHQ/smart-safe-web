import Image from 'next/image'

import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { SelectStableCoinAmount } from '../components/SelectStableCoinAmount'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Text } from '@components/Text'

import { STABLE_COINS } from '@utils/global/coins/stableCoinsConfig'
import { useSelectSellCoin } from '@hooks/buyAndSell/sell/useSelectSellCoin'

export function StableCoinAmount() {
  const {
    t,
    customer,
    customerBalance,
    selectedStableCoin,
    handleChangeStableCoin,
    onSubmit,
    handleSubmit
  } = useSelectSellCoin()

  return (
    <>
      <Heading asChild className="text-gray-800 dark:text-gray-50 text-4xl">
        <h1>{t.sell.headings.sell}</h1>
      </Heading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-8 items-stretch"
      >
        <div>
          <p className="font-bold">{t.sell.wallet}: </p>

          {customer?.wallets.evm.formattedAddress}
        </div>

        <SelectInput.Root
          className="w-full"
          defaultValue="0"
          onValueChange={handleChangeStableCoin}
        >
          <SelectInput.Trigger className="min-h-[3rem] py-1 bg-gray-200 dark:bg-gray-800" />

          <SelectInput.Content className="bg-gray-200 dark:bg-gray-800">
            <SelectInput.Group>
              {STABLE_COINS.map((token, i) => (
                <SelectInput.Item
                  key={token.symbol}
                  value={String(i)}
                  className="min-h-[3rem] py-1"
                >
                  <div className="w-full flex items-center justify-start gap-2">
                    <Image
                      src={token.avatar}
                      alt={`${token.symbol} token`}
                      width={28}
                      height={28}
                    />

                    <Text className="text-xl font-bold dark:text-gray-50 uppercase">
                      {token.symbol}
                    </Text>
                  </div>
                </SelectInput.Item>
              ))}
            </SelectInput.Group>
          </SelectInput.Content>
        </SelectInput.Root>

        <div className="p-2 rounded-md flex border-1 bg-brand-foregroundAccent1/10 border-brand-foregroundAccent2/30 dark:border-gray-800 dark:bg-gray-800/40">
          <p>
            {t.sell.accountBalance}{' '}
            <span className="font-bold">
              {customerBalance} {selectedStableCoin.symbol}
            </span>
          </p>
        </div>
      </form>

      <div className="flex flex-col gap-2">
        <SelectStableCoinAmount />

        <Button>{t.sell.bankData}</Button>
      </div>
    </>
  )
}
