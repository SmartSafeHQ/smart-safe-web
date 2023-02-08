export const DEFAULT_COINS_ATTRIBUTES = [
  {
    id: 'matic',
    name: 'matic',
    chainId: 80001,
    decimals: 10 ** 18,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/'
  }
]

export function getCoinPriceUrl(coin: string, currency: string) {
  return `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${currency}`
}
