import { useRouter } from 'next/router'

import { locales } from '../locales'

import {
  SupportedLanguages,
  i18nLocales,
  NEXT_LOCALE_COOKIE_MAX_AGE
} from '../utils/global/constants/i18n'

export const useI18n = () => {
  const { push, pathname, asPath, query, locale } = useRouter()

  function handleLanguageSwitch(localeId: SupportedLanguages) {
    document.cookie = `NEXT_LOCALE=${localeId}; max-age=${NEXT_LOCALE_COOKIE_MAX_AGE}; path=/`

    push({ pathname, query }, asPath, { locale: localeId })
  }

  const currentLocaleProps = i18nLocales[(locale as SupportedLanguages) ?? 'pt']
  const t = locales[(locale as SupportedLanguages) ?? 'pt']

  return {
    t,
    currentLocaleProps,
    handleLanguageSwitch
  }
}
