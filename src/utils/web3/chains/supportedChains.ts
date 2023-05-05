export interface ChainSettings {
  symbol: string
  networkName: string
  icon: string
  chainId: string
  hexColor: string
  rpcUrl: string
  explorerUrl: string
  scanUrl: string
}

const TESTNET_CHAINS_ATTRIBUTES: ChainSettings[] = [
  {
    symbol: 'celo',
    networkName: 'celo',
    icon: '/networks/celo-logo.svg',
    chainId: '0xaef3',
    hexColor: '#fcff52',
    rpcUrl: 'https://alfajores-forno.celo-testnet.org/',
    explorerUrl: 'https://alfajores-blockscout.celo-testnet.org/',
    scanUrl: 'https://explorer.celo.org/alfajores/api'
  },
  {
    symbol: 'avax',
    networkName: 'avalanche',
    icon: '/networks/avalanche-logo.svg',
    chainId: '0xa869',
    hexColor: '#e84142',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    explorerUrl: 'https://testnet.snowtrace.io/',
    scanUrl: `https://api-testnet.snowtrace.io/api?apiKey=${process.env.NEXT_PUBLIC_AVAX_SCAN_API_KEY}`
  },
  {
    symbol: 'matic',
    networkName: 'polygon',
    icon: '/networks/polygon-logo.svg',
    chainId: '0x13881',
    hexColor: '#8247e5',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/',
    scanUrl: `https://api-testnet.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  },
  {
    symbol: 'bnb',
    networkName: 'bnb',
    icon: '/networks/bnb-logo.svg',
    chainId: '0x61',
    hexColor: '#fbdc45',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    explorerUrl: 'https://testnet.bscscan.com',
    scanUrl: `https://api-testnet.bscscan.com/api?apiKey=${process.env.NEXT_PUBLIC_BNB_SCAN_API_KEY}`
  },
  {
    symbol: 'eth',
    networkName: 'ethereum',
    icon: '/networks/eth-logo.svg',
    chainId: '0x1',
    hexColor: '#464a76',
    rpcUrl: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    explorerUrl: 'https://goerli.etherscan.io/',
    scanUrl: `https://api-goerli.etherscan.io/api?apiKey=${process.env.NEXT_PUBLIC_ETH_SCAN_API_KEY}`
  }
]

const MAINNET_CHAINS_ATTRIBUTES: ChainSettings[] = [
  {
    symbol: 'matic',
    networkName: 'polygon',
    icon: '/networks/polygon-logo.svg',
    chainId: '0x89',
    hexColor: '#8247e5',
    rpcUrl: 'https://polygon-rpc.com/',
    explorerUrl: 'https://polygonscan.com/',
    scanUrl: `https://api.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  },
  {
    symbol: 'bnb',
    networkName: 'binance smart chain',
    icon: '/networks/bnb-logo.svg',
    chainId: '0x38',
    hexColor: '#fbdc45',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    explorerUrl: 'https://bscscan.com/',
    scanUrl: `https://api.bscscan.com/api?apiKey=${process.env.NEXT_PUBLIC_BNB_SCAN_API_KEY}`
  },
  {
    symbol: 'celo',
    networkName: 'celo',
    icon: '/networks/celo-logo.svg',
    chainId: '0xa4ec',
    hexColor: '#fcff52',
    rpcUrl: 'https://forno.celo.org/',
    explorerUrl: 'https://explorer.celo.org/',
    scanUrl: 'https://explorer.celo.org/mainnet/api'
  },
  {
    symbol: 'avax',
    networkName: 'avalanche',
    icon: '/networks/avalanche-logo.svg',
    chainId: '0xa86a',
    hexColor: '#e84142',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorerUrl: 'https://snowtrace.io/',
    scanUrl: `https://api.snowtrace.io/api?apiKey=${process.env.NEXT_PUBLIC_AVAX_SCAN_API_KEY}`
  },
  {
    symbol: 'eth',
    networkName: 'ethereum',
    icon: '/networks/eth-logo.svg',
    chainId: '0x5',
    hexColor: '#464a76',
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_ETH_RPC_API_KEY}`,
    explorerUrl: 'https://etherscan.io',
    scanUrl: `https://api.etherscan.io/api?apiKey=${process.env.NEXT_PUBLIC_ETH_SCAN_API_KEY}`
  }
]

const NETWORKS_CHAINS_ATTRIBUTES = new Map([
  ['production', MAINNET_CHAINS_ATTRIBUTES],
  ['development', TESTNET_CHAINS_ATTRIBUTES]
])

export const CHAINS_ATTRIBUTES =
  NETWORKS_CHAINS_ATTRIBUTES.get(process.env.NEXT_PUBLIC_ENV ?? 'production') ??
  MAINNET_CHAINS_ATTRIBUTES
