export interface NetworkSettings {
  symbol: string
  networkName: string
  icon: string
  chainId: string
  rpcUrl: string
  explorerUrl: string
}

const MAINNET_COINS_ATTRIBUTES: NetworkSettings[] = [
  {
    symbol: 'MATIC',
    networkName: 'Polygon',
    icon: '/networks/polygon-logo.svg',
    chainId: '0x89',
    rpcUrl: 'https://polygon-rpc.com/',
    explorerUrl: 'https://polygonscan.com/'
  },
  {
    symbol: 'BNB',
    networkName: 'Binance Smart Chain',
    icon: '/networks/bnb-logo.svg',
    chainId: '0x38',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    explorerUrl: 'https://bscscan.com/'
  },
  {
    symbol: 'CELO',
    networkName: 'Celo',
    icon: '/networks/celo-logo.svg',
    chainId: '0xa4ec',
    rpcUrl: 'https://forno.celo.org/',
    explorerUrl: 'https://explorer.celo.org/'
  },
  {
    symbol: 'AVAX',
    networkName: 'Avalanche',
    icon: '/networks/avalanche-logo.svg',
    chainId: '0xa86a',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorerUrl: 'https://snowtrace.io/'
  },
  {
    symbol: 'ETH',
    networkName: 'Ethereum',
    icon: '/networks/eth-logo.svg',
    chainId: '0x1',
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_ETH_RPC_API_KEY}`,
    explorerUrl: 'https://etherscan.io'
  },
  {
    symbol: 'ETH',
    networkName: 'Sepolia Testnet',
    icon: '/networks/eth-logo.svg',
    chainId: '0xaa36a7',
    rpcUrl: 'https://rpc2.sepolia.org',
    explorerUrl: 'https://sepolia.etherscan.io/'
  }
]

export const COINS_ATTRIBUTES = MAINNET_COINS_ATTRIBUTES
