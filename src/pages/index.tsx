import Head from 'next/head'
import { type ReactElement } from 'react'

import { CreateSafeHeader } from '@components/pages/CreateSafe/CreateSafeHeader'
import { CreateSafeWelcomeContent } from '@components/pages/CreateSafe/CreateSafeWelcomeContent'

import { CreateSafeProvider } from '@contexts/CreateSafeContext'

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

      <CreateSafeHeader />

      <CreateSafeWelcomeContent />
    </div>
  )
}

CreateSafeWelcome.getLayout = function getLayout(page: ReactElement) {
  return <CreateSafeProvider>{page}</CreateSafeProvider>
}

export default CreateSafeWelcome
