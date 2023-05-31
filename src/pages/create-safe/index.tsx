import Head from 'next/head'
import { ReactElement } from 'react'

import { CreateSafeHeader } from '@components/pages/CreateSafe/CreateSafeHeader'
import { DeploySafeContent } from '@components/pages/CreateSafe/DeploySafeContent'

import { CreateSafeProvider } from '@contexts/create-safe/CreateSafeContext'

const DeploySafe = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <Head>
        <title>SmartSafe | Deploy safe</title>
        <meta
          name="description"
          content="SmartSafe decentralized safe creation deploy"
        />
      </Head>

      <CreateSafeHeader />

      <DeploySafeContent />
    </div>
  )
}

DeploySafe.getLayout = function getLayout(page: ReactElement) {
  return <CreateSafeProvider>{page}</CreateSafeProvider>
}

export default DeploySafe
