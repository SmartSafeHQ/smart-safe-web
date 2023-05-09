import clsx from 'clsx'
import Link from 'next/link'
import { CheckCircle, WarningCircle } from 'phosphor-react'

import { Heading } from '@components/Heading'
import { Text } from '@components/Text'
import { SmartSafeIconLogo } from '@components/Logos/SmartSafeIconLogo'
import { Button } from '@components/Button'

import { useDeploySafeHook } from '@hooks/safes/create/useDeploySafeHook'

export function CreateSafeDeployStatus() {
  const { deployStatus } = useDeploySafeHook()

  return (
    <article
      className={clsx(
        'min-w-[23.25rem] min-h-[23rem] flex flex-col flex-1 items-stretch justify-start gap-6 px-6 pt-6 pb-12 relative rounded-md border-2 border-zinc-200 dark:border-zinc-700 shadow-lg bg-white dark:bg-black lg:p-8',
        {
          'brightness-90 dark:brightness-50':
            !deployStatus.isLoading && !deployStatus.isDeployed
        }
      )}
    >
      <div className="flex justify-start items-stretch pb-5 border-b-1 border-zinc-200 dark:border-zinc-700">
        <Heading className="text-2xl font-semibold">Creating safe</Heading>
      </div>

      {!deployStatus.isLoading && !deployStatus.isDeployed && (
        <Text className="text-sm text-zinc-600 dark:text-zinc-400">
          Preparing creation...
        </Text>
      )}

      {deployStatus.isLoading && (
        <div className="w-full flex flex-col items-center justify-start pt-2">
          <div className="w-full flex items-center gap-1 text-left mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            <WarningCircle className="w-5 h-5" />

            <Text>Confirm the transaction to proceed</Text>
          </div>

          <SmartSafeIconLogo className="w-32 h-32 animate-pulse" />

          <Heading asChild className="mt-5 text-2xl text-center">
            <h2>Creating your safe on chain now!</h2>
          </Heading>
        </div>
      )}

      {deployStatus.isDeployed && (
        <div className="w-full flex flex-col items-center justify-center gap-2 z-10">
          <CheckCircle className="w-24 h-24 text-cyan-500" />

          <Heading asChild className="text-2xl">
            <h2>Safe successfully created</h2>
          </Heading>

          <Button asChild className="w-full max-w-[15rem] mt-6">
            <Link href={`/dashboard/${deployStatus?.safeId}`}>See now</Link>
          </Button>
        </div>
      )}
    </article>
  )
}
