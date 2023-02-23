import { supportedLocales } from '@utils/global/constants/i18n'

export const header = {
  internationalization: {
    name: 'Local',
    options: [
      {
        id: supportedLocales.en,
        name: 'Inglês',
        slug: 'en-US'
      },
      {
        id: supportedLocales.pt,
        name: 'Português',
        slug: 'pt-BR'
      }
    ]
  },
  myProfile: 'meu perfil',
  theme: 'tema',
  dark: 'escuro',
  light: 'claro',
  helpCenter: 'centro de ajuda',
  logout: 'sair'
}
