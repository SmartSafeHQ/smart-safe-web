import { Keyhole } from 'phosphor-react'
import { useConnectWallet } from '@web3-onboard/react'

import { Button } from '@components/Button'
import { Text } from '@components/Text'

export function CreateSafeWelcomeConnectWallet() {
  const [, connect] = useConnectWallet()

  return (
    <div className="h-[22rem] flex flex-col items-center justify-center relative mt-3 p-12 rounded-md bg-zinc-50 dark:bg-zinc-900 border-1 border-zinc-200 dark:border-zinc-700">
      <div className="max-w-full flex flex-1 flex-col items-center justify-start gap-6 relative">
        <Text
          asChild
          className="my-2 text-sm leading-6 text-center tracking-tighter text-gray-800 dark:text-gray-400"
        >
          <p>
            Connect your wallet with a web3 provider to create you safe on
            chain.
          </p>
        </Text>

        <Button onClick={() => connect()} className="w-full max-w-xs gap-2">
          <Keyhole className="w-6 h-6" weight="fill" />

          <Text className="font-medium">Connect wallet now</Text>
        </Button>
      </div>
    </div>
  )
}
