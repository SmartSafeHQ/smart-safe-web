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
import { AwsLogo } from '@components/Logos/AwsLogo'
import { MoonPayLogo } from '@components/Logos/MoonPayLogo'
import { R3Logo } from '@components/Logos/R3Logo'
import { TransakLogo } from '@components/Logos/TransakLogo'
import { WalletConnectLogo } from '@components/Logos/WalletConnectLogo'
import { WalletConnectBlueLogo } from '@components/Logos/WalletConnectBlueLogo'

const LANDING_CARROUSEL_INFOS = [
  {
    id: 'access',
    title: 'Simplicity meets advanced security.',
    description:
      'Take control of your crypto, with our non-custodial, multi-chain wallet.'
  },
  {
    id: 'access-2',
    title: 'Unleash your crypto potential.',
    description:
      'Maximize your crypto gains, with our seamless multi-chain wallet and financial services.'
  },
  {
    id: 'access-3',
    title: 'Your all-in-one crypto solution.',
    description:
      'Experience the future of finance, with our revolutionary wallet technology.'
  }
]

const LANDING_CARROUSEL_PARTNERS = [
  {
    id: 'aws',
    name: 'aws',
    Image: AwsLogo
  },
  {
    id: 'r3',
    name: 'r3',
    Image: R3Logo
  },
  {
    id: 'transak',
    name: 'transak',
    Image: TransakLogo
  },
  {
    id: 'moonPay',
    name: 'moonPay',
    Image: MoonPayLogo
  },
  {
    id: 'walletConnect',
    name: 'wallet connect',
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
    network: 'solana',
    avatar: '/networks/solana-logo.svg'
  },
  {
    chainId: 43113,
    network: 'avalanche',
    avatar: '/networks/avalanche-logo.svg'
  },
  {
    chainId: 43113,
    network: 'injective',
    avatar: '/networks/injective-logo.svg'
  },
  {
    chainId: 43113,
    network: 'cosmos',
    avatar: '/networks/cosmos-logo.svg'
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

      <section className="w-full flex flex-col items-center justify-center pt-28 px-4 gap-6 bg-white lg:flex-row lg:gap-16">
        <main className="w-full max-w-[46rem] flex flex-col items-start gap-6 lg:max-w-[44rem]">
          <Heading
            asChild
            className="text-5xl leading-tight text-black lg:text-8xl"
          >
            <h1>Where crypto meets finance.</h1>
          </Heading>

          <Text
            asChild
            className="w-full text-xl font-medium text-gray-900 leading-relaxed lg:text-2xl lg:max-w-2xl"
          >
            <p>
              Say goodbye to the hassle of managing multiple wallets and hello
              to the ultimate crypto experience.
            </p>
          </Text>

          <div className="w-full  flex flex-col items-start gap-8">
            <Text
              asChild
              className="w-full flex items-center justify-center rounded-md uppercase focus:ring-2 ring-gray-900 px-10 py-4 text-xl font-semibold bg-red-500 transition-colors text-white hover:bg-red-400"
            >
              <Link href="/accounts/login">
                <Text>Sign in</Text>
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

      <section className="w-full min-h-screen flex flex-col-reverse items-center justify-center px-4 pt-12 gap-12 lg:flex-row lg:gap-20 lg:pt-0 bg-gray-100">
        <div className="w-full max-w-[32rem]">
          <img
            src="/landing/web-mockup.png"
            alt="Dois celulares exibindo uma prévia da aplicação do NLW Copa"
            className="w-full bg-contain"
          />
        </div>

        <div className="w-full max-w-[50rem] mt-[-6rem] flex flex-col items-start gap-1 lg:max-w-[36rem]">
          <InfosCarrousel infos={LANDING_CARROUSEL_INFOS} />
        </div>
      </section>

      <section className="w-full relative min-h-[78vh] flex flex-col items-center px-4 pt-4 overflow-hidden mb-3 bg-white md:min-h-[90vh]">
        <div className="w-full max-w-[20rem] flex flex-col justify-center items-center gap-2 md:max-w-xl">
          <InWalletTextLogo className="h-10 md:h-14" />

          <Heading
            asChild
            className="text-xl text-center text-gray-800 font-normal lg:text-3xl"
          >
            <h2>Your one-stop shop for cross-chain crypto management.</h2>
          </Heading>

          <Text
            asChild
            className="flex items-center gap-2 text-xl capitalize font-medium transition-colors text-sky-600 hover:text-sky-500"
          >
            <Link href="/accounts/login">
              <Text>Get Started</Text>

              <CaretRight className="w-6 h-6" weight="bold" />
            </Link>
          </Text>
        </div>

        <div className="w-full absolute top-36 overflow-visible flex-grow flex justify-center items-center gap-3 md:gap-6 right-20 md:left-0 lg:top-48">
          <img
            src="/landing/card-mockup.png"
            alt="Card Mockup"
            className="w-[30rem] h-[25rem] bg-fixed sm:h-0 md:w-[33.25rem] sm:h-[28rem] "
          />

          <img
            src="/landing/hold-iphone-mockup.png"
            alt="Iphone Mockup"
            className="w-[14rem] bg-fixed md:w-[16rem]"
          />
        </div>
      </section>

      <section className="w-full py-10 px-5 relative flex flex-col items-center justify-start bg-black rounded-sm md:px-0">
        <div className="w-full max-w-xl flex flex-col items-center justify-center gap-8">
          <div className="w-full flex flex-col items-center gap-2 md:gap-4">
            <Heading
              asChild
              className="text-4xl leading-tight font-semibold text-center md:text-[2.5rem]"
            >
              <h2>
                Discover the power of multi-chain and elevate your crypto
                experience to new heights
              </h2>
            </Heading>

            <div className="flex items-center flex-col gap-3 md:flex-row">
              <Heading
                asChild
                className="text-lg text-center text-gray-200 font-normal"
              >
                <h3>Available on all dApps that support WalletConnect</h3>
              </Heading>

              <WalletConnectBlueLogo className="w-6 h-6" />
            </div>

            <Text
              asChild
              className="flex items-center gap-2 text-xl capitalize font-medium transition-colors text-sky-600 hover:text-sky-500"
            >
              <Link href="/accounts/login">
                <Text>Get Started</Text>

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
      </section>

      <section className="w-full py-10 relative flex flex-col items-center justify-center gap-10 mt-3 bg-gray-50 rounded-sm">
        <Heading
          asChild
          className="text-4xl leading-tight font-semibold text-center text-gray-900 md:text-5xl"
        >
          <h2>Partners</h2>
        </Heading>

        <div className="w-full max-w-2xl grid grid-cols-3 gap-x-10 gap-y-7 justify-center items-center md:gap-x-20 md:gap-y-14">
          {LANDING_CARROUSEL_PARTNERS.map(partner => (
            <div key={partner.id} className="flex flex-col items-center gap-3">
              <partner.Image className="w-20 h-20 bg-cover md:w-28 md:h-28" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Landing
