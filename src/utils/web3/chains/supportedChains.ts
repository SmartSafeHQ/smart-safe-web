export interface ChainSettings {
  symbol: string
  networkName: string
  icon: string
  chainId: string
  hexColor: string
  rpcUrl: string
  explorerUrl: string
  scanUrl: string
  faucetUrl?: string
}

const TESTNET_CHAINS_ATTRIBUTES: ChainSettings[] = [
  {
    symbol: 'ETH',
    networkName: 'Ethereum Sepolia Testnet',
    icon: '/networks/eth-logo.svg',
    chainId: '0xaa36a7',
    hexColor: '#464a76',
    rpcUrl: 'https://rpc2.sepolia.org',
    explorerUrl: 'https://sepolia.etherscan.io',
    faucetUrl: 'https://sepoliafaucet.com',
    scanUrl: `https://api-goerli.etherscan.io/api?apiKey=${process.env.NEXT_PUBLIC_ETH_SCAN_API_KEY}`
  },
  {
    symbol: 'MATIC',
    networkName: 'Polygon Testnet',
    icon: '/networks/polygon-logo.svg',
    chainId: '0x13881',
    hexColor: '#8247e5',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com',
    faucetUrl: 'https://faucet.polygon.technology/',
    scanUrl: `https://api-testnet.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  },
  {
    symbol: 'BNB',
    networkName: 'BNB Smart Chain Testnet',
    icon: '/networks/bnb-logo.svg',
    chainId: '0x61',
    hexColor: '#fbdc45',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    explorerUrl: 'https://testnet.bscscan.com',
    faucetUrl: 'https://testnet.bnbchain.org/faucet-smart',
    scanUrl: `https://api-testnet.bscscan.com/api?apiKey=${process.env.NEXT_PUBLIC_BNB_SCAN_API_KEY}`
  }
]

const MAINNET_CHAINS_ATTRIBUTES: ChainSettings[] = [
  {
    symbol: 'ETH',
    networkName: 'Ethereum Sepolia Testnet',
    icon: '/networks/eth-logo.svg',
    chainId: '0xaa36a7',
    hexColor: '#464a76',
    rpcUrl: 'https://rpc2.sepolia.org',
    explorerUrl: 'https://sepolia.etherscan.io',
    scanUrl: `https://api-goerli.etherscan.io/api?apiKey=${process.env.NEXT_PUBLIC_ETH_SCAN_API_KEY}`
  },
  {
    symbol: 'MATIC',
    networkName: 'Polygon Testnet',
    icon: '/networks/polygon-logo.svg',
    chainId: '0x13881',
    hexColor: '#8247e5',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com',
    scanUrl: `https://api-testnet.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  },
  {
    symbol: 'BNB',
    networkName: 'BNB Smart Chain Testnet',
    icon: '/networks/bnb-logo.svg',
    chainId: '0x61',
    hexColor: '#fbdc45',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    explorerUrl: 'https://testnet.bscscan.com',
    scanUrl: `https://api-testnet.bscscan.com/api?apiKey=${process.env.NEXT_PUBLIC_BNB_SCAN_API_KEY}`
  }
]

const NETWORKS_CHAINS_ATTRIBUTES = new Map([
  ['production', MAINNET_CHAINS_ATTRIBUTES],
  ['development', TESTNET_CHAINS_ATTRIBUTES]
])

export const CHAINS_ATTRIBUTES =
  NETWORKS_CHAINS_ATTRIBUTES.get(process.env.NEXT_PUBLIC_ENV ?? 'production') ??
  MAINNET_CHAINS_ATTRIBUTES
