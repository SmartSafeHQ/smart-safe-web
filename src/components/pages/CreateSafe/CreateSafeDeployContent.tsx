import Link from 'next/link'
import { useConnectWallet } from '@web3-onboard/react'
import { ArrowLeft } from 'phosphor-react'
import Image from 'next/image'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'

import { useWallet } from '@contexts/WalletContext'
import { useCreateSafe } from '@contexts/create-safe/CreateSafeContext'

export function CreateSafeDeployContent() {
  const [{ wallet }] = useConnectWallet()
  const { formattedAddress } = useWallet()
  const { safeInfos } = useCreateSafe()

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col flex-1 justify-center items-center px-6 py-7 relative lg:py-12">
      <div className="w-full max-w-[76rem] flex flex-1 flex-col items-stretch justify-start">
        <div className="w-full flex flex-col items-stretch justify-start pb-7 break-word lg:pb-10">
          <Text
            asChild
            className="flex items-center gap-2 mb-6 text-sm text-zinc-400 transition-colors hover:text-zinc-500"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 text-zinc-400" />
              Back
            </Link>
          </Text>

          <Heading
            asChild
            className="text-4xl leading-[2.75rem] text-start font-semibold"
          >
            <h1>You&apos;re almost done.</h1>
          </Heading>

          <Text
            asChild
            className="text-sm leading-7 text-zinc-600 dark:text-zinc-500 font-semibold text-start"
          >
            <p>
              Please follow the steps to configure your Project and deploy it.
            </p>
          </Text>
        </div>

        <div className="w-full flex flex-col flex-1 items-stretch justify-start gap-9 lg:flex-row lg:gap-[4.5rem]">
          <aside className="w-full flex flex-col items-stretch justify-start lg:w-72">
            <div className="flex items-center justify-center gap-3 p-6 rounded-lg bg-zinc-200 dark:bg-zinc-700">
              <Image
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  wallet?.icon
                )}`}
                alt="wallet connector provider icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />

              <Text className="text-sm font-medium">{formattedAddress}</Text>
            </div>

            <div className="w-full pt-6 flex flex-col items-stretch justify-start gap-4 lg:pt-14">
              <Text className="text-xs leading-5 hidden font-semibold uppercase text-zinc-800 dark:text-zinc-400 lg:block">
                Network deploy
              </Text>

              <div className="w-full flex items-center gap-3">
                <Image
                  src={safeInfos?.chain.icon}
                  alt="chain to deploy safe icon"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />

                <Text asChild className="font-medium capitalize">
                  <strong>{safeInfos?.chain.networkName}</strong>
                </Text>
              </div>
            </div>
          </aside>

          <main className="min-w-[23.25rem] flex flex-col flex-1 items-stretch justify-start p-8 relative rounded-md border-2 border-zinc-200 dark:border-zinc-700 shadow-lg bg-white dark:bg-black">
            <div className="flex justify-start items-stretch pt-2">
              <Heading asChild className="text-xl font-semibold">
                <h1>Create your safe</h1>
              </Heading>
            </div>
            continue
          </main>
        </div>
      </div>
    </div>
  )
}
