import Image from 'next/image'
import { ArrowRight } from 'phosphor-react'
import Link from 'next/link'

import { Heading } from '@components/Heading'
import { DownloadPlayStore } from '@components/pages/Layouts/DownloadCards/DownloadPlayStore'
import { DownloadAppleStore } from '@components/pages/Layouts/DownloadCards/DownloadAppleStore'
import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'

export function HeroSection() {
  const { t } = useI18n()

  return (
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
            className="w-full flex items-center justify-center rounded-md uppercase focus:ring-2 ring-gray-900 px-10 py-4 text-xl font-semibold bg-cyan-500 transition-colors text-black shadow-[0_0_1em_0_,_0_0_2em_0_] shadow-cyan-200 hover:bg-cyan-400"
          >
            <Link href="/accounts/login">
              <div className="w-full flex items-center justify-center gap-4">
                <Text>{t.landing.signIn}</Text>

                <ArrowRight className="w-8 h-8 text-gray-900" weight="bold" />
              </div>
            </Link>
          </Text>

          <div className="w-full flex items-center gap-2 md:gap-6 lg:gap-8">
            <DownloadPlayStore className="p-2 sm:p-3" />
            <DownloadAppleStore className="p-2 sm:p-3" />
          </div>
        </div>
      </main>

      <div className="w-full max-w-[32rem] relative">
        <Image
          src="/landing/app-in-wallet-preview.png"
          alt={t.landing.heroImageAlt}
          width={608}
          height={512}
          quality={100}
        />
      </div>
    </section>
  )
}
