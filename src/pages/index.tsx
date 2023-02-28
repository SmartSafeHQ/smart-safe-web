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
import { PartnersCarrousel } from '@components/pages/Landing/PartnersCarrousel'
import { AwsLogo } from '@components/Logos/AwsLogo'
import { MoonPayLogo } from '@components/Logos/MoonPayLogo'
import { R3Logo } from '@components/Logos/R3Logo'
import { TransakLogo } from '@components/Logos/TransakLogo'
import { WalletConnectLogo } from '@components/Logos/WalletConnectLogo'
import { WalletConnectBlueLogo } from '@components/Logos/WalletConnectBlueLogo'

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

const LANDING_CARROUSEL_PARTNERS = [
  {
    id: 'aws',
    Image: AwsLogo
  },
  {
    id: 'r3',
    Image: R3Logo
  },
  {
    id: 'transak',
    Image: TransakLogo
  },
  {
    id: 'moonPay',
    Image: MoonPayLogo
  },
  {
    id: 'walletConnect',
    Image: WalletConnectLogo
  }
]

const LANDING_NETWORKS = [
  { chainId: 5, network: 'ethereum', avatar: '/networks/eth-logo.svg' },
  { chainId: 97, network: 'binance', avatar: '/networks/bnb-logo.svg' },
  { chainId: 80001, network: 'polygon', avatar: '/networks/polygon-logo.svg' },
  { chainId: 44787, network: 'celo', avatar: '/networks/celo-logo.svg' },
  {
    chainId: 43113,
    network: 'avalanche',
    avatar: '/networks/avalanche-logo.svg'
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
              Discover the future of finance with InWallet. Securely explore and
              transact on any chain in a single click.
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

      <section className="w-full min-h-screen flex flex-col-reverse items-center justify-center px-4 pt-12 gap-12 lg:flex-row lg:gap-20 lg:pt-0 ">
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

      <section className="w-full relative min-h-[78vh] flex flex-col items-center px-4 pt-4 overflow-hidden mb-3 bg-gray-100 md:min-h-[90vh]">
        <div className="w-full max-w-[22rem] flex flex-col justify-center items-center gap-2 md:max-w-2xl">
          <InWalletTextLogo className="h-10 md:h-14" />

          <Heading
            asChild
            className="text-xl text-center text-gray-800 font-normal lg:text-3xl"
          >
            <h2>Web3 payment and key management challenges, solved.</h2>
          </Heading>

          <Text
            asChild
            className="flex items-center gap-2 text-xl capitalize font-medium transition-colors text-sky-600 hover:text-sky-500"
          >
            <Link href="/accounts/login">
              <Text>Learn more</Text>

              <CaretRight className="w-6 h-6" weight="bold" />
            </Link>
          </Text>
        </div>

        <div className="w-full absolute top-36 overflow-visible flex-grow flex justify-center items-center gap-3 md:gap-6 right-20 md:left-0 lg:top-48">
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

      <section className="w-full min-h-screen flex flex-col items-start gap-3 px-0 overflow-hidden lg:px-4 lg:flex-row">
        <article className="w-full min-h-[37.5rem] py-10 relative flex flex-col items-center justify-center bg-black rounded-sm">
          <div className="w-full max-w-md flex flex-col items-center justify-center gap-2">
            <div className="w-full flex flex-col items-center gap-2 md:gap-4">
              <Heading
                asChild
                className="text-4xl leading-tight font-semibold text-center md:text-[2.5rem]"
              >
                <h2>Exclusive in wallet partners</h2>
              </Heading>

              <Heading
                asChild
                className="text-2xl text-center text-gray-200 font-normal"
              >
                <h3>Secure money with our global and respected partners</h3>
              </Heading>

              <Text
                asChild
                className="flex items-center gap-2 mt-2 text-xl capitalize font-medium transition-colors text-sky-600 hover:text-sky-500 md:mt-1"
              >
                <Link href="/accounts/login">
                  <Text>Learn more</Text>

                  <CaretRight className="w-6 h-6" weight="bold" />
                </Link>
              </Text>
            </div>

            <div className="w-full overflow-visible flex-grow flex justify-center items-center">
              <PartnersCarrousel partners={LANDING_CARROUSEL_PARTNERS} />
            </div>
          </div>
        </article>

        <article className="w-full min-h-[43.75rem] py-10 px-5 relative flex flex-col items-center justify-start bg-black rounded-sm md:px-0">
          <div className="w-full max-w-md flex flex-col items-center justify-center gap-8">
            <div className="w-full flex flex-col items-center gap-2 md:gap-4">
              <Heading
                asChild
                className="text-4xl leading-tight font-semibold text-center md:text-[2.5rem]"
              >
                <h2>Explore the ultimate next generation wallet</h2>
              </Heading>

              <div className="flex items-center flex-col gap-3 md:flex-row">
                <Heading
                  asChild
                  className="text-xl text-center text-gray-200 font-normal"
                >
                  <h3>Available in all dApps with wallet connect</h3>
                </Heading>

                <WalletConnectBlueLogo className="w-6 h-6" />
              </div>

              <Text
                asChild
                className="flex items-center gap-2 mt-2 text-xl capitalize font-medium transition-colors text-sky-600 hover:text-sky-500 md:mt-1"
              >
                <Link href="/accounts/login">
                  <Text>Learn more</Text>

                  <CaretRight className="w-6 h-6" weight="bold" />
                </Link>
              </Text>
            </div>

            <Text asChild className="mb-2 text-sm font-normal text-gray-200">
              <strong>Currently on:</strong>
            </Text>

            <div className="w-full grid grid-cols-3 gap-x-10 gap-y-7 justify-center items-center md:gap-x-20 md:gap-y-14">
              {LANDING_NETWORKS.map(coin => (
                <div
                  key={coin.chainId}
                  className="flex flex-col items-center gap-3"
                >
                  <img
                    src={coin.avatar}
                    alt={`${coin.network} coin icon`}
                    className="w-12 bg-cover md:w-16"
                  />

                  <Text className="text-xs font-medium text-gray-50 uppercase text-center md:text-sm">
                    {coin.network}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}

export default Landing
