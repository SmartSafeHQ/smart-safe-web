import Head from 'next/head'
import Link from 'next/link'
import { ArrowRight, PaperPlaneTilt, ShoppingCartSimple } from 'phosphor-react'

import { Text } from '@components/Text'
import { Heading } from '@components/Heading'

import { useI18n } from '@hooks/useI18n'

const BuyAndSell = () => {
  const { t } = useI18n()

  return (
    <div className="flex flex-1 flex-col items-center px-4 pt-6 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.headTitle}</title>
        <meta name="description" content={t.buyAndSell.headDescription} />
      </Head>

      <div className="w-full max-w-5xl flex flex-1 flex-col items-stretch gap-12 pt-10">
        <div className="w-full flex justify-start items-start flex-col'">
          <Heading
            className="text-3xl font-semibold text-gray-800 dark:text-gray-50"
            asChild
          >
            <h1>Selecione compra/venda</h1>
          </Heading>
        </div>

        <section className="w-full flex flex-wrap items-start1 justify-center gap-6">
          <article className="w-full min-w-[25rem] flex flex-1 flex-col items-center gap-8 bg-gray-100 dark:bg-gray-800 pt-7 pb-10 px-6 rounded-md shadow-lg border-1 border-gray-200 dark:border-gray-800">
            <Text
              asChild
              className="w-full flex items-center justify-center gap-4 p-3 capitalize text-lg font-bold text-gray-50 bg-green-500 rounded-md"
            >
              <Link href="/buy-and-sell/buy">
                <Text>Buy now</Text>

                <ArrowRight className="w-6 h-6" weight="bold" />
              </Link>
            </Text>

            <div className="w-full flex flex-col items-start gap-8">
              <div className="w-full flex items-center justify-start gap-4">
                <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <ShoppingCartSimple
                    className="text-[28px] text-brand-foregroundAccent1"
                    weight="bold"
                  />
                </div>

                <Text
                  asChild
                  className="text-2xl capitalize font-bold text-gray-800 dark:text-gray-100"
                >
                  <strong>Buy process</strong>
                </Text>
              </div>

              <ol className="flex flex-col text-lg gap-4 text-gray-500 dark:text-gray-300">
                <li>1. Enter your wallet adress</li>
                <li>
                  2. Wire funds from your bank account, using the wiring
                  instructions provided.
                </li>
                <li>3. The Coin will be sent to your wallet address.</li>
              </ol>
            </div>
          </article>

          <article className="w-full min-w-[25rem] flex flex-1 flex-col items-center gap-8 bg-gray-100 dark:bg-gray-800 pt-7 pb-10 px-6 rounded-md shadow-lg border-1 border-gray-200 dark:border-gray-800">
            <Text
              asChild
              className="w-full flex items-center justify-center gap-4 p-3 capitalize text-lg font-bold text-gray-50 bg-red-500 rounded-md"
            >
              <Link href="/buy-and-sell/sell">
                <Text>Sell now</Text>

                <ArrowRight className="w-6 h-6" weight="bold" />
              </Link>
            </Text>

            <div className="w-full flex flex-col items-start gap-8">
              <div className="w-full flex items-center justify-start gap-4">
                <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <PaperPlaneTilt
                    className="text-[28px] text-brand-foregroundAccent1"
                    weight="bold"
                  />
                </div>

                <Text
                  asChild
                  className="text-2xl capitalize font-bold text-gray-800 dark:text-gray-100"
                >
                  <strong>Sell process</strong>
                </Text>
              </div>

              <ol className="flex flex-col text-lg gap-4 text-gray-500 dark:text-gray-300">
                <li>1. Add the bank account you will to receive funds.</li>
                <li>
                  2. Send coin to your redemption address, using the provided
                  instructions.
                </li>
                <li>3. The Coin will be deposited to your bank account.</li>
              </ol>
            </div>
          </article>
        </section>
      </div>
    </div>
  )
}

export default BuyAndSell
