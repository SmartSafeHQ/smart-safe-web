import { List, Moon, Sun, Question, SignOut, User } from 'phosphor-react'
import { useTheme } from 'next-themes'

import { InWalletTextLogo } from '@components/Logos/InWalletTextLogo'
import { Avatar } from '@components/Avatar'
import { DropdownMenu } from '@components/DropdownMenu'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { DropdownLocales } from '@components/Header/DropdownLocales'
import { DropdownMenuUserInfos } from './DropdownMenuUserInfos'

import { useAuth } from '@contexts/AuthContext'
import { useI18n } from '@hooks/useI18n'

export function Header() {
  const { customer, signOut } = useAuth()
  const { theme, setTheme } = useTheme()

  const { t } = useI18n()

  const customerShortName = customer?.name.substring(0, 2)

  return (
    <header className="w-full py-2 px-4 fixed top-0 left-0 z-10 bg-white dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 md:px-7">
      <div className="w-full h-full max-w-8xl flex justify-between items-center">
        <div className="flex items-center gap-3 h-min">
          <DialogDrawer.Trigger>
            <button aria-label="Sidebar menu mobile" className="flex md:hidden">
              <List className="text-xl dark:text-gray-100" weight="bold" />
            </button>
          </DialogDrawer.Trigger>

          <InWalletTextLogo className="w-0 h-0 md:w-40 md:h-10" />
        </div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button aria-label="Customise options">
              <Avatar.Root
                fallbackName={customerShortName}
                className="w-10 h-10 md:w-14 md:h-14"
              >
                <Avatar.Image src="#" alt={customer?.name} />
              </Avatar.Root>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            sideOffset={18}
            align="end"
            className="w-[100vw] min-w-[15rem] pb-4 md:w-full"
          >
            <DropdownMenuUserInfos
              name={customer?.name ?? '...'}
              email={customer?.email ?? '...'}
              shortName={customerShortName}
            />

            <DropdownMenu.Separator />

            <DropdownMenu.Item LeftIcon={User} isDisabled className="px-6 py-3">
              {t.header.myProfile}
            </DropdownMenu.Item>

            {theme === 'light' ? (
              <DropdownMenu.Item
                LeftIcon={Sun}
                onClick={() => setTheme('dark')}
                className="px-6 py-3"
              >
                {t.header.theme}: {t.header.light}
              </DropdownMenu.Item>
            ) : (
              <DropdownMenu.Item
                LeftIcon={Moon}
                onClick={() => setTheme('light')}
                className="px-6 py-3"
              >
                {t.header.theme}: {t.header.dark}
              </DropdownMenu.Item>
            )}

            <DropdownLocales />

            <DropdownMenu.Item
              LeftIcon={Question}
              isDisabled
              className="px-6 py-3"
            >
              {t.header.helpCenter}
            </DropdownMenu.Item>

            <DropdownMenu.Item
              LeftIcon={SignOut}
              onSelect={() => signOut()}
              className="px-6 py-3"
            >
              {t.header.logout}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </header>
  )
}
