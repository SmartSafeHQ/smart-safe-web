import Link from 'next/link'
import { useConnectWallet } from '@web3-onboard/react'
import { ArrowLeft } from 'phosphor-react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'

import { useWallet } from '@contexts/WalletContext'
import { useCreateSafe } from '@contexts/create-safe/CreateSafeContext'
import { DeploySafeInfos } from '@/components/pages/CreateSafe/DeploySafeInfos'
import { DeploySafeForm } from '@/components/pages/CreateSafe/DeploySafeForm'

export function CreateSafeDeployContent() {
  const { push } = useRouter()
  const [{ wallet }] = useConnectWallet()
  const { formattedAddress } = useWallet()
  const { safeInfos } = useCreateSafe()

  useEffect(() => {
    if (!wallet || !formattedAddress || !safeInfos) push('/')
  })

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
          <DeploySafeInfos />

          <main className="min-w-[23.25rem] flex flex-col flex-1 items-stretch justify-start gap-6 p-6 relative rounded-md border-2 border-zinc-200 dark:border-zinc-700 shadow-lg bg-white dark:bg-black lg:p-8">
            <div className="flex justify-start items-stretch pb-5 border-b-1 border-zinc-200 dark:border-zinc-700">
              <Heading className="text-2xl font-semibold">
                Configure safe
              </Heading>
            </div>

            <DeploySafeForm />
          </main>
        </div>
      </div>
    </div>
  )
}
