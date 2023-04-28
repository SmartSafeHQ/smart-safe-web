import { ReactElement } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { CheckCircle } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { ErrorState } from '@components/FetchingStates/ErrorState'

import {
  SellStableCoinContextProvider,
  useSellStableCoin
} from '@contexts/SellStableCoinContext'
import { useI18n } from '@hooks/useI18n'
import { useConverCurrencies } from '@hooks/buyAndSell/queries/useConverCurrencies'

const SellWithdraw = () => {
  const { t } = useI18n()
  const { withdrawAmount, selectedStableCoin } = useSellStableCoin()

  const { data: currencyData } = useConverCurrencies(
    selectedStableCoin.parityCurrencySymbol,
    'brl'
  )

  if (withdrawAmount <= 0)
    return (
      <ErrorState
        title={t.sellStableCoin.invalidDataError}
        className="flex-1 p-12"
      />
    )

  return (
    <div className="w-full flex flex-1 flex-col items-center px-4 pt-24 gap-8 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.sellStableCoin.headTitle}</title>
        <meta name="description" content={t.sellStableCoin.headDescription} />
      </Head>

      <section className="w-full max-w-lg flex flex-col items-center justify-center gap-6">
        <div className="w-full flex flex-col items-center justify-center gap-8">
          <Heading
            asChild
            className="text-center text-gray-800 dark:text-gray-50 text-3xl md:text-4xl"
          >
            <h1>{t.sellStableCoin.withdrawalSuccessHeading}</h1>
          </Heading>

          <div className="p-3 rounded-full bg-gray-200 dark:bg-gray-800">
            <CheckCircle className="w-20 h-20 text-brand-foregroundAccent1" />
          </div>
        </div>

        <div className="w-full max-w-lg flex flex-1 flex-col gap-6 items-center">
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <Text asChild className="text-4xl uppercase">
              <strong>
                {selectedStableCoin.symbol} {withdrawAmount.toFixed(2)}
              </strong>
            </Text>

            {currencyData && (
              <Text className="text-2xl uppercase text-gray-500 dark:text-gray-400">
                {Intl.NumberFormat('pt-BR', {
                  currency: 'BRL',
                  style: 'currency'
                }).format(withdrawAmount * (currencyData.value ?? 0))}
              </Text>
            )}
          </div>

          <Link
            href="/dashboard/buy-and-sell"
            className="font-medium transition-colors underline text-brand-foregroundAccent1 hover:text-brand-foregroundAccent2"
          >
            {t.buyStableCoin.backTo}
          </Link>
        </div>
      </section>
    </div>
  )
}

SellWithdraw.getLayout = function getLayout(page: ReactElement) {
  return <SellStableCoinContextProvider>{page}</SellStableCoinContextProvider>
}

export default SellWithdraw
