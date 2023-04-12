import Head from 'next/head'
import Link from 'next/link'
import { ReactElement } from 'react'
import Image from 'next/image'
import { CaretRight, QrCode } from 'phosphor-react'

import { BackLink } from '@components/pages/BuyAndSell/BackLink'
import { ErrorState } from '@components/FetchingStates/ErrorState'
import { Heading } from '@components/Heading'
import { Text } from '@components/Text'

import {
  BuyStableCoinProvider,
  useBuyStableCoin
} from '@contexts/BuyStableCoinContext'
import { useI18n } from '@hooks/useI18n'
import { useConverCurrencies } from '@hooks/buyAndSell/queries/useConverCurrencies'

const BuySelectMethod = () => {
  const { currency, token } = useBuyStableCoin()
  const { t } = useI18n()
  const { data: currencyData } = useConverCurrencies(
    token.parityCurrencySymbol,
    currency.symbol
  )

  const amountInTokens = currency.amount / (currencyData?.value ?? 0)

  if (currency.amount <= 0)
    return (
      <ErrorState
        title={t.buyAndSell.buy.noAmountError}
        className="flex-1 p-12"
      />
    )

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-4 pt-8 gap-8 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.buy.headTitle}</title>
        <meta name="description" content={t.buyAndSell.buy.headDescription} />
      </Head>

      <div className="w-full flex justify-start items-stretch">
        <BackLink href="/dashboard/buy-and-sell/buy" />
      </div>

      <div className="w-full max-w-2xl flex flex-1 flex-col gap-10">
        <Heading
          asChild
          className="max-w-sm text-gray-800 dark:text-gray-50 text-2xl md:max-w-xl sm:text-3xl md:text-4xl"
        >
          <h1>{t.buyAndSell.buy.selectMethod}</h1>
        </Heading>

        <section className="w-full flex flex-col items-stretch">
          <div className="flex flex-col items-start justify-start gap-8">
            <div className="flex flex-col items-start justify-start gap-1">
              <Text
                asChild
                className="capitalize font-medium text-gray-500 dark:text-gray-300"
              >
                <strong>{t.buyAndSell.buy.purchase}</strong>
              </Text>

              <div className="flex items-center justify-start gap-2">
                <Image
                  src={token.avatar}
                  alt={`${token.symbol} icon`}
                  width={20}
                  height={20}
                  className="w-6 h-6"
                />

                <Text className="text-xl font-semibold">
                  {amountInTokens.toFixed(2)} {token.symbol}
                </Text>
              </div>
            </div>

            <Link
              href="/dashboard/buy-and-sell/buy/payments/pix"
              className="w-full flex items-center justify-start gap-5 p-4 md:p-5 rounded-md border-2 border-transparent shadow-md transition-colors bg-gray-100 dark:bg-gray-800 hover:border-brand-foregroundAccent1"
            >
              <QrCode className="w-14 h-14 md:w-12 md:h-12 text-brand-foregroundAccent2" />

              <div className="max-w-[16rem] flex flex-col items-start gap-2 md:max-w-[19rem]">
                <Text className="text-2xl md:text-3xl" asChild>
                  <strong>Pix</strong>
                </Text>

                <Text className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                  {t.buyAndSell.buy.pixDesc}
                </Text>
              </div>

              <div className="flex items-center ml-auto">
                <CaretRight className="w-6 h-12" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

BuySelectMethod.getLayout = function getLayout(page: ReactElement) {
  return <BuyStableCoinProvider>{page}</BuyStableCoinProvider>
}

export default BuySelectMethod
