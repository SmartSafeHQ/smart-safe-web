import clsx from 'clsx'
import { Info } from 'phosphor-react'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { CoinsDropDownInput } from '@components/Inputs/CoinsDropDownInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { TextInput } from '@components/Inputs/TextInput'

import { STABLE_COINS } from '@utils/global/coins/stableCoinsConfig'
import { useSelectSellCoin } from '@hooks/buyAndSell/sell/useSelectSellCoin'

export function SelectCoinSellForm() {
  const {
    t,
    customer,
    customerBalance,
    currentAmount,
    currencyData,
    currencyIsLoading,
    currencyIsFetching,
    isSubmitting,
    isPreviousData,
    customerBalanceIsFetching,
    selectedStableCoin,
    handleChangeStableCoin,
    register,
    onSubmit,
    errors,
    handleSubmit,
    withdrawAmount
  } = useSelectSellCoin()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-5 items-stretch"
    >
      <div className="flex items-center gap-2">
        <Text asChild className="font-semibold">
          <p>{t.sellStableCoin.wallet}:</p>
        </Text>

        {customer?.wallets.evm.formattedAddress}
      </div>

      <div className="flex flex-col items-stretch gap-3">
        <CoinsDropDownInput
          coins={STABLE_COINS}
          onValueChange={handleChangeStableCoin}
          value={String(
            STABLE_COINS.findIndex(
              t => t.symbol === selectedStableCoin.symbol
            ) ?? 0
          )}
        />

        <div className="flex items-stretch">
          <Skeleton
            isLoading={customerBalanceIsFetching}
            className="w-full h-5"
          >
            {customerBalance && (
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                {t.sellStableCoin.accountBalance} {customerBalance}{' '}
                {selectedStableCoin.symbol}
              </Text>
            )}
          </Skeleton>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <TextInput.Root htmlFor="amount" error={errors.amount?.message}>
          <TextInput.Label>{t.sellStableCoin.amountToWithdraw}</TextInput.Label>

          <TextInput.Content>
            <TextInput.Input
              {...register('amount', {
                valueAsNumber: true,
                value: withdrawAmount || undefined
              })}
              required
              id="amount"
              type="number"
              min={0.0}
              step={0.1}
              placeholder={`${selectedStableCoin.symbol} ${t.sellStableCoin.amountOfTokensToWithdraw}`}
            />
          </TextInput.Content>
        </TextInput.Root>

        <div
          className={clsx(
            'w-full flex items-center gap-2 pb-3 font-medium border-b-1 border-gray-400 dark:border-gray-600',
            {
              'animate-pulse': currencyIsFetching
            }
          )}
        >
          <Skeleton
            className="w-full h-6"
            isLoading={currencyIsLoading || isPreviousData}
          >
            {currencyData && (
              <Text className="flex gap-2">
                {t.sellStableCoin.youWillWithdraw}{' '}
                {Intl.NumberFormat('pt-BR', {
                  currency: 'BRL',
                  style: 'currency'
                }).format(currentAmount * (currencyData.value ?? 0))}
              </Text>
            )}
          </Skeleton>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Info className="w-6 h-6 text-red-500" />

          <Text asChild>
            <p>{t.sellStableCoin.withdrawSpread}</p>
          </Text>
        </div>

        <Button type="submit" isLoading={isSubmitting} className="capitalize">
          {t.sellStableCoin.continue}
        </Button>
      </div>
    </form>
  )
}
