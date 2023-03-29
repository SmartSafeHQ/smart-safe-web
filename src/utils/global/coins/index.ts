import dayjs from 'dayjs'

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

export function getConvertCurrencyUrl(currency = 'USD', tsyms = 'BRL') {
  return `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=${tsyms}`
}
