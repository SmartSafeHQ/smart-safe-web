import Link from 'next/link'
import clsx from 'clsx'
import { TwitterLogo } from 'phosphor-react'

import { Text } from '@components/Text'
import { InWalletTextLogo } from '@components/Logos/InWalletTextLogo'
import { InWalletIconLogo } from '@components/Logos/InWalletIconLogo'
import { SelectInput } from '@components/Inputs/SelectInput'

import { useI18n } from '@hooks/useI18n'
import { TOKENVERSE_TWITTER_LINK } from '@utils/global/constants/links'

export function Header() {
  const { t, currentLocaleProps, handleLanguageSwitch } = useI18n()

  return (
    <header
      className={clsx(
        'w-full h-16 fixed top-0 left-0 px-6 z-10 md:px-8 border-b-[1px] border-gray-700 bg-[#161617cc] shadow-xl backdrop:filter-[saturate(180%) blur(20px)]'
      )}
      style={{
        backdropFilter: 'saturate(180%) blur(20px)'
      }}
    >
      <div className="w-full h-full flex justify-between items-center">
        <div className="flex items-center gap-5 sm:gap-6">
          <InWalletTextLogo
            className="w-36 h-8 hidden sm:block"
            variant="light"
          />

          <InWalletIconLogo className="w-6 block sm:hidden" variant="light" />

          <a href={TOKENVERSE_TWITTER_LINK} target="_blank" rel="noreferrer">
            <TwitterLogo
              className="w-6 h-6 text-gray-200 transition-colors hover:text-blue-400"
              weight="fill"
            />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <SelectInput.Root
            defaultValue={currentLocaleProps.id}
            onValueChange={handleLanguageSwitch}
          >
            <SelectInput.Trigger className="h-9 px-1 bg-gray-50 text-gray-800 !ring-gray-900 sm:h-10 sm:px-4" />

            <SelectInput.Content className="bg-gray-50 text-gray-800">
              <SelectInput.Group>
                {t.header.internationalization.options.map(locale => (
                  <SelectInput.Item
                    key={locale.id}
                    value={locale.id}
                    disabled={locale.id === currentLocaleProps.id}
                  >
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {locale.name}
                    </span>
                  </SelectInput.Item>
                ))}
              </SelectInput.Group>
            </SelectInput.Content>
          </SelectInput.Root>

          <Text
            asChild
            className="py-2 px-3 bg-gray-50 rounded-md font-semibold text-gray-900 capitalize transition-colors hover:bg-gray-200 focus:ring-2 ring-gray-900 text-sm sm:text-base sm:py-2 sm:px-4"
          >
            <Link href="/accounts/login">Sign in</Link>
          </Text>
        </div>
      </div>
    </header>
  )
}
