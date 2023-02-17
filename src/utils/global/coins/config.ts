const TESTNET_COINS_ATTRIBUTES = [
  {
    symbol: 'matic',
    network: 'matic',
    avatar:
      'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/matic.svg',
    chainId: 80001,
    decimals: 18,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/',
    scanUrl: `https://api-testnet.polygonscan.com/api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  },
  {
    symbol: 'bnb',
    network: 'binance smart chain',
    avatar:
      'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/binanceCoin.svg',
    chainId: 97,
    decimals: 18,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    explorerUrl: 'https://testnet.bscscan.com',
    scanUrl: `https://api-testnet.bscscan.com/api?apiKey=${process.env.NEXT_PUBLIC_BNB_SCAN_API_KEY}`
  },
  {
    symbol: 'celo',
    network: 'celo',
    avatar:
      'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/celo.svg',
    chainId: 44787,
    decimals: 18,
    rpcUrl: 'https://alfajores-forno.celo-testnet.org/',
    explorerUrl: 'https://alfajores-blockscout.celo-testnet.org/',
    scanUrl: `https://explorer.celo.org/alfajores/api`
  },
  {
    symbol: 'avax',
    network: 'Avalanche',
    avatar:
      'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/avalanche.svg',
    chainId: 43113,
    decimals: 18,
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    explorerUrl: 'https://testnet.snowtrace.io/',
    scanUrl: `https://api-testnet.snowtrace.io/api?apiKey=${process.env.NEXT_PUBLIC_AVAX_SCAN_API_KEY}`
  },
  {
    symbol: 'ETH',
    network: 'ethereum',
    avatar:
      'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/ethereum.svg',
    chainId: 5,
    decimals: 18,
    rpcUrl: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    explorerUrl: 'https://goerli.etherscan.io/',
    scanUrl: `https://api-goerli.etherscan.io/api?apiKey=${process.env.NEXT_PUBLIC_ETH_SCAN_API_KEY}`
  }
]

const MAINNET_COINS_ATTRIBUTES = [
  {
    symbol: 'matic',
    network: 'matic',
    avatar:
      'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/matic.svg',
    chainId: 137,
    decimals: 18,
    rpcUrl: 'https://polygon-rpc.com/',
    explorerUrl: 'https://polygonscan.com/',
    scanUrl: `https://api.polygonscan.com//api?apiKey=${process.env.NEXT_PUBLIC_POLYGON_SCAN_API_KEY}`
  },
  {
    symbol: 'bnb',
    network: 'binance smart chain',
    avatar:
      'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/binanceCoin.svg',
    chainId: 56,
    decimals: 18,
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    explorerUrl: 'https://bscscan.com/',
    scanUrl: `https://api.bscscan.com/api?apiKey=${process.env.NEXT_PUBLIC_BNB_SCAN_API_KEY}`
  },
  {
    symbol: 'celo',
    network: 'celo',
    avatar:
      'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/celo.svg',
    chainId: 42220,
    decimals: 18,
    rpcUrl: 'https://forno.celo.org/',
    explorerUrl: 'https://explorer.celo.org/',
    scanUrl: `https://explorer.celo.org/mainnet/api`
  },
  {
    symbol: 'avax',
    network: 'Avalanche',
    avatar:
      'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/avalanche.svg',
    chainId: 43114,
    decimals: 18,
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorerUrl: 'https://snowtrace.io/',
    scanUrl: `https://api.snowtrace.io/api?apiKey=${process.env.NEXT_PUBLIC_AVAX_SCAN_API_KEY}`
  },
  {
    symbol: 'ETH',
    network: 'ethereum',
    avatar:
      'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/ethereum.svg',
    chainId: 1,
    decimals: 18,
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_ETH_RPC_API_KEY}`,
    explorerUrl: 'https://etherscan.io',
    scanUrl: `https://api.etherscan.io/api?apiKey=${process.env.NEXT_PUBLIC_ETH_SCAN_API_KEY}`
  }
]

console.log(process?.env?.NEXT_PUBLIC_ENV)

const NETWORKS_COINS_ATTRIBUTES = new Map([
  ['production', MAINNET_COINS_ATTRIBUTES],
  ['development', TESTNET_COINS_ATTRIBUTES]
])

export const COINS_ATTRIBUTES =
  NETWORKS_COINS_ATTRIBUTES.get(
    process?.env?.NEXT_PUBLIC_ENV ?? 'production'
  ) ?? MAINNET_COINS_ATTRIBUTES
