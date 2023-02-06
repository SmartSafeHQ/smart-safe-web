export type SupportedLanguages = 'pt' | 'en'

export const NEXT_LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 60 // 60 days
export const supportedLocales: {
  [key in SupportedLanguages]: key
} = {
  pt: 'pt',
  en: 'en'
}

export const i18nLocales = {
  en: {
    id: supportedLocales.en,
    name: 'english',
    slug: 'en-US'
  },
  pt: {
    id: supportedLocales.pt,
    name: 'português',
    slug: 'pt-BR'
  }
}
