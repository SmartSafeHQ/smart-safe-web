import { Moon, Sun, ArrowsClockwise, SignOut } from '@phosphor-icons/react'
import { useConnectWallet } from '@web3-onboard/react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { Avatar } from '@components/Avatar'
import { DropdownMenu } from '@components/DropdownMenu'
import { Text } from '@components/Text'

import { useSafe } from '@contexts/SafeContext'

export function ProfileDropdown() {
  const { push } = useRouter()
  const [{ wallet }, connect, disconnect] = useConnectWallet()
  const { formattedOwnerAddress, safe } = useSafe()
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button aria-label="avatar menu options">
          <Avatar.Root
            fallbackName={safe?.ownerName}
            className="w-9 h-9 text-xs"
          >
            <Avatar.Image src="#" alt={safe?.ownerName} />
          </Avatar.Root>
        </button>
      </DropdownMenu.Trigger>

      {wallet && safe && (
        <DropdownMenu.Content
          sideOffset={12}
          align="end"
          className="w-[100vw] min-w-[15rem] pb-2 md:w-full"
        >
          <div className="flex flex-col items-stretch justify-start gap-1 px-5 py-2 mb-2">
            <Text asChild className="text-sm text-zinc-800 dark:text-zinc-400">
              <strong>{safe.ownerName}</strong>
            </Text>

            <div className="w-full flex items-center gap-3">
              <Text className="text-sm text-zinc-600 dark:text-zinc-500">
                {formattedOwnerAddress}
              </Text>

              <Image
                src={safe.chain.icon}
                alt="deployed safe chain icon"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
          </div>

          <DropdownMenu.Item
            LeftIcon={ArrowsClockwise}
            onSelect={() => connect()}
            className="px-5 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-500/10 hover:dark:bg-zinc-50/10 hover:text-zinc-900 hover:dark:text-zinc-200"
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
              className="px-5 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-500/10 hover:dark:bg-zinc-50/10 hover:text-zinc-900 hover:dark:text-zinc-200"
            >
              theme: light
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item
              LeftIcon={Moon}
              onSelect={() => setTheme('light')}
              className="px-5 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-500/10 hover:dark:bg-zinc-50/10 hover:text-zinc-900 hover:dark:text-zinc-200"
            >
              theme: dark
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Item
            LeftIcon={SignOut}
            onSelect={() => {
              push('/')
              disconnect(wallet)
            }}
            className="px-5 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-500/10 hover:dark:bg-zinc-50/10 hover:text-zinc-900 hover:dark:text-zinc-200"
          >
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      )}
    </DropdownMenu.Root>
  )
}
