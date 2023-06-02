import clsx from 'clsx'

import { Heading } from '@components/Heading'
import Link from 'next/link'
import { CheckCircle } from '@phosphor-icons/react'

import { Button } from '@components/Button'
import { DeployStep } from './DeployStepStatus'

import { useDeploySafeHook } from '@hooks/createSafe/useDeploySafeHook'

export function CreateSafeDeployStatus() {
  const { deployStatus } = useDeploySafeHook()

  return (
    <article
      className={clsx(
        'min-w-[23.25rem] min-h-[23rem] flex flex-col flex-1 items-stretch justify-start gap-6 px-6 pt-6 pb-12 relative rounded-md border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-black lg:p-8',
        {
          'border-zinc-200 dark:border-zinc-700 brightness-90 dark:brightness-50':
            deployStatus.steps.length <= 1
        }
      )}
    >
      <div className="flex justify-start items-stretch pb-5 border-b-1 border-zinc-200 dark:border-zinc-700">
        <Heading className="text-2xl font-semibold">
          Safe creation progress
        </Heading>
      </div>

      {deployStatus?.steps.map((step, index) => (
        <DeployStep
          key={index}
          status={step.status}
          message={step.message}
          error={step.error}
        />
      ))}

      {deployStatus?.safeAddress && (
        <div className="w-full flex flex-col items-center justify-center gap-2 z-10">
          <CheckCircle className="w-24 h-24 text-cyan-500" />

          <Heading asChild className="text-2xl">
            <h2>Safe successfully created</h2>
          </Heading>

          <Button asChild className="w-full max-w-[15rem] mt-6">
            <Link href={`/dashboard/${deployStatus.safeAddress}`}>See now</Link>
          </Button>
        </div>
      )}
    </article>
  )
}
