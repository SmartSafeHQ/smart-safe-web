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
    symbol: 'OKT',
    networkName: 'OKT Chain Testnet',
    icon: '/networks/okt-logo.svg',
    chainId: '0x41',
    hexColor: '#e5e7eb',
    rpcUrl: 'https://exchaintestrpc.okex.org/',
    explorerUrl: 'https://www.oklink.com/okexchain-test',
    scanUrl: 'https://www.oklink.com/api/v5/explorer/'
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
    symbol: 'ETH',
    networkName: 'Ethereum Sepolia Testnet',
    icon: '/networks/eth-logo.svg',
    chainId: '0xaa36a7',
    hexColor: '#464a76',
    rpcUrl: 'https://rpc2.sepolia.org',
    explorerUrl: 'https://sepolia.etherscan.io',
    scanUrl: `https://api-goerli.etherscan.io/api?apiKey=${process.env.NEXT_PUBLIC_ETH_SCAN_API_KEY}`
  }
]

const MAINNET_CHAINS_ATTRIBUTES: ChainSettings[] = [
  {
    symbol: 'OKT',
    networkName: 'OKT Chain',
    icon: '/networks/okt-logo.svg',
    chainId: '0x42',
    hexColor: '#e5e7eb',
    rpcUrl: 'https://exchainrpc.okex.org/',
    explorerUrl: 'https://www.oklink.com/okexchain',
    scanUrl: 'https://www.oklink.com/api/v5/explorer/'
  },
  {
    symbol: 'ETH',
    networkName: 'Ethereum',
    icon: '/networks/eth-logo.svg',
    chainId: '0x1',
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
