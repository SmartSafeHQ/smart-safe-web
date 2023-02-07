export const ACCEPTED_COINS_LIST = [
  {
    id: 'matic',
    name: 'matic',
    avatar:
      'https://token.metaswap.codefi.network/assets/nativeCurrencyLogos/matic.svg',
    chainId: 80001,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/'
  }
]

export function getTokenPriceUrl(coin: string, currency: string) {
  return `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${currency}`
}
