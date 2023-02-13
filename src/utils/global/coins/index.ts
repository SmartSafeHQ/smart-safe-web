export const DEFAULT_COINS_ATTRIBUTES = [
  {
    symbol: 'matic',
    network: 'maticmum',
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
    chainId: 97,
    decimals: 18,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    explorerUrl: 'https://testnet.bscscan.com'
  }
]

export function getCoinPriceUrl(coin: string, currency = 'usdt') {
  return `https://api.binance.us/api/v3/ticker/price?symbol=${coin.toUpperCase()}${currency.toUpperCase()}`
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
