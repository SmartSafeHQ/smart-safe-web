import { ReactElement } from 'react'
import Head from 'next/head'

import { BankAccountSellForm } from '@components/pages/BuyAndSell/Sell/BankAccountSellForm'
import { BackLink } from '@components/pages/BuyAndSell/BackLink'
import { Heading } from '@components/Heading'

import { SellStableCoinContextProvider } from '@contexts/SellStableCoinContext'
import { useBankAccountSell } from '@hooks/buyAndSell/sell/useBankAccountSell'

const BankAccountSell = () => {
  const { t } = useBankAccountSell()

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-4 pt-8 gap-8 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.sell.headTitle}</title>
        <meta name="description" content={t.buyAndSell.sell.headDescription} />
      </Head>

      <div className="w-full flex justify-start items-stretch">
        <BackLink href="/dashboard/buy-and-sell/sell" />
      </div>

      <div className="w-full max-w-lg flex flex-1 flex-col gap-10">
        <Heading className="text-3xl">
          {t.sell.headings.bankAccountData}
        </Heading>

        <BankAccountSellForm />
      </div>
    </div>
  )
}

BankAccountSell.getLayout = function getLayout(page: ReactElement) {
  return <SellStableCoinContextProvider>{page}</SellStableCoinContextProvider>
}

export default BankAccountSell
