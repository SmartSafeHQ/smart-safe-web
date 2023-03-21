import Head from 'next/head'

import { Verify2FAModal } from '@components/pages/Layouts/Verify2FAModal'
import { SendScreen } from '@components/pages/Send'

import { useI18n } from '@hooks/useI18n'
import { SendProvider } from '@contexts/SendContext'

const Send = () => {
  const { t } = useI18n()

  return (
    <div className="w-full flex flex-col items-center justify-center px-2 pt-12">
      <Head>
        <title>{t.send.headTitle}</title>
        <meta name="description" content={t.send.headDescription} />
      </Head>

      <SendProvider>
        <SendScreen />
      </SendProvider>

      <Verify2FAModal />
    </div>
  )
}

export default Send
