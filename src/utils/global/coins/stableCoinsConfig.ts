export type StableCoinsSymbols = 'IUSD' | 'IBRL' | 'IEUR'
export type CurrencySymbols = 'USD' | 'BRL' | 'EUR'

export interface StableCoinsProps {
  symbol: StableCoinsSymbols
  networkName: string
  networkType: 'solana' | 'evm' | 'bitcoin'
  avatar: string
  chainId: number | null
  decimals: number
  rpcUrl: string
  explorerUrl: string
  scanUrl: string
  parityCurrencySymbol: CurrencySymbols
  contractAddress: string
  contractName: string
}

const TESTNET_STABLE_COINS: StableCoinsProps[] = [
  {
    symbol: 'IBRL',
    networkName: 'polygon',
    networkType: 'evm',
    avatar: '/networks/ibrl-logo.svg',
    chainId: 80001,
    decimals: 18,
    contractName: 'ibrl',
    contractAddress: '0x78487e03f5e30aA3B6F72105cE247dEC80554418',
    parityCurrencySymbol: 'BRL',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/',
    scanUrl: `https://api-testnet.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  },
  {
    symbol: 'IEUR',
    networkName: 'polygon',
    networkType: 'evm',
    avatar: '/networks/ieur-logo.svg',
    chainId: 80001,
    decimals: 18,
    contractName: 'ieur',
    contractAddress: '0xa59f1Ad80e774e00dFb0cebdD70CB9A224b2d6E7',
    parityCurrencySymbol: 'EUR',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/',
    scanUrl: `https://api-testnet.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  }
]

const MAINNET_STABLE_COINS: StableCoinsProps[] = [
  {
    symbol: 'IBRL',
    networkName: 'polygon',
    networkType: 'evm',
    avatar: '/networks/ibrl-logo.svg',
    chainId: 80001,
    decimals: 18,
    contractName: 'ibrl',
    contractAddress: '0x78487e03f5e30aA3B6F72105cE247dEC80554418',
    parityCurrencySymbol: 'BRL',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/',
    scanUrl: `https://api-testnet.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  },
  {
    symbol: 'IEUR',
    networkName: 'polygon',
    networkType: 'evm',
    avatar: '/networks/ieur-logo.svg',
    chainId: 80001,
    decimals: 18,
    contractName: 'ieur',
    contractAddress: '0xa59f1Ad80e774e00dFb0cebdD70CB9A224b2d6E7',
    parityCurrencySymbol: 'EUR',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/',
    scanUrl: `https://api-testnet.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  }
]

const NETWORKS_STABLE_COINS = new Map([
  ['production', TESTNET_STABLE_COINS],
  ['development', MAINNET_STABLE_COINS]
])

export const STABLE_COINS =
  NETWORKS_STABLE_COINS.get(process.env.NEXT_PUBLIC_ENV ?? 'production') ??
  MAINNET_STABLE_COINS
