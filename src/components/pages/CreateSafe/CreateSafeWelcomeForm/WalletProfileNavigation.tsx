import { ArrowsClockwise } from 'phosphor-react'
import { useConnectWallet } from '@web3-onboard/react'

import { Text } from '@components/Text'
import { NavigationMenu } from '@components/NavigationMenu'
import { CreateSafeWalletProfile } from '@components/pages/CreateSafe/CreateSafeWalletProfile'

import { useWallet } from '@contexts/WalletContext'

export function WalletProfileNavigation() {
  const [{ wallet }, connect] = useConnectWallet()
  const { formattedAddress } = useWallet()

  if (!wallet) return null

  return (
    <NavigationMenu.Root className="w-full min-w-[15rem] flex flex-1">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            type="button"
            onPointerMove={event => event.preventDefault()}
            onPointerLeave={event => event.preventDefault()}
            className="w-full h-10 text-left overflow-hidden rounded-md bg-white dark:bg-black border-1 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 hover:dark:border-zinc-600"
          >
            <CreateSafeWalletProfile
              icon={wallet.icon}
              formattedAddress={formattedAddress ?? ''}
            />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content
            onPointerEnter={event => event.preventDefault()}
            onPointerLeave={event => event.preventDefault()}
          >
            <CreateSafeWalletProfile
              icon={wallet.icon}
              formattedAddress={formattedAddress ?? ''}
            />

            <button
              type="button"
              className="w-full h-9 px-2 text-left overflow-hidden rounded-md pointer hover:bg-zinc-200 hover:dark:bg-zinc-800"
            >
              <div
                onClick={() => connect()}
                className="flex items-center gap-3"
              >
                <ArrowsClockwise className="w-4 h-4" />

                <Text className="text-sm">Switch wallet</Text>
              </div>
            </button>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
