import { CurrencySymbols } from '@utils/global/coins/stableCoinsConfig'

interface CurrencyProps {
  symbol: CurrencySymbols
  currency: string
  avatar: string
}

export const ACCEPTED_CURRENCIES: CurrencyProps[] = [
  { symbol: 'BRL', currency: 'R$', avatar: '/languages/br.svg' },
  { symbol: 'USD', currency: '$', avatar: '/languages/us.svg' },
  { symbol: 'EUR', currency: '€', avatar: '/languages/eur.svg' }
]
