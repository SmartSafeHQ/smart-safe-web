import { useConnectWallet } from '@web3-onboard/react'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { WalletCreatedSafes } from '@components/pages/CreateSafe/WalletCreatedSafes'
import { CreateSafeWelcomeConnectWallet } from '@components/pages/CreateSafe/ CreateSafeWelcomeConnectWallet'
import { CreateSafeWelcomeForm } from '@components/pages/CreateSafe/CreateSafeWelcomeForm'

export function CreateSafeWelcomeContent() {
  const [{ wallet }] = useConnectWallet()

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col flex-1 justify-center items-center p-6 relative">
      <div className="w-full max-w-[37.5rem] flex flex-1 flex-col items-stretch justify-start md:max-w-[75rem]">
        <div className="flex flex-col items-stretch justify-start flex-1 pb-6 break-words sm:pb-16 sm:pt-8">
          <Heading
            asChild
            className="text-4xl leading-10 text-start font-semibold"
          >
            <h1>Let&apos;s build together</h1>
          </Heading>

          <Text
            asChild
            className="text-sm leading-7 text-gray-500 font-medium text-start"
          >
            <p>
              Your trusted, decentralized custody and asset management platform
              environment.
            </p>
          </Text>
        </div>

        <div className="w-full flex flex-col flex-1 items-stretch justify-start gap-11 flex-wrap md:flex-row">
          <main className="min-w-[23.25rem] flex flex-col flex-1 items-stretch justify-start p-8 relative rounded-lg border-2 border-zinc-200 dark:border-zinc-700 shadow-lg bg-white dark:bg-black">
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
