import Head from 'next/head'
import { ReactElement } from 'react'

import { CreateSafeWelcomeHeader } from '@components/pages/CreateSafe/CreateSafeWelcomeHeader'
import { CreateSafeWelcomeContent } from '@components/pages/CreateSafe/CreateSafeWelcomeContent'

import { CreateSafeProvider } from '@contexts/create-safe/CreateSafeContext'

const CreateSafeWelcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe</title>
        <meta
          name="description"
          content="SmartSafe decentralized custody protocol and collective asset management platform on EVM"
        />
      </Head>

      <CreateSafeWelcomeHeader />

      <CreateSafeWelcomeContent />
    </div>
  )
}

CreateSafeWelcome.getLayout = function getLayout(page: ReactElement) {
  return <CreateSafeProvider>{page}</CreateSafeProvider>
}

export default CreateSafeWelcome
