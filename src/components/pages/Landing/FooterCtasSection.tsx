import Link from 'next/link'

import { Heading } from '@components/Heading'
import { DownloadPlayStore } from '@components/pages/Layouts/DownloadCards/DownloadPlayStore'
import { DownloadAppleStore } from '@components/pages/Layouts/DownloadCards/DownloadAppleStore'
import { InWalletIconLogo } from '@components/Logos/InWalletIconLogo'
import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'

export function FooterCtasSection() {
  const { t } = useI18n()

  return (
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
  )
}
