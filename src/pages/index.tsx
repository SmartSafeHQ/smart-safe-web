import Link from 'next/link'
import Head from 'next/head'

import { Heading } from '@components/Heading'
import { DownloadPlayStore } from '@components/pages/Layouts/DownloadCards/DownloadPlayStore'
import { DownloadAppleStore } from '@components/pages/Layouts/DownloadCards/DownloadAppleStore'
import { Text } from '@components/Text'
import { Header } from '@components/pages/Landing/Header'

const Landing = () => {
  return (
    <div className="w-full flex flex-1 flex-col justify-center items-center bg-white">
      <Head>
        <title>Tokenverse</title>
        <meta name="description" content="Tokenverse landing page" />
      </Head>

      <Header />

      <div className="w-full flex items-center justify-center pt-10 px-4 bg-no-repeat bg-cover">
        <div className="w-full max-w-7xl flex flex-col items-center gap-6 lg:flex-row lg:gap-16">
          <main className="w-full max-w-[46rem] flex flex-col items-start gap-6 lg:max-w-[43rem]">
            <Heading asChild>
              <h1 className="text-5xl leading-tight text-black lg:text-8xl">
                nobank is now InWallet
              </h1>
            </Heading>

            <p className="w-full text-xl font-medium text-gray-900 leading-relaxed lg:text-2xl lg:max-w-2xl">
              Discover the future of finance with InWallet. Securely explore and
              transact on any chain in a single click.
            </p>

            <div className="w-full  flex flex-col items-start gap-8">
              <Text
                asChild
                className="w-full flex items-center justify-center rounded-md focus:ring-2 ring-gray-900 px-10 py-4 text-xl font-semibold bg-cyan-500 transition-colors text-black hover:bg-cyan-400"
              >
                <Link href="#">
                  <Text>Sing in</Text>
                </Link>
              </Text>

              <div className="w-full flex items-center gap-2 md:gap-6 lg:gap-8">
                <DownloadPlayStore className="p-2 sm:p-3" />
                <DownloadAppleStore className="p-2 sm:p-3" />
              </div>
            </div>
          </main>

          <div className="w-full max-w-[32rem]">
            <img
              src="/app-in-wallet-preview.png"
              alt="Dois celulares exibindo uma prévia da aplicação do NLW Copa"
              className="w-full bg-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
