import { List, Moon, Sun, Question, User } from 'phosphor-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

import { SmartSafeIconLogo } from '@components/Logos/SmartSafeIconLogo'
import { SmartSafeTextLogo } from '@components/Logos/SmartSafeTextLogo'
import { Avatar } from '@components/Avatar'
import { DropdownMenu } from '@components/DropdownMenu'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'

export function Header() {
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
            <button aria-label="Customise options">
              <Avatar.Root fallbackName="pa" className="w-7 h-7">
                <Avatar.Image src="#" alt="Paulo Reis" />
              </Avatar.Root>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            sideOffset={12}
            align="end"
            className="w-[100vw] min-w-[15rem] pb-4 md:w-full"
          >
            <DropdownMenu.Separator />

            <DropdownMenu.Item
              LeftIcon={User}
              isDisabled
              className="px-6 py-3 text-sm"
            >
              My profile
            </DropdownMenu.Item>

            {theme === 'light' ? (
              <DropdownMenu.Item
                LeftIcon={Sun}
                onSelect={() => setTheme('dark')}
                className="px-6 py-3 text-sm"
              >
                theme: light
              </DropdownMenu.Item>
            ) : (
              <DropdownMenu.Item
                LeftIcon={Moon}
                onSelect={() => setTheme('light')}
                className="px-6 py-3 text-sm"
              >
                theme: dark
              </DropdownMenu.Item>
            )}

            <DropdownMenu.Item
              LeftIcon={Question}
              isDisabled
              className="px-6 py-3 text-sm"
            >
              help center
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </header>
  )
}
