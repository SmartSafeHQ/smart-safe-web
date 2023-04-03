import Head from 'next/head'
import { useState } from 'react'

import { useI18n } from '@hooks/useI18n'
import { SellContextProvider } from '@contexts/pages/SellContext'

import { Withdraw } from '@/components/pages/BuyAndSell/Sell/subpages/Withdraw'
import { BankAccountData } from '@/components/pages/BuyAndSell/Sell/subpages/BankAccountData'
import { StableCoinAmount } from '@/components/pages/BuyAndSell/Sell/subpages/StableCoinAmount'
import { BankAccountDataConfirmation } from '@/components/pages/BuyAndSell/Sell/subpages/BankAccountDataConfirmation'

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
    <div className="flex flex-1 flex-col items-center px-4 pt-6 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.sell.headTitle}</title>
        <meta name="description" content={t.buyAndSell.sell.headDescription} />
      </Head>

      <SellContextProvider>
        <div className="w-full max-w-[500px] flex flex-1 flex-col items-stretch gap-6 pt-10">
          {currentScreen === 'stable-coin-amount' ? (
            <StableCoinAmount setCurrentScreen={setCurrentScreen} />
          ) : currentScreen === 'bank-account-data' ? (
            <BankAccountData setCurrentScreen={setCurrentScreen} />
          ) : currentScreen === 'bank-account-data-confirmation' ? (
            <BankAccountDataConfirmation setCurrentScreen={setCurrentScreen} />
          ) : (
            <Withdraw setCurrentScreen={setCurrentScreen} />
          )}
        </div>
      </SellContextProvider>
    </div>
  )
}

export default Sell
