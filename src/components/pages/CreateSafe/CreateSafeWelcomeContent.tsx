import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import { useConnectWallet } from '@web3-onboard/react'
import Image from 'next/image'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { WalletCreatedSafes } from '@components/pages/CreateSafe/WalletCreatedSafes'
import { CreateSafeWelcomeConnectWallet } from '@components/pages/CreateSafe/ CreateSafeWelcomeConnectWallet'
import { CreateSafeWelcomeForm } from '@components/pages/CreateSafe/CreateSafeWelcomeForm'

import chainlinkLogoText from '../../../../public/chainlink-logo-text.svg'

export function CreateSafeWelcomeContent() {
  const [{ wallet }] = useConnectWallet()

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col flex-1 justify-center items-center p-6 relative">
      <div className="w-full max-w-[37.5rem] flex flex-1 flex-col items-stretch justify-start md:max-w-[75rem]">
        <div className="flex flex-col items-stretch justify-start flex-1 pb-6 gap-3 break-words sm:pb-16 sm:pt-8 md:flex-row">
          <div className="flex flex-col items-stretch justify-start flex-1 break-words">
            <Heading
              asChild
              className="text-4xl leading-10 text-start font-semibold"
            >
              <h1>Let&apos;s build together</h1>
            </Heading>

            <Text
              asChild
              className="text-sm leading-7 text-zinc-500 font-medium text-start"
            >
              <p>
                Your trusted, decentralized custody and asset management
                platform environment.
              </p>
            </Text>
          </div>

          <div className="flex flex-col items-stretch justify-start">
            <Image
              src={chainlinkLogoText}
              alt="Chainlink services logo"
              quality={100}
              className="w-28 h-14"
            />

            <Text className="text-zinc-500">Powered by Chainlink</Text>

            <Text
              asChild
              className="flex items-center gap-1 text-sm font-medium text-cyan-500 transition-colors hover:text-cyan-600"
            >
              <Link href="https://chain.link/" target="_blank">
                Explore chainlink services now!
                <ArrowRight className="w-4 h-4 text-cyan-500" />
              </Link>
            </Text>
          </div>
        </div>

        <div className="w-full flex flex-col-reverse flex-1 items-stretch justify-start gap-6 flex-wrap-reverse md:flex-row lg:gap-11">
          <main className="flex flex-col flex-1 items-stretch justify-start p-8 relative rounded-lg border-2 border-zinc-200 dark:border-zinc-700 shadow-lg bg-white dark:bg-black lg:min-w-[23.25rem]">
            <div className="flex justify-center items-stretch pt-2 md:justify-start">
              <Heading asChild className="text-xl font-semibold">
                <h1>Create your safe</h1>
              </Heading>
            </div>

            {wallet ? (
              <CreateSafeWelcomeForm />
            ) : (
              <CreateSafeWelcomeConnectWallet />
            )}
          </main>

          <WalletCreatedSafes />
        </div>
      </div>
    </div>
  )
}
