import { Globe, Check } from 'phosphor-react'
import clsx from 'clsx'

import { Collapsible } from '@components/Collapsible'
import { Text } from '@components/Text'

import { useI18n } from '@hooks/useI18n'

export function DropdownLocales() {
  const { t, currentLocaleProps, handleLanguageSwitch } = useI18n()

  return (
    <Collapsible.Root className="flex-1">
      <Collapsible.Trigger>
        <div
          className={clsx(
            'relative flex items-center justify-start gap-4 pl-6 py-3 select-none outline-none text-base font-medium capitalize dark:text-cyan-50 cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-900'
          )}
        >
          <Globe className="w-5 h-5 text-cyan-500" />

          <div>
            {t.header.internationalization.name}:
            <Text className="lowercase ml-1">{currentLocaleProps.name}</Text>
          </div>
        </div>
      </Collapsible.Trigger>

      <Collapsible.Content className="w-full flex flex-col gap-3">
        {t.header.internationalization.options.map(locale => (
          <button
            key={locale.id}
            className="w-full flex justify-start items-center relative pl-[3.75rem] transition-colors hover:brightness-90 hover:text-cyan-500 disabled:text-gray-300 disabled:hover:brightness-100"
            disabled={locale.id === currentLocaleProps.id}
            onClick={() => handleLanguageSwitch(locale.id)}
          >
            {locale.id === currentLocaleProps.id && (
              <Check weight="bold" className="absolute left-6" />
            )}
            {locale.name} ({locale.slug})
          </button>
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
