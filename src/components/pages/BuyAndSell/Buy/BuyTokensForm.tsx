import Image from 'next/image'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { CoinsDropDownInput } from '@components/Inputs/CoinsDropDownInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { TextInput } from '@components/Inputs/TextInput'
import { SelectInput } from '@components/Inputs/SelectInput'

import { useI18n } from '@/hooks/useI18n'

const ACCEPTED_CURRENCIES = [
  { symbol: 'brl', avatar: '/languages/br.svg' },
  { symbol: 'usd', avatar: '/languages/us.svg' },
  { symbol: 'eur', avatar: '/languages/eur.svg' }
]

const ACCEPTED_TOKENS = [
  { avatar: '/networks/ibrl-logo.svg', symbol: 'ibrl' },
  { avatar: '/networks/ibrl-logo.svg', symbol: 'ieur' }
]

export function BuyTokensForm() {
  const { t } = useI18n()

  return (
    <form className="w-full flex flex-col gap-8 items-stretch">
      <div className="w-full flex flex-col gap-8 items-stretch">
        <div className="w-full flex items-end justify-center group">
          <TextInput.Root htmlFor="amount" className="w-full">
            <TextInput.Label>{t.buyAndSell.buy.amountLabel}</TextInput.Label>

            <TextInput.Content className="rounded-r-none">
              <TextInput.Input
                required
                id="amount"
                type="number"
                min={0.0}
                placeholder="R$ 0.00"
              />
            </TextInput.Content>
          </TextInput.Root>

          <SelectInput.Root className="w-44" defaultValue="0">
            <SelectInput.Trigger className="min-h-[3rem] py-1 rounded-l-none uppercase !ring-gray-300 dark:!ring-gray-700 group-focus-within:ring-2 bg-gray-300 dark:bg-gray-700" />

            {/* error => mb-[1.85rem]  */}

            <SelectInput.Content className="bg-gray-200 dark:bg-gray-800">
              <SelectInput.Group>
                {ACCEPTED_CURRENCIES.map((currency, i) => (
                  <SelectInput.Item
                    key={currency.symbol}
                    value={String(i)}
                    className="min-h-[1rem] py-1"
                  >
                    <div className="w-full flex items-center justify-start gap-2">
                      <Image
                        src={currency.avatar}
                        alt={`${currency.symbol} coin`}
                        width={26}
                        height={26}
                      />

                      <Text className="text-lg font-bold dark:text-gray-50 uppercase">
                        {currency.symbol}
                      </Text>
                    </div>
                  </SelectInput.Item>
                ))}
              </SelectInput.Group>
            </SelectInput.Content>
          </SelectInput.Root>
        </div>

        <label className="flex flex-col gap-2">
          <Text className="font-semibold">{t.buyAndSell.buy.coinLabel}</Text>

          <CoinsDropDownInput coins={ACCEPTED_TOKENS} />
        </label>

        <div className="flex items-center text-gray-800 dark:text-gray-200">
          <Skeleton isLoading={false} className="w-full h-7">
            <Text className="mr-5">{t.buyAndSell.buy.coinAppr}</Text>

            <Image
              src="/networks/ibrl-logo.svg"
              alt="icon"
              width={20}
              height={20}
              className="mr-2"
            />

            <Text className="font-semibold">
              {'200'.slice(0, 5)} (R$
              {'200'.slice(0, 4)})
            </Text>
          </Skeleton>
        </div>
      </div>

      <Button type="submit" className="capitalize">
        {t.buyAndSell.buy.continue}
      </Button>
    </form>
  )
}
