import Head from 'next/head'

import { Card } from '@components/pages/Cashback/Card'
import { Balance } from '@components/pages/Cashback/Balance'

import { useI18n } from '@hooks/useI18n'
import { useTheme } from '@contexts/ThemeContext'

const Cashback = () => {
  const { t } = useI18n()
  const { theme } = useTheme()

  return (
    <div className="flex flex-col px-2 pt-8">
      <Head>
        <title>{t.cashback.headTitle}</title>
        <meta name="description" content={t.cashback.headDescription} />
      </Head>

      <div className="flex flex-col gap-5">
        <div className="flex gap-2 flex-col">
          <Balance />

          <div className="border-t border-gray-800"></div>
        </div>

        <h1>{t.cashback.cashbackDescription}</h1>

        <div className="flex items-center gap-5 max-w-screen-md flex-wrap">
          <Card companyImageUrl="/cashback/c&a.png" companyName="C&A" />
          <Card companyImageUrl="/cashback/ifood.png" companyName="iFood" />
          <Card
            companyImageUrl={`${
              theme === 'dark'
                ? '/cashback/dark-amazon.png'
                : '/cashback/amazon.png'
            }`}
            companyName="Amazon"
          />
        </div>
      </div>
    </div>
  )
}

export default Cashback
