import Head from 'next/head'
import { ReactElement } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Info } from 'phosphor-react'

import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { SelectInput } from '@components/Inputs/SelectInput'
import { Skeleton } from '@components/FetchingStates/Skeleton'
import { BackLink } from '@components/pages/BuyAndSell/BackLink'
import { TextInput } from '@components/Inputs/TextInput'
import { Text } from '@components/Text'

import { STABLE_COINS } from '@utils/global/coins/stableCoinsConfig'
import { useSelectSellCoin } from '@hooks/buyAndSell/sell/useSelectSellCoin'
import { SellStableCoinContextProvider } from '@contexts/SellStableCoinContext'

const Sell = () => {
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
    selectedStableCoin,
    handleChangeStableCoin,
    register,
    onSubmit,
    errors,
    handleSubmit
  } = useSelectSellCoin()

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-4 pt-8 gap-8 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.sell.headTitle}</title>
        <meta name="description" content={t.buyAndSell.sell.headDescription} />
      </Head>

      <div className="w-full flex justify-start items-stretch">
        <BackLink href="/dashboard/buy-and-sell" />
      </div>

      <div className="w-full max-w-lg flex flex-1 flex-col gap-10">
        <Heading asChild className="text-gray-800 dark:text-gray-50 text-4xl">
          <h1>{t.sell.headings.sell}</h1>
        </Heading>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-5 items-stretch"
        >
          <div className="flex items-center gap-2">
            <Text asChild className="font-semibold">
              <p>{t.sell.wallet}:</p>
            </Text>

            {customer?.wallets.evm.formattedAddress}
          </div>

          <div className="flex flex-col items-stretch gap-3">
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
                          alt={`${token.symbol} stable coins`}
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

            <div className="flex items-stretch">
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                {t.sell.accountBalance} {customerBalance}{' '}
                {selectedStableCoin.symbol}
              </Text>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <TextInput.Root htmlFor="amount" error={errors.amount?.message}>
              <TextInput.Label>{t.sell.amountToWithdraw}</TextInput.Label>

              <TextInput.Content>
                <TextInput.Input
                  {...register('amount', {
                    required: {
                      value: true,
                      message: t.sell.inputs.errorMessages.required
                    }
                  })}
                  placeholder={t.sell.amountOfTokensToWithdraw}
                />
              </TextInput.Content>
            </TextInput.Root>

            <div className="w-full flex items-center gap-2 pb-3 border-b-1 border-gray-400 dark:border-gray-600">
              <Text asChild>
                <p>{t.sell.youWillWithdraw}</p>
              </Text>

              <Skeleton
                isLoading={currencyIsLoading || isPreviousData}
                className={clsx('w-full h-6', {
                  'animate-pulse': currencyIsFetching
                })}
              >
                {currencyData && (
                  <>
                    <Text className="mr-5">{t.buyAndSell.buy.coinAppr}</Text>

                    <Text className="font-semibold">
                      {Intl.NumberFormat('pt-BR', {
                        currency: 'BRL',
                        style: 'currency'
                      }).format(currentAmount * (currencyData.value ?? 0))}
                    </Text>
                  </>
                )}
              </Skeleton>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Info className="w-6 h-6 text-red-500" />

              <Text asChild>
                <p>{t.sell.withdrawSpread}</p>
              </Text>
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="capitalize"
            >
              {t.sell.continue}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

Sell.getLayout = function getLayout(page: ReactElement) {
  return <SellStableCoinContextProvider>{page}</SellStableCoinContextProvider>
}

export default Sell
