import clsx from 'clsx'

import { Heading } from '@components/Heading'
import {
  WaitForSafeSetup,
  WaitForMetaMaskConfirmation,
  WaitForSmartSafeProxyDeployment,
  SmartSafeProxySuccessfullyDeployed
} from './DeploySteps'

import { useDeploySafeHook } from '@hooks/safes/create/useDeploySafeHook'

export function CreateSafeDeployStatus() {
  const { deployStatus } = useDeploySafeHook()

  const borderStatusColor = {
    idle: {
      'brightness-90 dark:brightness-50':
        deployStatus.sign.status === 'idle' &&
        deployStatus.deploy.status === 'idle'
    },
    signing: {
      'border-blue-400 dark:border-blue-700 shadow-blue-300':
        deployStatus.sign.status === 'loading' &&
        deployStatus.deploy.status === 'idle'
    },
    deploying: {
      'border-yellow-400 dark:border-yellow-600 shadow-yellow-200':
        deployStatus.sign.status === 'success' &&
        deployStatus.deploy.status === 'loading'
    },
    success: {
      'border-green-400 dark:border-green-700 shadow-green-300':
        deployStatus.sign.status === 'success' &&
        deployStatus.deploy.status === 'success'
    },
    error: {
      'border-zinc-400 dark:border-red-700 shadow-red-300':
        deployStatus.sign.status === 'error' ||
        deployStatus.deploy.status === 'error'
    }
  }

  return (
    <article
      className={clsx(
        'min-w-[23.25rem] min-h-[23rem] flex flex-col flex-1 items-stretch justify-start gap-6 px-6 pt-6 pb-12 relative rounded-md border-2 border-zinc-200 dark:border-zinc-700 shadow-lg bg-white dark:bg-black lg:p-8',
        borderStatusColor.idle,
        borderStatusColor.signing,
        borderStatusColor.deploying,
        borderStatusColor.success,
        borderStatusColor.error
      )}
    >
      <div className="flex justify-start items-stretch pb-5 border-b-1 border-zinc-200 dark:border-zinc-700">
        <Heading className="text-2xl font-semibold">
          Safe creation progress
        </Heading>
      </div>

      <WaitForSafeSetup deployStatus={deployStatus} />

      <WaitForMetaMaskConfirmation deployStatus={deployStatus} />

      <WaitForSmartSafeProxyDeployment deployStatus={deployStatus} />

      <SmartSafeProxySuccessfullyDeployed deployStatus={deployStatus} />
    </article>
  )
}
