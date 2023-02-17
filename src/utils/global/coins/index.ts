import dayjs from 'dayjs'

export const DEFAULT_COINS_ATTRIBUTES = [
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

export function getCoinPriceUrl(coin: string, currency = 'usdt') {
  return `https://api.binance.us/api/v3/ticker/price?symbol=${coin.toUpperCase()}${currency.toUpperCase()}`
}

const coingeckoCoinsIdMap = new Map([
  ['matic', 'matic-network'],
  ['bnb', 'binancecoin']
])

export function getCoinWindowPriceUrl(coin: string, date: Date) {
  const coinId = coingeckoCoinsIdMap.get(coin)

  if (!coinId) return

  const formattedDate = dayjs(date).format('DD-MM-YYYY')

  return `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${formattedDate}`
}

export function getCoinChangePercentUrl(
  coin: string,
  period = '24hr',
  currency = 'usdt'
) {
  return `https://api.binance.com/api/v3/ticker/${period}?symbol=${coin.toUpperCase()}${currency.toUpperCase()}`
}

// coins amount in usd
export function getCoinAmountInUsd(amountInCoins: number, usdPerCoin: number) {
  return amountInCoins * usdPerCoin
}

// usd amount in converted into coin exchange rate
export function getUsdAmountInCoinExchangeRate(
  amountInUsd: number,
  usdPerCoin: number
) {
  return amountInUsd / usdPerCoin
}

export function getTransactionTimestampDate(timeStamp: string) {
  return new Date(Number(timeStamp) * 1000)
}

export function getWeiToCoinValue(valueInWei: string, coinDecimals = 18) {
  return Number(valueInWei) / Math.pow(10, coinDecimals)
}

interface FormatToCurrencyProps extends Intl.NumberFormatOptions {
  floatAmount: number
  locale?: string
}

export function formatToCurrency({
  floatAmount,
  locale = 'en-US',
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  ...props
}: FormatToCurrencyProps) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    ...props
  }).format(floatAmount)
}
