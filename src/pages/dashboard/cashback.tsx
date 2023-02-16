import Head from 'next/head'

import { Card } from '../../components/pages/Cashback/Card'
import { Balance } from '../../components/pages/Cashback/Balance'

import { useI18n } from '@hooks/useI18n'

const Cashback = () => {
  const { t } = useI18n()

  return (
    <div className="flex flex-col px-2 pt-8">
      <Head>
        <title>{t.cashback.headTitle}</title>
        <meta name="description" content={t.cashback.headDescription} />
      </Head>

      <div className="flex flex-col gap-5">
        <div className="flex gap-5 flex-col">
          <Balance />

          <h1>{t.cashback.cashbackDescription}</h1>
        </div>

        <div className="flex items-center gap-5 justify-between max-w-screen-md">
          <Card companyImageUrl="/cashback/c&a.png" companyName="C&A" />
          <Card companyImageUrl="/cashback/ifood.png" companyName="iFood" />
          <Card companyImageUrl="/cashback/amazon.png" companyName="Amazon" />
        </div>
      </div>
    </div>
  )
}

export default Cashback
