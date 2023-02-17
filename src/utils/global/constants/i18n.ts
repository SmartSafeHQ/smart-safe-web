export type SupportedLanguages = 'pt' | 'en'

interface i18nLocalesProps {
  id: SupportedLanguages
  name: string
  slug: string
}

export const NEXT_LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 60 // 60 days
export const supportedLocales: {
  [key in SupportedLanguages]: key
} = {
  pt: 'pt',
  en: 'en'
}

export const i18nLocales = {
  pt: {
    id: supportedLocales.pt,
    name: 'português',
    slug: 'pt-BR'
  },
  en: {
    id: supportedLocales.en,
    name: 'english',
    slug: 'en-US'
  }
}

export const i18nLocalesMap = new Map<SupportedLanguages, i18nLocalesProps>([
  ['pt', i18nLocales.pt],
  ['en', i18nLocales.en]
])
