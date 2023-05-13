import { List, Moon, Sun, ArrowsClockwise, SignOut } from 'phosphor-react'
import { useConnectWallet } from '@web3-onboard/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

import { SmartSafeIconLogo } from '@components/Logos/SmartSafeIconLogo'
import { SmartSafeTextLogo } from '@components/Logos/SmartSafeTextLogo'
import { Avatar } from '@components/Avatar'
import { DropdownMenu } from '@components/DropdownMenu'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { Text } from '@components/Text'

import { useWallet } from '@contexts/WalletContext'

export function Header() {
  const [{ wallet }, connect, disconnect] = useConnectWallet()
  const { formattedAddress } = useWallet()
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 w-full px-4 z-10 bg-zinc-50 dark:bg-zinc-950 md:px-7">
      <div className="w-full h-full max-w-8xl flex justify-between items-center">
        <div className="w-full flex items-center gap-4 h-min">
          <DialogDrawer.Trigger>
            <button aria-label="Sidebar menu mobile" className="flex md:hidden">
              <List className="w-6 h-6" weight="regular" />
            </button>
          </DialogDrawer.Trigger>

          <Link href="/">
            <SmartSafeTextLogo className="w-32 h-14 hidden sm:block" />
            <SmartSafeIconLogo className="w-7 h-14 block sm:hidden" />
          </Link>
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button aria-label="avatar menu options">
              <Avatar.Root fallbackName="pa" className="w-9 h-9 text-xs">
                <Avatar.Image src="#" alt="Paulo Reis" />
              </Avatar.Root>
            </button>
          </DropdownMenu.Trigger>

          {wallet && (
            <DropdownMenu.Content
              sideOffset={12}
              align="end"
              className="w-[100vw] min-w-[15rem] pb-2 md:w-full"
            >
              <div className="flex flex-col items-stretch justify-start gap-1 px-5 py-2">
                <Text
                  asChild
                  className="text-sm text-zinc-800 dark:text-zinc-400"
                >
                  <strong>Paulo Reis</strong>
                </Text>

                <Text className="text-sm text-zinc-600 dark:text-zinc-500">
                  {formattedAddress}
                </Text>
              </div>

              <DropdownMenu.Item
                LeftIcon={ArrowsClockwise}
                onSelect={() => connect()}
                className="px-5 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-500/10 hover:dark:bg-zinc-50/10 hover:text-gray-900 hover:dark:text-gray-200"
              >
                Switch wallet:
                {wallet && (
                  <Image
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      wallet.icon
                    )}`}
                    alt="wallet connector provider icon"
                    width={16}
                    height={16}
                    className="w-5 h-5 ml-auto"
                  />
                )}
              </DropdownMenu.Item>

              {theme === 'light' ? (
                <DropdownMenu.Item
                  LeftIcon={Sun}
                  onSelect={() => setTheme('dark')}
                  className="px-5 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-500/10 hover:dark:bg-zinc-50/10 hover:text-gray-900 hover:dark:text-gray-200"
                >
                  theme: light
                </DropdownMenu.Item>
              ) : (
                <DropdownMenu.Item
                  LeftIcon={Moon}
                  onSelect={() => setTheme('light')}
                  className="px-5 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-500/10 hover:dark:bg-zinc-50/10 hover:text-gray-900 hover:dark:text-gray-200"
                >
                  theme: dark
                </DropdownMenu.Item>
              )}

              <DropdownMenu.Item
                LeftIcon={SignOut}
                onSelect={() => disconnect(wallet)}
                className="px-5 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-500/10 hover:dark:bg-zinc-50/10 hover:text-gray-900 hover:dark:text-gray-200"
              >
                Log out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          )}
        </DropdownMenu.Root>
      </div>
    </header>
  )
}
