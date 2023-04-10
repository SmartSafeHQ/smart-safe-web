import Head from 'next/head'
import { ReactElement } from 'react'

import { BuyTokensForm } from '@components/pages/BuyAndSell/Buy/BuyTokensForm'
import { BackLink } from '@components/pages/BuyAndSell/BackLink'
import { Heading } from '@components/Heading'

import { BuyStableCoinProvider } from '@contexts/BuyStableCoinContext'
import { useI18n } from '@hooks/useI18n'

const Buy = () => {
  const { t } = useI18n()

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-4 pt-8 gap-8 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.buy.headTitle}</title>
        <meta name="description" content={t.buyAndSell.buy.headDescription} />
      </Head>

      <div className="w-full flex justify-start items-stretch">
        <BackLink href="/dashboard/buy-and-sell" />
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

Buy.getLayout = function getLayout(page: ReactElement) {
  return <BuyStableCoinProvider>{page}</BuyStableCoinProvider>
}

export default Buy
