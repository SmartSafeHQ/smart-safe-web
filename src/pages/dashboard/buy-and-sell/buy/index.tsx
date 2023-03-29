import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'phosphor-react'

import { BuyTokensForm } from '@components/pages/BuyAndSell/Buy/BuyTokensForm'
import { Heading } from '@components/Heading'
import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'

const Buy = () => {
  const { t } = useI18n()

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 pt-8 gap-8 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.buy.headTitle}</title>
        <meta name="description" content={t.buyAndSell.buy.headDescription} />
      </Head>

      <div className="w-full flex justify-start items-stretch">
        <Link
          href="/dashboard/buy-and-sell"
          className="flex justify-center items-center gap-3 px-4 py-2 rounded-md font-medium capitalize transition-colors hover:bg-gray-200 hover:dark:bg-gray-800"
        >
          <ArrowLeft className="w-5 h-5" weight="bold" />

          <Text>{t.buyAndSell.buy.back}</Text>
        </Link>
      </div>

      <div className="w-full max-w-lg flex flex-1 flex-col gap-10">
        <Heading asChild className="text-gray-800 dark:text-gray-50 text-4xl">
          <h1>{t.buyAndSell.buy.buyCoin}</h1>
        </Heading>

        <BuyTokensForm />
      </div>
    </div>
  )
}

export default Buy
