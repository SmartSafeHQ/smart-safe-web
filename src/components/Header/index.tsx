import { List, Moon, Sun, Question, SignOut, User } from 'phosphor-react'

import { TokenverseTextLogo } from '@components/Logos/TokenverseTextLogo'
import { Avatar } from '@components/Avatar'
import { DropdownMenu } from '@components/DropdownMenu'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { DropdownLocales } from '@components/Header/DropdownLocales'
import { DropdownMenuUserInfos } from './DropdownMenuUserInfos'

import { useAuth } from '@contexts/AuthContext'
import { useTheme } from '@contexts/ThemeContext'
import { useI18n } from '@hooks/useI18n'

export function Header() {
  const { customer, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()

  const customerShortName = customer?.name.substring(0, 2)

  return (
    <header className="w-full py-2 px-4 fixed top-0 left-0 z-10 bg-white dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 md:px-7">
      <div className="w-full h-full max-w-8xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <DialogDrawer.Trigger>
            <button aria-label="Sidebar menu mobile" className="flex md:hidden">
              <List className="text-xl dark:text-gray-100" weight="bold" />
            </button>
          </DialogDrawer.Trigger>

          <TokenverseTextLogo className="w-40 h-5 md:w-56 md:h-6" />
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

          <DropdownMenu.Content sideOffset={18} align="end">
            <DropdownMenuUserInfos
              name={customer?.name ?? '...'}
              email={customer?.email ?? '...'}
              shortName={customerShortName}
            />

            <DropdownMenu.Separator />

            <DropdownMenu.Item LeftIcon={User} isDisabled>
              {t.header.myProfile}
            </DropdownMenu.Item>

            <DropdownMenu.Item
              LeftIcon={theme === 'dark' ? Moon : Sun}
              onClick={toggleTheme}
            >
              {t.header.theme}: {theme}
            </DropdownMenu.Item>

            <DropdownLocales />

            <DropdownMenu.Item LeftIcon={Question} isDisabled>
              {t.header.helpCenter}
            </DropdownMenu.Item>

            <DropdownMenu.Item LeftIcon={SignOut} onSelect={() => signOut()}>
              {t.header.logout}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </header>
  )
}
