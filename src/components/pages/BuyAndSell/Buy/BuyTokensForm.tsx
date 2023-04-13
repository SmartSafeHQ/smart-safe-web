import Image from 'next/image'
import clsx from 'clsx'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { CoinsDropDownInput } from '@components/Inputs/CoinsDropDownInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { TextInput } from '@components/Inputs/TextInput'
import { SelectInput } from '@components/Inputs/SelectInput'

import { ACCEPTED_CURRENCIES } from '@utils/stableCoinsUtils'
import { STABLE_COINS } from '@utils/global/coins/stableCoinsConfig'
import { useSelectBuyCoin } from '@hooks/buyAndSell/buy/useSelectBuyCoin'

export function BuyTokensForm() {
  const {
    t,
    handleSubmit,
    onSubmit,
    errors,
    register,
    currency,
    handleChangeCurrency,
    handleChangeToken,
    currencyIsFetching,
    currencyIsLoading,
    isPreviousData,
    currencyData,
    token,
    currentAmount,
    isSubmitting
  } = useSelectBuyCoin()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-8 items-stretch"
    >
      <div className="w-full flex flex-col gap-8 items-stretch">
        <div className="w-full flex items-end justify-center group">
          <TextInput.Root
            htmlFor="amount"
            className="w-full"
            error={errors.amount?.message}
          >
            <TextInput.Label>{t.buyStableCoin.amountLabel}</TextInput.Label>

            <TextInput.Content className="rounded-r-none">
              <TextInput.Input
                {...register('amount', {
                  valueAsNumber: true,
                  value: currency.amount || undefined,
                  min: 0
                })}
                required
                id="amount"
                type="number"
                min={0.0}
                step={0.1}
                placeholder={`${currency.currency} 0.00`}
              />
            </TextInput.Content>
          </TextInput.Root>

          <SelectInput.Root
            className="w-44"
            defaultValue={ACCEPTED_CURRENCIES[0].symbol}
            value={currency.symbol}
            onValueChange={handleChangeCurrency}
          >
            <SelectInput.Trigger
              className={clsx(
                'min-h-[3rem] py-1 rounded-l-none uppercase !ring-gray-300 dark:!ring-gray-700 group-focus-within:ring-2 bg-gray-300 dark:bg-gray-700',
                {
                  'mb-8 ring-2': !!errors.amount
                }
              )}
            />

            <SelectInput.Content className="bg-gray-200 dark:bg-gray-800">
              <SelectInput.Group>
                {ACCEPTED_CURRENCIES.map(c => (
                  <SelectInput.Item
                    key={c.symbol}
                    value={c.symbol}
                    className="min-h-[1rem] py-1"
                  >
                    <div className="w-full flex items-center justify-start gap-2">
                      <Image
                        src={c.avatar}
                        alt={`${c.symbol} coin`}
                        width={26}
                        height={26}
                        className="w-7 h-6"
                      />

                      <Text className="text-lg font-bold dark:text-gray-50 uppercase">
                        {c.symbol}
                      </Text>
                    </div>
                  </SelectInput.Item>
                ))}
              </SelectInput.Group>
            </SelectInput.Content>
          </SelectInput.Root>
        </div>

        <label className="flex flex-col gap-2">
          <Text className="font-semibold">{t.buyStableCoin.coinLabel}</Text>

          <CoinsDropDownInput
            coins={STABLE_COINS}
            onValueChange={handleChangeToken}
            value={String(
              STABLE_COINS.findIndex(t => t.symbol === token.symbol) ?? 0
            )}
          />
        </label>

        <div
          className={clsx(
            'flex items-center text-gray-800 dark:text-gray-200',
            {
              'animate-pulse': currencyIsFetching
            }
          )}
        >
          <Skeleton
            isLoading={currencyIsLoading || isPreviousData}
            className="w-full h-6"
          >
            {currencyData && (
              <>
                <Text className="mr-5">{t.buyStableCoin.coinAppr}</Text>

                <Image
                  src={token.avatar}
                  alt={`${token.symbol} icon`}
                  width={20}
                  height={20}
                  className="mr-2 w-5 h-5"
                />

                <Text className="font-semibold">
                  {(currentAmount / currencyData.value).toFixed(3)} (
                  {currency.currency} {currentAmount.toFixed(2)})
                </Text>
              </>
            )}
          </Skeleton>
        </div>
      </div>

      <Button type="submit" isLoading={isSubmitting} className="capitalize">
        {t.buyStableCoin.continue}
      </Button>
    </form>
  )
}
