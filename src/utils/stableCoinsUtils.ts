export type CurrencySymbol = 'USD' | 'BRL' | 'EUR'
export type TokenSymbol = 'IUSD' | 'IBRL' | 'IEUR'

interface CurrencyProps {
  symbol: CurrencySymbol
  currency: string
  avatar: string
}

interface TokenProps {
  symbol: TokenSymbol
  avatar: string
  parityCurrencySymbol: CurrencySymbol
  contractAddress: string
  contractName: string
  networkRpcUrl: string
}

export const ACCEPTED_CURRENCIES: CurrencyProps[] = [
  { symbol: 'BRL', currency: 'R$', avatar: '/languages/br.svg' },
  { symbol: 'USD', currency: '$', avatar: '/languages/us.svg' },
  { symbol: 'EUR', currency: '€', avatar: '/languages/eur.svg' }
]

export const ACCEPTED_TOKENS: TokenProps[] = [
  {
    avatar: '/networks/ibrl-logo.svg',
    symbol: 'IBRL',
    parityCurrencySymbol: 'BRL',
    contractAddress: '',
    contractName: '',
    networkRpcUrl: ''
  },
  {
    avatar: '/networks/ibrl-logo.svg',
    symbol: 'IEUR',
    parityCurrencySymbol: 'EUR',
    contractAddress: '',
    contractName: '',
    networkRpcUrl: ''
  }
]
