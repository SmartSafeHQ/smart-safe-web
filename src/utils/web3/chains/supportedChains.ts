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
    symbol: 'CELO',
    networkName: 'Celo Testnet',
    icon: '/networks/celo-logo.svg',
    chainId: '0xaef3',
    hexColor: '#fcff52',
    rpcUrl: 'https://alfajores-forno.celo-testnet.org/',
    explorerUrl: 'https://alfajores-blockscout.celo-testnet.org',
    scanUrl: 'https://explorer.celo.org/alfajores/api'
  },
  {
    symbol: 'AVAX',
    networkName: 'Avalanche Testnet',
    icon: '/networks/avalanche-logo.svg',
    chainId: '0xa869',
    hexColor: '#e84142',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    explorerUrl: 'https://testnet.snowtrace.io',
    scanUrl: `https://api-testnet.snowtrace.io/api?apiKey=${process.env.NEXT_PUBLIC_AVAX_SCAN_API_KEY}`
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
  },
  {
    symbol: 'XDC',
    networkName: 'XDC Testnet',
    icon: '/networks/xdc-logo.svg',
    chainId: '0x33',
    hexColor: '#9ff3ff',
    rpcUrl: 'https://rpc.apothem.network/',
    explorerUrl: 'https://explorer.apothem.network',
    scanUrl: ''
  },
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
    symbol: 'MATIC',
    networkName: 'Polygon',
    icon: '/networks/polygon-logo.svg',
    chainId: '0x89',
    hexColor: '#8247e5',
    rpcUrl: 'https://polygon-rpc.com/',
    explorerUrl: 'https://polygonscan.com',
    scanUrl: `https://api.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  },
  {
    symbol: 'BNB',
    networkName: 'BNB Smart Chain',
    icon: '/networks/bnb-logo.svg',
    chainId: '0x38',
    hexColor: '#fbdc45',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    explorerUrl: 'https://bscscan.com',
    scanUrl: `https://api.bscscan.com/api?apiKey=${process.env.NEXT_PUBLIC_BNB_SCAN_API_KEY}`
  },
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
