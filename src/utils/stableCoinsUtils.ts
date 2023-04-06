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
    contractAddress: '0x78487e03f5e30aA3B6F72105cE247dEC80554418',
    contractName: 'IBRL',
    networkRpcUrl: ''
  },
  {
    avatar: '/networks/ibrl-logo.svg',
    symbol: 'IEUR',
    parityCurrencySymbol: 'EUR',
    contractAddress: '0xa59f1Ad80e774e00dFb0cebdD70CB9A224b2d6E7',
    contractName: 'IEUR',
    networkRpcUrl: ''
  }
]
