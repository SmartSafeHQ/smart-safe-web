import { CaretRight, TwitterLogo } from 'phosphor-react'
import Link from 'next/link'
import Head from 'next/head'

import { Heading } from '@components/Heading'
import { DownloadPlayStore } from '@components/pages/Layouts/DownloadCards/DownloadPlayStore'
import { DownloadAppleStore } from '@components/pages/Layouts/DownloadCards/DownloadAppleStore'
import { Text } from '@components/Text'
import { Header } from '@components/pages/Landing/Header'
import { InfosCarrousel } from '@components/pages/Landing/InfosCarrousel'
import { InWalletTextLogo } from '@components/Logos/InWalletTextLogo'
import { WalletConnectBlueLogo } from '@components/Logos/WalletConnectBlueLogo'
import { InWalletIconLogo } from '@components/Logos/InWalletIconLogo'

import { useI18n } from '@hooks/useI18n'
import { TOKENVERSE_TWITTER_LINK } from '@utils/global/constants/links'

const LANDING_NETWORKS = [
  { chainId: 5, network: 'ethereum', avatar: '/networks/eth-logo.svg' },
  { chainId: 97, network: 'binance', avatar: '/networks/bnb-logo.svg' },
  { chainId: 80001, network: 'polygon', avatar: '/networks/polygon-logo.svg' },
  { chainId: 44787, network: 'celo', avatar: '/networks/celo-logo.svg' },
  {
    chainId: 73113,
    network: 'solana',
    avatar: '/networks/solana-logo.svg'
  },
  {
    chainId: 43113,
    network: 'avalanche',
    avatar: '/networks/avalanche-logo.svg'
  },
  {
    chainId: 43111,
    network: 'injective',
    avatar: '/networks/injective-logo.svg'
  },
  {
    chainId: 43313,
    network: 'cosmos',
    avatar: '/networks/cosmos-logo.svg'
  }
]

