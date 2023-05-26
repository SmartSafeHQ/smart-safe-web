import Head from 'next/head'

import { MainSafeInfos } from '@components/pages/Home/MainSafeInfos'
import { TransactionQueue } from '@components/pages/Home/TransactionQueue'

const Home = () => {
  return (
    <div className="flex flex-col items-stretch justify-start">
      <Head>
        <title>SmartSafe | Safe Home</title>
        <meta name="description" content="SmartSafe decentralized home page" />
      </Head>

      <div className="w-full flex flex-wrap items-stretch justify-start gap-4 p-2">
        <MainSafeInfos />

        <TransactionQueue />
      </div>
    </div>
  )
}

export default Home
