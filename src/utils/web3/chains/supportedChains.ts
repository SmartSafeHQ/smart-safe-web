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
    networkName: 'celo testnet',
    icon: '/networks/celo-logo.svg',
    chainId: '0xaef3',
    hexColor: '#fcff52',
    rpcUrl: 'https://alfajores-forno.celo-testnet.org/',
    explorerUrl: 'https://alfajores-blockscout.celo-testnet.org/',
    scanUrl: 'https://explorer.celo.org/alfajores/api'
  },
  {
    symbol: 'avax',
    networkName: 'avalanche testnet',
    icon: '/networks/avalanche-logo.svg',
    chainId: '0xa869',
    hexColor: '#e84142',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    explorerUrl: 'https://testnet.snowtrace.io/',
    scanUrl: `https://api-testnet.snowtrace.io/api?apiKey=${process.env.NEXT_PUBLIC_AVAX_SCAN_API_KEY}`
  },
  {
    symbol: 'matic',
    networkName: 'polygon testnet',
    icon: '/networks/polygon-logo.svg',
    chainId: '0x13881',
    hexColor: '#8247e5',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/',
    scanUrl: `https://api-testnet.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  },
  {
    symbol: 'bnb',
    networkName: 'binance smart chain testnet',
    icon: '/networks/bnb-logo.svg',
    chainId: '0x61',
    hexColor: '#fbdc45',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    explorerUrl: 'https://testnet.bscscan.com',
    scanUrl: `https://api-testnet.bscscan.com/api?apiKey=${process.env.NEXT_PUBLIC_BNB_SCAN_API_KEY}`
  },
  {
    symbol: 'xdc',
    networkName: 'XDC testnet',
    icon: '/networks/xdc-logo.svg',
    chainId: '0x33',
    hexColor: '#9ff3ff',
    rpcUrl: 'https://rpc.apothem.network/',
    explorerUrl: 'https://explorer.xinfin.network/',
    scanUrl: ''
  },
  {
    symbol: 'okb',
    networkName: 'OKT testnet',
    icon: '/networks/okt-logo.svg',
    chainId: '0xc3',
    hexColor: '#fff',
    rpcUrl: 'https://okbtestrpc.okbchain.org',
    explorerUrl: 'https://www.oklink.com/cn/okbc-test',
    scanUrl: 'https://www.oklink.com/api/v5/explorer/'
  },
  {
    symbol: 'eth',
    networkName: 'ethereum testnet',
    icon: '/networks/eth-logo.svg',
    chainId: '0xaa36a7',
    hexColor: '#464a76',
    rpcUrl: 'https://rpc2.sepolia.org',
    explorerUrl: 'https://sepolia.etherscan.io/',
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
    symbol: 'xdc',
    networkName: 'XDC',
    icon: '/networks/xdc-logo.svg',
    chainId: '0x32',
    hexColor: '#9ff3ff',
    rpcUrl: 'https://rpc.xinfin.network',
    explorerUrl: 'https://explorer.xinfin.network/',
    scanUrl: ''
  },
  // OBK currently doesn't have a mainnet
  {
    symbol: 'okb',
    networkName: 'OKT Chain',
    icon: '/networks/okt-logo.svg',
    chainId: '0xc3',
    hexColor: '#fff',
    rpcUrl: 'https://okbtestrpc.okbchain.org/v1',
    explorerUrl: 'https://www.oklink.com/cn/okbc-test',
    scanUrl: 'https://www.oklink.com/api/v5/explorer/'
  },
  {
    symbol: 'eth',
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
