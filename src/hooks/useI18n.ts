import { useRouter } from 'next/router'

import { locales } from '../locales'
import { pt } from '../locales/pt'

import { AndroidInterface } from '@decorators/androidInterface'

import {
  SupportedLanguages,
  i18nLocales,
  i18nLocalesMap,
  NEXT_LOCALE_COOKIE_MAX_AGE
} from '../utils/global/constants/i18n'

export const useI18n = () => {
  const { push, pathname, asPath, query, locale } = useRouter()

  function handleLanguageSwitch(localeId: SupportedLanguages) {
    document.cookie = `NEXT_LOCALE=${localeId}; max-age=${NEXT_LOCALE_COOKIE_MAX_AGE}; path=/`

    AndroidInterface.localizable(localeId)

    push({ pathname, query }, asPath, { locale: localeId })
  }

  const currentLocaleProps =
    i18nLocalesMap.get((locale as SupportedLanguages) ?? 'pt') ?? i18nLocales.pt

  const t = locales.get(locale ?? 'pt') ?? pt

  return {
    t,
    currentLocaleProps,
    handleLanguageSwitch
  }
}
