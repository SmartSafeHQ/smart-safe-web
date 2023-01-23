import { List, Question, SignOut, User } from 'phosphor-react'
import Link from 'next/link'

import { TokenverseTextLogoWhite } from '@components/Logos/TokenverseTextLogoWhite'
import { Avatar } from '@components/Avatar'
import { DropdownMenu } from '@components/DropdownMenu'
import { DialogDrawer } from '@components/Dialogs/DialogDrawer'
import { Text } from '@components/Text'
import { DropdownMenuUserInfos } from './DropdownMenuUserInfos'

import { useAuth } from '@contexts/AuthContext'

export function Header() {
  const { customer, signOut } = useAuth()

  const customerShortName = customer?.name.substring(0, 2)

  return (
    <header className="w-full py-3 px-4 fixed top-0 left-0 z-10 bg-gray-800 shadow-lg shadow-gray-900 md:px-7 md:py-3">
      <div className="w-full h-full max-w-8xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <DialogDrawer.Trigger>
            <button aria-label="Sidebar menu mobile" className="flex md:hidden">
              <List className="text-xl text-gray-100" weight="bold" />
            </button>
          </DialogDrawer.Trigger>

          <TokenverseTextLogoWhite className="w-40 h-5 md:w-56 md:h-6" />
        </div>

        <div className="flex items-center gap-4">
          <Text
            asChild
            className="text-md text-gray-300 transition-colors hover:text-gray-100"
          >
            <Link href="#" target="_blank">
              Docs
            </Link>
          </Text>

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
                name={customer?.name ?? 'loading...'}
                email={customer?.email ?? 'loading...'}
                shortName={customerShortName}
              />

              <DropdownMenu.Separator />

              <DropdownMenu.Item LeftIcon={User} isDisabled>
                my profile
              </DropdownMenu.Item>

              <DropdownMenu.Item LeftIcon={Question} isDisabled>
                help center
              </DropdownMenu.Item>

              <DropdownMenu.Item LeftIcon={SignOut} onSelect={() => signOut()}>
                logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  )
}
