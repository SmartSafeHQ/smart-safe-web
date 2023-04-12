import { ReactElement } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { CheckCircle } from 'phosphor-react'

import { Heading } from '@components/Heading'

import {
  SellStableCoinContextProvider,
  useSellStableCoin
} from '@contexts/SellStableCoinContext'
import { useI18n } from '@hooks/useI18n'

const SellWithdraw = () => {
  const { t } = useI18n()
  const { withdrawAmount } = useSellStableCoin()

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-4 pt-8 gap-8 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.sell.headTitle}</title>
        <meta name="description" content={t.buyAndSell.sell.headDescription} />
      </Head>

      <section className="w-full max-w-lg flex flex-1 flex-col gap-10">
        <Heading className="text-center text-2xl">
          {t.sell.withdrawalSuccessHeading}
        </Heading>

        <div className="w-full max-w-lg flex flex-1 flex-col gap-2 items-stretch">
          <div className="flex items-center justify-center">
            <CheckCircle size={92} weight="fill" className="fill-green-500" />
          </div>

          <div className="flex flex-col items-center justify-center">
            <p>{t.sell.withdrawalAmount}</p>

            <span className="font-bold">
              {Intl.NumberFormat('pt-BR', {
                currency: 'BRL',
                style: 'currency'
              }).format(withdrawAmount)}
            </span>
          </div>

          <Link
            href="/dashboard/buy-and-sell"
            className="font-medium transition-colors underline text-brand-foregroundAccent1 hover:text-brand-foregroundAccent2"
          >
            {t.sell.closeButton}
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
