import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, CaretRight, QrCode } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'

import {
  BuyStableCoinProvider,
  useBuyStableCoin
} from '@contexts/BuyStableCoinContext'
import { useI18n } from '@hooks/useI18n'

const BuySelectMethod = () => {
  const { currency } = useBuyStableCoin()
  const { t } = useI18n()

  console.log(currency)

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 pt-8 gap-8 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.buy.headTitle}</title>
        <meta name="description" content={t.buyAndSell.buy.headDescription} />
      </Head>

      <BuyStableCoinProvider>
        <div className="w-full flex justify-start items-stretch">
          <Link
            href="/dashboard/buy-and-sell"
            className="flex justify-center items-center gap-3 px-4 py-2 rounded-md font-medium capitalize transition-colors hover:bg-gray-200 hover:dark:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" weight="bold" />

            <Text>{t.buyAndSell.buy.back}</Text>
          </Link>
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
              <div className="flex flex-col items-start justify-start">
                <Text
                  asChild
                  className="capitalize text-lg text-gray-500 dark:text-gray-300"
                >
                  <strong>{t.buyAndSell.buy.value}</strong>
                </Text>

                <Text className="text-lg font-semibold">R$ 200.00</Text>
              </div>

              <Link
                href="/dashboard/buy-and-sell/buy/payments/pix"
                className="w-full flex items-center justify-start gap-5 p-4 md:p-5 rounded-md border-2 border-transparent transition-colors bg-gray-200 dark:bg-gray-800 hover:border-brand-foregroundAccent1"
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

                <div className="flex items-center gap-5 ml-auto">
                  <Text
                    asChild
                    className="hidden md:flex md:text-2xl lg:text-3xl"
                  >
                    <strong>200 iBRL</strong>
                  </Text>

                  <CaretRight className="w-6 h-12" />
                </div>
              </Link>
            </div>
          </section>
        </div>
      </BuyStableCoinProvider>
    </div>
  )
}

export default BuySelectMethod
