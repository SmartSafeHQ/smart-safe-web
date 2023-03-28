import Head from 'next/head'

import { useI18n } from '@hooks/useI18n'

const BuyAndSell = () => {
  const { t } = useI18n()

  return (
    <div className="w-full flex flex-col items-center justify-center px-2 pt-4">
      <Head>
        <title>{t.buyAndSell.headTitle}</title>
        <meta name="description" content={t.buyAndSell.headDescription} />
      </Head>

      <div className="w-full max-w-lg flex flex-1 flex-col">hello world!</div>
    </div>
  )
}

export default BuyAndSell
