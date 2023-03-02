import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { InWalletTextLogo } from '@/components/Logos/InWalletTextLogo'

import { useI18n } from '@hooks/useI18n'

export default function Privacy() {
  const { t, handleLanguageSwitch } = useI18n()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{t.privacy.headTitle}</title>
        <meta name="description" content={t.privacy.headDescription} />
      </Head>

      <header className="flex flex-row justify-between gap-2 items-center h-min py-5 px-5 container mx-auto">
        <InWalletTextLogo
          className="w-40 md:w-56 cursor-pointer"
          onClick={() => router.push('/dashboard/home')}
        />

        <div className="flex gap-2">
          <div
            className="relative w-[30px] h-[30px] rounded-full overflow-hidden cursor-pointer transition-all hover:scale-105"
            onClick={() => handleLanguageSwitch('pt')}
          >
            <Image
              src="/languages/br.svg"
              alt=""
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div
            className="relative w-[30px] h-[30px] rounded-full overflow-hidden cursor-pointer transition-all hover:scale-105"
            onClick={() => handleLanguageSwitch('en')}
          >
            <Image
              src="/languages/us.svg"
              alt=""
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto py-10 px-5">
        <h1 className="text-3xl font-bold mb-5">{t.privacy.title}</h1>
        <p>{t.privacy.description}</p>

        <h2 className="text-xl font-bold mt-8 mb-4">
          {t.privacy.informationCollected}
        </h2>
        <p>{t.privacy.informationCollectedDescription}</p>

        <h2 className="text-xl font-bold mt-8 mb-4">
          {t.privacy.useOfInformation}
        </h2>
        <p>{t.privacy.useOfInformation}</p>

        <h2 className="text-xl font-bold mt-8 mb-4">
          {t.privacy.sharingOfInformation}
        </h2>
        <p>{t.privacy.sharingOfInformationDescription}</p>

        <h2 className="text-xl font-bold mt-8 mb-4">
          {t.privacy.informationSecurity}
        </h2>
        <p>{t.privacy.informationSecurityDescription}</p>

        <h2 className="text-xl font-bold mt-8 mb-4">
          {t.privacy.cookiesAndSimilarTechnologies}
        </h2>
        <p>{t.privacy.cookiesAndSimilarTechnologiesDescription}</p>

        <h2 className="text-xl font-bold mt-8 mb-4">
          {t.privacy.changesToThePrivacyPolicy}
        </h2>
        <p>{t.privacy.changesToThePrivacyPolicyDescription}</p>

        <h2 className="text-xl font-bold mt-8 mb-4">{t.privacy.contact}</h2>
        <p>{t.privacy.contactDescription}</p>
      </div>
    </>
  )
}
