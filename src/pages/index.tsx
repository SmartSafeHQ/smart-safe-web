import { TwitterLogo } from 'phosphor-react'
import Image from 'next/image'
import Head from 'next/head'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { InWalletTextLogo } from '@components/Logos/InWalletTextLogo'
import { InWalletIconLogo } from '@components/Logos/InWalletIconLogo'

import { useI18n } from '@hooks/useI18n'
import { TOKENVERSE_TWITTER_LINK } from '@utils/global/constants/links'

const Landing = () => {
  const { t } = useI18n()

  return (
    <div className="w-full flex flex-1 flex-col justify-center items-center bg-white">
      <Head>
        <title>{t.landing.headTitle}</title>
        <meta name="description" content={t.landing.headDescription} />
      </Head>

      <section className="w-full min-h-screen flex flex-col-reverse items-center justify-center px-4 pt-12 gap-12 lg:flex-row lg:gap-20 lg:pt-0 bg-gray-100">
        <div className="w-full h-full min-h-[20rem] max-w-[32rem] relative">
          <Image
            src="/landing/web-mockup.png"
            alt={t.landing.webMockupImageAlt}
            width={512}
            height={320}
            quality={100}
          />
        </div>
      </section>

      <section className="w-full relative min-h-[88vh] flex flex-col items-center px-4 pt-4 overflow-hidden mb-3 bg-white md:min-h-[90vh]">
        <div className="w-full max-w-[22rem] flex flex-col justify-center items-center gap-2 md:max-w-xl">
          <InWalletTextLogo className="h-10 md:h-14" />

          <Heading
            asChild
            className="text-xl text-center text-gray-800 font-normal lg:text-3xl"
          >
            <h2>{t.landing.cardMockupTitle}</h2>
          </Heading>
        </div>

        <div className="w-full absolute top-40 overflow-visible flex-grow flex justify-center items-center md:gap-6 right-16 md:left-0 md:top-48">
          <Image
            src="/landing/card-mockup.png"
            alt={t.landing.cardMockupImageAlt}
            width={532}
            height={448}
            quality={100}
            className="min-h-[28rem] sm:min-h-[29rem]"
          />

          <Image
            src="/landing/hold-iphone-mockup.png"
            alt={t.landing.cellPhoneMockupImageAlt}
            width={256}
            height={460}
            quality={100}
            className="min-h-[22rem] sm:min-h-[27rem] md:min-h-[29rem]"
          />
        </div>
      </section>

      <section className="w-full py-10 relative flex flex-col items-center justify-center gap-10 mt-3 rounded-sm">
        <Heading
          asChild
          className="text-4xl leading-tight font-semibold text-center text-gray-900 md:text-5xl"
        >
          <h2>{t.landing.partners}</h2>
        </Heading>

        <div className="w-full max-w-2xl grid grid-cols-3 gap-x-10 gap-y-7 justify-center items-center md:gap-x-20 md:gap-y-14"></div>
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
              className="w-6 h-6 text-gray-700 transition-colors hover:text-blue-400"
              weight="fill"
            />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Landing
