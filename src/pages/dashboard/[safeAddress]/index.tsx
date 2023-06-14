import Image from 'next/image'
import Head from 'next/head'

import { MainSafeInfos } from '@components/pages/Home/MainSafeInfos'
import { TransactionQueue } from '@components/pages/Home/TransactionQueue'
import { Text } from '@components/Text'

import securifyLogo from '../../../../public/securify-logo.png'
import slitherLogo from '../../../../public/slither-logo.png'

const Home = () => {
  return (
    <div className="flex flex-1 flex-col items-stretch justify-start">
      <Head>
        <title>SmartSafe | Safe Home</title>
        <meta name="description" content="SmartSafe decentralized home page" />
      </Head>

      <div className="w-full flex flex-wrap items-stretch justify-start gap-4 p-2">
        <MainSafeInfos />

        <TransactionQueue />
      </div>

      <div className="flex flex-col items-stretch justify-start gap-2 p-2 mt-auto">
        <div className="flex flex-wrap items-end justify-start gap-4 opacity-50">
          <div className="bg-black">
            <Image
              src={securifyLogo}
              alt="Securify logo"
              className="w-28 h-5"
            />
          </div>

          <div className="relative">
            <span className="absolute bottom-0 bg-zinc-950 w-full h-4 -z-10" />
            <Image src={slitherLogo} alt="Slither logo" className="w-20 h-11" />
          </div>
        </div>

        <Text className="text-sm text-zinc-500">Security tested with</Text>
      </div>
    </div>
  )
}

export default Home
