import Head from 'next/head'

import { Verify2FAModal } from '@components/pages/Layouts/Verify2FAModal'
import { SendScreen } from '@components/pages/Send'

import { useI18n } from '@hooks/useI18n'
import { useAuth } from '@contexts/AuthContext'
import { SendProvider } from '@contexts/SendContext'

const Send = () => {
  const { is2FAVerifyOpen, setIs2FAVerifyOpen } = useAuth()
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

      <Verify2FAModal isOpen={is2FAVerifyOpen} setIsOpen={setIs2FAVerifyOpen} />
    </div>
  )
}

export default Send