const Landing = () => {
  const { t } = useI18n()

  return (
    <div className="w-full flex flex-1 flex-col justify-center items-center bg-white">
      <Head>
        <title>{t.landing.headTitle}</title>
        <meta name="description" content={t.landing.headDescription} />
      </Head>

      <Header />

      <section className="w-full flex flex-col items-center justify-center pt-28 px-4 gap-6 bg-white lg:flex-row lg:gap-16">
        <main className="w-full max-w-[48rem] flex flex-col items-start gap-6 lg:max-w-[44rem]">
          <Heading
            asChild
            className="text-5xl leading-tight text-black lg:text-8xl"
          >
            <h1>{t.landing.heroTitle}</h1>
          </Heading>

          <Text
            asChild
            className="w-full text-xl font-medium text-gray-900 leading-relaxed lg:text-2xl lg:max-w-2xl"
          >
            <p>{t.landing.heroDescription}</p>
          </Text>

          <div className="w-full  flex flex-col items-start gap-8">
            <Text
              asChild
              className="w-full flex items-center justify-center rounded-md uppercase focus:ring-2 ring-gray-900 px-10 py-4 text-xl font-semibold bg-red-500 transition-colors text-white hover:bg-red-400"
            >
              <Link href="/accounts/login">
                <Text>{t.landing.signIn}</Text>
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
            alt={t.landing.heroImageAlt}
            className="w-full bg-contain"
          />
        </div>
      </section>

      <section className="w-full min-h-screen flex flex-col-reverse items-center justify-center px-4 pt-12 gap-12 lg:flex-row lg:gap-20 lg:pt-0 bg-gray-100">
        <div className="w-full max-w-[32rem]">
          <img
            src="/landing/web-mockup.png"
            alt={t.landing.webMockupImageAlt}
            className="w-full bg-contain"
          />
        </div>

        <div className="w-full max-w-[50rem] mt-[-6rem] flex flex-col items-start gap-1 lg:max-w-[36rem]">
          <InfosCarrousel infos={t.landing.carrouselInfos} />
        </div>
      </section>

      <section className="w-full relative min-h-[78vh] flex flex-col items-center px-4 pt-4 overflow-hidden mb-3 bg-white md:min-h-[90vh]">
        <div className="w-full max-w-[22rem] flex flex-col justify-center items-center gap-2 md:max-w-xl">
          <InWalletTextLogo className="h-10 md:h-14" />

          <Heading
            asChild
            className="text-xl text-center text-gray-800 font-normal lg:text-3xl"
          >
            <h2>{t.landing.cardMockupTitle}</h2>
          </Heading>

          <Text
            asChild
            className="flex items-center gap-2 text-xl capitalize font-medium transition-colors text-sky-600 hover:text-sky-500"
          >
            <Link href="/accounts/login">
              <Text>{t.landing.getStarted}</Text>

              <CaretRight className="w-6 h-6" weight="bold" />
            </Link>
          </Text>
        </div>

        <div className="w-full absolute top-36 overflow-visible flex-grow flex justify-center items-center gap-3 md:gap-6 right-20 md:left-0 lg:top-48">
          <img
            src="/landing/card-mockup.png"
            alt={t.landing.cardMockupImageAlt}
            className="w-[30rem] h-[25rem] bg-fixed sm:h-0 md:w-[33.25rem] sm:h-[28rem] "
          />

          <img
            src="/landing/hold-iphone-mockup.png"
            alt={t.landing.cellPhoneMockupImageAlt}
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
              <h2>{t.landing.networksSupportTitle}</h2>
            </Heading>

            <div className="flex items-center flex-col gap-3 md:flex-row">
              <Heading
                asChild
                className="text-lg text-center text-gray-200 font-normal"
              >
                <h3>{t.landing.wCSupportSubTitle}</h3>
              </Heading>

              <WalletConnectBlueLogo className="w-6 h-6" />
            </div>

            <Text
              asChild
              className="flex items-center gap-2 text-xl capitalize font-medium transition-colors text-sky-600 hover:text-sky-500"
            >
              <Link href="/accounts/login">
                <Text>{t.landing.getStarted}</Text>

                <CaretRight className="w-6 h-6" weight="bold" />
              </Link>
            </Text>
          </div>

          <Text asChild className="mb-2 text-sm font-normal text-gray-200">
            <strong>{t.landing.currentlyOn}</strong>
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

      <section className="w-full py-10 relative flex flex-col items-center justify-center gap-10 mt-3 rounded-sm">
        <Heading
          asChild
          className="text-4xl leading-tight font-semibold text-center text-gray-900 md:text-5xl"
        >
          <h2>{t.landing.partners}</h2>
        </Heading>

        <div className="w-full max-w-2xl grid grid-cols-3 gap-x-10 gap-y-7 justify-center items-center md:gap-x-20 md:gap-y-14">
          {t.landing.carrouselPartners.map(partner => (
            <div key={partner.id} className="flex flex-col items-center gap-3">
              <partner.Image className="w-20 h-20 bg-cover md:w-28 md:h-28" />
            </div>
          ))}
        </div>
      </section>

      <section className="w-full flex items-start justify-center px-6 py-16 mt-3 bg-gray-100">
        <div className="w-full max-w-6xl flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-start gap-4">
            <Heading asChild className="max-w-sm text-5xl text-gray-900">
              <h1>
                {t.landing.footerCtaTitle01} <br />
                {t.landing.footerCtaTitle02}
              </h1>
            </Heading>

            <Text asChild className="font-medium text-gray-600">
              <strong>
                {t.landing.footerCtaSubTitle01} <br />
                {t.landing.footerCtaSubTitle02}
              </strong>
            </Text>
          </div>

          <div className="flex flex-col items-center justify-center gap-8">
            <Text className="font-medium text-gray-600 text-center">
              {t.landing.footerSubGetStarted}
            </Text>

            <div className="w-full flex item-center  gap-5 md:gap-10">
              <div className="flex flex-col items-center justify-between gap-2 pr-5 border-r-2 border-gray-500 md:pr-10 md:gap-4">
                <DownloadPlayStore className="p-2" />
                <DownloadAppleStore className="p-2" />
              </div>

              <div className="flex flex-col items-center  gap-4">
                <InWalletIconLogo className="w-24" />

                <Text
                  asChild
                  className="w-full rounded-md focus:ring-2 ring-gray-900 px-7 py-2 font-semibold bg-gray-800 transition-colors text-white hover:bg-gray-700"
                >
                  <Link href="/accounts/login">
                    <Text>{t.landing.signIn}</Text>
                  </Link>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full flex justify-center px-6 py-4 bg-white">
        <div className="w-full max-w-7xl flex items-center justify-between gap-8">
          <InWalletTextLogo className="w-36 h-8 hidden sm:block" />

          <InWalletIconLogo className="w-7 h-8 block sm:hidden" />

          <Text className="text-center text-gray-700 font-medium">
            InWallet Labs © {new Date().getFullYear()}
          </Text>

          <a href={TOKENVERSE_TWITTER_LINK} target="_blank" rel="noreferrer">
            <TwitterLogo
              className="w-6 h-6 text-gray-900 transition-colors hover:text-blue-400"
              weight="fill"
            />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Landing
