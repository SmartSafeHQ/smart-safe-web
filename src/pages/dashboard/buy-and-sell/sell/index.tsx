import Head from 'next/head'
import { useState } from 'react'

import { Withdraw } from '@components/pages/BuyAndSell/Sell/subpages/Withdraw'
import { BankAccountData } from '@components/pages/BuyAndSell/Sell/subpages/BankAccountData'
import { StableCoinAmount } from '@components/pages/BuyAndSell/Sell/subpages/StableCoinAmount'
import { BankAccountDataConfirmation } from '@components/pages/BuyAndSell/Sell/subpages/BankAccountDataConfirmation'
import { BackLink } from '@components/pages/BuyAndSell/Buy/BackLink'

import { useI18n } from '@hooks/useI18n'
import { SellStableCoinContextProvider } from '@/contexts/SellStableCoinContext'

export type Screens =
  | 'stable-coin-amount'
  | 'bank-account-data'
  | 'bank-account-data-confirmation'
  | 'withdraw'

const Sell = () => {
  const [currentScreen, setCurrentScreen] =
    useState<Screens>('stable-coin-amount')

  const { t } = useI18n()

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
        <SellStableCoinContextProvider>
          <div className="w-full max-w-lg flex flex-1 flex-col items-stretch">
            {currentScreen === 'stable-coin-amount' ? (
              <StableCoinAmount />
            ) : currentScreen === 'bank-account-data' ? (
              <BankAccountData setCurrentScreen={setCurrentScreen} />
            ) : currentScreen === 'bank-account-data-confirmation' ? (
              <BankAccountDataConfirmation
                setCurrentScreen={setCurrentScreen}
              />
            ) : (
              <Withdraw setCurrentScreen={setCurrentScreen} />
            )}
          </div>
        </SellStableCoinContextProvider>
      </div>
    </div>
  )
}

export default Sell
