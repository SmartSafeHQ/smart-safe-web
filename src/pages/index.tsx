import { CaretRight } from 'phosphor-react'
import Link from 'next/link'
import Head from 'next/head'

import { Heading } from '@components/Heading'
import { DownloadPlayStore } from '@components/pages/Layouts/DownloadCards/DownloadPlayStore'
import { DownloadAppleStore } from '@components/pages/Layouts/DownloadCards/DownloadAppleStore'
import { Text } from '@components/Text'
import { Header } from '@components/pages/Landing/Header'
import { InfosCarrousel } from '@components/pages/Landing/InfosCarrousel'
import { InWalletTextLogo } from '@components/Logos/InWalletTextLogo'

const LANDING_CARROUSEL_INFOS = [
  {
    id: 'access',
    title: 'Access for everyone',
    description:
      'Start investing in 1 minute. Easy experience and interoperability. Get your wallet now and transact assets with just 3 clicks.'
  },
  {
    id: 'access-2',
    title: 'Access for everyone 2 ',
    description:
      'Start investing in 1 minute. Easy experience and interoperability. Get your wallet now and transact assets with just 3 clicks.'
  },
  {
    id: 'access-3',
    title: 'Access for everyone 3 ',
    description:
      'Start investing in 1 minute. Easy experience and interoperability. Get your wallet now and transact assets with just 3 clicks.'
  }
]

const Landing = () => {
  return (
    <div className="w-full flex flex-1 flex-col justify-center items-center bg-white">
      <Head>
        <title>Tokenverse</title>
        <meta name="description" content="Tokenverse landing page" />
      </Head>

      <Header />

      <div className="w-full max-w-7xl">
        <section className="w-full flex flex-col items-center justify-center pt-28 px-4 gap-6 lg:flex-row lg:gap-16">
          <main className="w-full max-w-[46rem] flex flex-col items-start gap-6 lg:max-w-[43rem]">
            <Heading
              asChild
              className="text-5xl leading-tight text-black lg:text-8xl"
            >
              <h1>nobank is now InWallet</h1>
            </Heading>

            <Text
              asChild
              className="w-full text-xl font-medium text-gray-900 leading-relaxed lg:text-2xl lg:max-w-2xl"
            >
              <p>
                Discover the future of finance with InWallet. Securely explore
                and transact on any chain in a single click.
              </p>
            </Text>

            <div className="w-full  flex flex-col items-start gap-8">
              <Text
                asChild
                className="w-full flex items-center justify-center rounded-md focus:ring-2 ring-gray-900 px-10 py-4 text-xl font-semibold bg-cyan-500 transition-colors text-black hover:bg-cyan-400"
              >
                <Link href="/accounts/login">
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
              src="/landing/app-in-wallet-preview.png"
              alt="Dois celulares exibindo uma prévia da aplicação do NLW Copa"
              className="w-full bg-contain"
            />
          </div>
        </section>

        <section className="w-full min-h-screen flex flex-col-reverse items-center justify-center px-4 pt-12 gap-12 lg:flex-row lg:gap-20 lg:pt-0">
          <div className="w-full max-w-[32rem]">
            <img
              src="/landing/web-mockup.png"
              alt="Dois celulares exibindo uma prévia da aplicação do NLW Copa"
              className="w-full bg-contain"
            />
          </div>

          <div className="w-full max-w-[43rem] mt-[-6rem] flex flex-col items-start gap-1 lg:max-w-[36rem]">
            <InfosCarrousel infos={LANDING_CARROUSEL_INFOS} />
          </div>
        </section>

        <section className="w-full relative min-h-screen flex flex-col items-center px-4 overflow-hidden">
          <div className="w-full max-w-[22rem] flex flex-col justify-center items-center gap-2 md:max-w-2xl">
            <InWalletTextLogo className="h-10 md:h-14" />

            <Heading className="text-xl text-center text-gray-800 font-normal lg:text-3xl">
              <h2>Web3 payment and key management challenges, solved.</h2>
            </Heading>

            <Text
              asChild
              className="flex items-center gap-2 text-xl capitalize font-medium transition-colors text-sky-600 hover:text-sky-500"
            >
              <Link href="#">
                <Text>Learn more</Text>

                <CaretRight className="w-6 h-6" weight="bold" />
              </Link>
            </Text>
          </div>

          <div className="w-full absolute top-36 overflow-visible flex-grow flex justify-center items-center gap-3 md:gap-6 right-20 md:left-0 lg:top-44">
            <img
              src="/landing/card-mockup.png"
              alt="Dois celulares exibindo uma prévia da aplicação do NLW Copa"
              className="w-[30rem] h-[25rem] bg-fixed sm:h-0 md:w-[33.25rem] sm:h-[28rem] "
            />

            <img
              src="/landing/hold-iphone-mockup.png"
              alt="Dois celulares exibindo uma prévia da aplicação do NLW Copa"
              className="w-[14rem] bg-fixed md:w-[16rem]"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Landing
