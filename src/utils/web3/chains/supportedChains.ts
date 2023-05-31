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
    networkName: 'OKT Chain Testnet',
    icon: '/networks/okt-logo.svg',
    chainId: '0x41',
    hexColor: '#e5e7eb',
    rpcUrl: 'https://exchaintestrpc.okex.org/',
    explorerUrl: 'https://www.oklink.com/okexchain-test',
    scanUrl: 'https://www.oklink.com/api/v5/explorer/'
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

const NETWORKS_CHAINS_ATTRIBUTES = new Map([
  ['production', MAINNET_CHAINS_ATTRIBUTES],
  ['development', TESTNET_CHAINS_ATTRIBUTES]
])

export const CHAINS_ATTRIBUTES =
  NETWORKS_CHAINS_ATTRIBUTES.get(process.env.NEXT_PUBLIC_ENV ?? 'production') ??
  MAINNET_CHAINS_ATTRIBUTES
