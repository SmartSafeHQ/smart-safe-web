export interface StableCoinsSettings {
  symbol: string
  networkName: string
  networkType: 'solana' | 'evm' | 'bitcoin'
  avatar: string
  chainId: number | null
  decimals: number
  rpcUrl: string
  explorerUrl: string
  scanUrl: string
  parityCurrencySymbol: string
  contractAddress: string
  contractName: string
}

const TESTNET_STABLE_COINS_ATTRIBUTES: StableCoinsSettings[] = [
  {
    symbol: 'ibrl',
    networkName: 'polygon',
    networkType: 'evm',
    avatar: '/networks/ibrl-logo.svg',
    chainId: 80001,
    decimals: 18,
    contractName: 'ibrl',
    contractAddress: '0x78487e03f5e30aA3B6F72105cE247dEC80554418',
    parityCurrencySymbol: 'brl',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/',
    scanUrl: `https://api-testnet.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  },
  {
    symbol: 'ieur',
    networkName: 'polygon',
    networkType: 'evm',
    avatar: '/networks/ieur-logo.svg',
    chainId: 80001,
    decimals: 18,
    contractName: 'ieur',
    contractAddress: '0xa59f1Ad80e774e00dFb0cebdD70CB9A224b2d6E7',
    parityCurrencySymbol: 'eur',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/',
    scanUrl: `https://api-testnet.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  }
]

const MAINNET_STABLE_COINS_ATTRIBUTES: StableCoinsSettings[] = [
  {
    symbol: 'ibrl',
    networkName: 'polygon',
    networkType: 'evm',
    avatar: '/networks/ibrl-logo.svg',
    chainId: 80001,
    decimals: 18,
    contractName: 'ibrl',
    contractAddress: '0x78487e03f5e30aA3B6F72105cE247dEC80554418',
    parityCurrencySymbol: 'brl',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/',
    scanUrl: `https://api-testnet.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  },
  {
    symbol: 'ieur',
    networkName: 'polygon',
    networkType: 'evm',
    avatar: '/networks/ieur-logo.svg',
    chainId: 80001,
    decimals: 18,
    contractName: 'ieur',
    contractAddress: '0xa59f1Ad80e774e00dFb0cebdD70CB9A224b2d6E7',
    parityCurrencySymbol: 'eur',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/',
    scanUrl: `https://api-testnet.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  }
]

const NETWORKS_STABLE_COINS_ATTRIBUTES = new Map([
  ['production', TESTNET_STABLE_COINS_ATTRIBUTES],
  ['development', MAINNET_STABLE_COINS_ATTRIBUTES]
])

export const STABLE_COINS_ATTRIBUTES =
  NETWORKS_STABLE_COINS_ATTRIBUTES.get(
    process.env.NEXT_PUBLIC_ENV ?? 'production'
  ) ?? MAINNET_STABLE_COINS_ATTRIBUTES
