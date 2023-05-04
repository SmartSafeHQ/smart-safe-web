import Head from 'next/head'

import { Heading } from '@components/Heading'
import { SmartSafeTextLogo } from '@components/Logos/SmartSafeTextLogo'
import { SmartSafeIconLogo } from '@components/Logos/SmartSafeIconLogo'
import { Button } from '@components/Button'

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>SmartSafe</title>
        <meta
          name="description"
          content="SmartSafe decentralized custody protocol and collective asset management platform on EVM"
        />
      </Head>

      <div className="w-full max-w-5xl flex flex-col flex-1 items-center p-8 md:flex-row sm:justify-between">
        <div className="w-full max-w-lg flex flex-col items-stretch justify-start gap-16">
          <SmartSafeTextLogo className="w-48 h-9" />

          <Heading asChild className="mb-6 text-4xl sm:text-6xl">
            <h1>
              Create a new <br /> safe now
            </h1>
          </Heading>
        </div>

        <main className="w-full h-full min-h-[26rem] max-w-lg flex flex-col items-center justify-start rounded-md bg-gray-800 shadow-sm sm:min-h-[29.5rem]">
          <div className="w-full flex flex-col items-center justify-center py-6">
            <div className="w-full flex items-stretch px-4 pb-4 border-b-2 border-gray-500 border-opacity-25 md:mb-10">
              <Heading className="text-start text-xl font-semibold md:text-2xl">
                Connect your wallet to continue
              </Heading>
            </div>

            <div className="w-full max-w-sm flex flex-col items-center gap-8 px-12 py-8 md:py-16">
              <SmartSafeIconLogo />

              <Button className="w-full uppercase font-bold">
                Connect now
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
