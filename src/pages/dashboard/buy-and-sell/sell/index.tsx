import Head from 'next/head'
import { ReactElement } from 'react'

import { Heading } from '@components/Heading'
import { BackLink } from '@components/pages/BuyAndSell/BackLink'
import { SelectCoinSellForm } from '@components/pages/BuyAndSell/Sell/SelectCoinSellForm'

import { useSelectSellCoin } from '@hooks/buyAndSell/sell/useSelectSellCoin'
import { SellStableCoinContextProvider } from '@contexts/SellStableCoinContext'

const Sell = () => {
  const { t } = useSelectSellCoin()

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-4 pt-8 gap-8 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.sellStableCoin.headTitle}</title>
        <meta name="description" content={t.sellStableCoin.headDescription} />
      </Head>

      <div className="w-full flex justify-start items-stretch">
        <BackLink href="/dashboard/buy-and-sell" />
      </div>

      <div className="w-full max-w-lg flex flex-1 flex-col gap-10">
        <Heading asChild className="text-gray-800 dark:text-gray-50 text-4xl">
          <h1>{t.sellStableCoin.headings.sell}</h1>
        </Heading>

        <SelectCoinSellForm />
      </div>
    </div>
  )
}

Sell.getLayout = function getLayout(page: ReactElement) {
  return <SellStableCoinContextProvider>{page}</SellStableCoinContextProvider>
}

export default Sell
