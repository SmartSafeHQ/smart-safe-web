import Link from 'next/link'
import { CheckCircle } from '@phosphor-icons/react'

import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { StepDone, StepError, StepOnGoing } from './DeployStepStatus'

interface WaitForUserConfirmationProps {
  deployStatus: {
    sign: {
      status: 'idle' | 'loading' | 'success' | 'error'
      errorReason: string
    }
    deploy: {
      status: 'idle' | 'loading' | 'success' | 'error'
      errorReason: string
    }
    safeAddress?: string
  }
}

export function WaitForSafeSetup({
  deployStatus
}: WaitForUserConfirmationProps) {
  if (deployStatus.sign.status === 'idle') {
    return <StepOnGoing text="Waiting for your final touches..." />
  } else {
    return <StepDone text="Waiting for your final touches..." />
  }
}

export function WaitForMetaMaskConfirmation({
  deployStatus
}: WaitForUserConfirmationProps) {
  if (deployStatus.sign.status === 'loading') {
    return <StepOnGoing text="Waiting for your confirmation..." />
  } else if (deployStatus.sign.status === 'success') {
    return <StepDone text="Waiting for your confirmation..." />
  } else if (deployStatus.sign.status === 'error') {
    return (
      <StepError
        text="Waiting for your confirmation..."
        error={deployStatus.sign.errorReason}
      />
    )
  } else {
    return null
  }
}

export function WaitForSmartSafeProxyDeployment({
  deployStatus
}: WaitForUserConfirmationProps) {
  if (deployStatus.deploy.status === 'loading') {
    return (
      <StepOnGoing text="The transaction is being processed on the blockchain..." />
    )
  } else if (deployStatus.deploy.status === 'success') {
    return (
      <StepDone text="The transaction is being processed on the blockchain..." />
    )
  } else if (deployStatus.deploy.status === 'error') {
    return (
      <StepError
        text="The transaction is being processed on the blockchain..."
        error={deployStatus.deploy.errorReason}
      />
    )
  } else {
    return null
  }
}

export function SmartSafeProxySuccessfullyDeployed({
  deployStatus
}: WaitForUserConfirmationProps) {
  if (deployStatus.deploy.status === 'success') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-2 z-10">
        <CheckCircle className="w-24 h-24 text-cyan-500" />

        <Heading asChild className="text-2xl">
          <h2>Safe successfully created</h2>
        </Heading>

        <Button asChild className="w-full max-w-[15rem] mt-6">
          <Link href={`/dashboard/${deployStatus?.safeAddress}`}>See now</Link>
        </Button>
      </div>
    )
  } else {
    return null
  }
}
