export const DEFAULT_COINS_ATTRIBUTES = [
  {
    symbol: 'matic',
    network: 'polygon',
    avatar:
      'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/matic.svg',
    chainId: 80001,
    decimals: 18,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/'
  },
  {
    symbol: 'bnb',
    network: 'binance smart chain',
    avatar:
      'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/binanceCoin.svg',
    chainId: 56,
    decimals: 18,
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    explorerUrl: 'https://bscscan.com/'
  }
]

export function getCoinPriceUrl(coin: string, currency: string) {
  return `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${currency}`
}

export function getCoinChangePercentUrl(coin: string, period = '24hr') {
  return `https://api.binance.com/api/v1/ticker/${period}?symbol=${coin}USDT`
}
