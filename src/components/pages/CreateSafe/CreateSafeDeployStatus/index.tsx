import clsx from 'clsx'

import { Heading } from '@components/Heading'
import {
  WaitForSafeSetup,
  WaitForProviderConfirmation,
  WaitForSmartSafeProxyDeployment,
  SmartSafeProxySuccessfullyDeployed
} from './DeploySteps'

import { useDeploySafeHook } from '@hooks/safes/create/useDeploySafeHook'

export function CreateSafeDeployStatus() {
  const { deployStatus } = useDeploySafeHook()

  return (
    <article
      className={clsx(
        'min-w-[23.25rem] min-h-[23rem] flex flex-col flex-1 items-stretch justify-start gap-6 px-6 pt-6 pb-12 relative rounded-md border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-black lg:p-8',
        {
          'border-zinc-200 dark:border-zinc-700 brightness-90 dark:brightness-50':
            deployStatus.sign.status === 'idle' &&
            deployStatus.deploy.status === 'idle'
        }
      )}
    >
      <div className="flex justify-start items-stretch pb-5 border-b-1 border-zinc-200 dark:border-zinc-700">
        <Heading className="text-2xl font-semibold">
          Safe creation progress
        </Heading>
      </div>

      <WaitForSafeSetup deployStatus={deployStatus} />

      <WaitForProviderConfirmation deployStatus={deployStatus} />

      <WaitForSmartSafeProxyDeployment deployStatus={deployStatus} />

      <SmartSafeProxySuccessfullyDeployed deployStatus={deployStatus} />
    </article>
  )
}
