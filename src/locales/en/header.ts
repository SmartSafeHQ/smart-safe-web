import { supportedLocales } from '@utils/global/constants/i18n'

export const header = {
  internationalization: {
    name: 'Location',
    options: [
      {
        id: supportedLocales.en,
        name: 'English',
        slug: 'en-US'
      },
      {
        id: supportedLocales.pt,
        name: 'Portuguese',
        slug: 'pt-BR'
      }
    ]
  },
  myProfile: 'my profile',
  theme: 'theme',
  dark: 'dark',
  light: 'light',
  helpCenter: 'help center',
  logout: 'logout'
}
