import Head from 'next/head'

import { useI18n } from '@hooks/useI18n'

const Buy = () => {
  const { t } = useI18n()

  return (
    <div className="flex flex-1 flex-col items-center px-4 pt-6 bg-gray-50 dark:bg-gray-900 md:px-8">
      <Head>
        <title>{t.buyAndSell.buy.headTitle}</title>
        <meta name="description" content={t.buyAndSell.buy.headDescription} />
      </Head>

      <div className="w-full max-w-5xl flex flex-1 flex-col items-stretch gap-12 pt-10">
        Coming soon
      </div>
    </div>
  )
}

export default Buy
