import Head from 'next/head'
import { PaperPlaneTilt, ShoppingCartSimple } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { ActionCard } from '@components/pages/BuyAndSell/ActionCard'

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
            className="text-3xl font-semibold text-gray-800 dark:text-gray-50 md:text-4xl"
            asChild
          >
            <h1>{t.buyAndSell.selectAct.title}</h1>
          </Heading>
        </div>

        <section className="w-full flex flex-wrap items-start1 justify-center gap-6">
          <ActionCard
            id="buy"
            href="/buy-and-sell/buy"
            ctaTitle={t.buyAndSell.selectAct.buyButton}
            title={t.buyAndSell.selectAct.buyTitle}
            Icon={ShoppingCartSimple}
          >
            <li>{t.buyAndSell.selectAct.buyDesc01}</li>
            <li>{t.buyAndSell.selectAct.buyDesc02}</li>
            <li>{t.buyAndSell.selectAct.buyDesc03}</li>
          </ActionCard>

          <ActionCard
            id="sell"
            href="/buy-and-sell/sell"
            ctaTitle={t.buyAndSell.selectAct.sellButton}
            title={t.buyAndSell.selectAct.sellTitle}
            Icon={PaperPlaneTilt}
          >
            <li>{t.buyAndSell.selectAct.sellDesc01}</li>
            <li>{t.buyAndSell.selectAct.sellDesc02}</li>
            <li>{t.buyAndSell.selectAct.sellDesc03}</li>
          </ActionCard>
        </section>
      </div>
    </div>
  )
}

export default BuyAndSell
