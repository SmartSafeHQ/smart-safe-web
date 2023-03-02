import { Heading } from '@components/Heading'
import { WalletConnectBlueLogo } from '@components/Logos/WalletConnectBlueLogo'
import { Text } from '@components/Text'
import { CtaLink } from '@components/pages/Landing/CtaLink'

import { useI18n } from '@hooks/useI18n'

interface NetworksSupportSectionProps {
  networks: { id: string; avatar: string; name: string }[]
}

export function NetworksSupportSection({
  networks
}: NetworksSupportSectionProps) {
  const { t } = useI18n()

  return (
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

          <CtaLink title={t.landing.getStarted} href="/accounts/login" />
        </div>

        <Text asChild className="mb-2 text-sm font-normal text-gray-200">
          <strong>{t.landing.currentlyOn}</strong>
        </Text>

        <div className="w-full grid grid-cols-3 gap-x-10 gap-y-7 justify-center items-center md:gap-x-20 md:gap-y-14">
          {networks.map(network => (
            <div key={network.id} className="flex flex-col items-center gap-3">
              <img
                src={network.avatar}
                alt={`${network.name} network icon`}
                className="w-12 bg-cover md:w-16"
              />

              <Text className="text-xs font-medium text-gray-50 uppercase text-center md:text-sm">
                {network.name}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
