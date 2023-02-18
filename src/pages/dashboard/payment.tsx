import Head from 'next/head'

import { QrCodeScanner } from '@components/pages/Payment/QrCodeScanner'

import { useI18n } from '@hooks/useI18n'

const Payment = () => {
  const { t } = useI18n()

  return (
    <div className="flex flex-col px-2 pt-8">
      <Head>
        <title>{t.payment.headTitle}</title>
        <meta name="description" content={t.payment.headDescription} />
      </Head>

      <div className="flex gap-5 flex-col">
        <h1>{t.payment.pageHeadingTitle}</h1>

        <QrCodeScanner />
      </div>
    </div>
  )
}

export default Payment
