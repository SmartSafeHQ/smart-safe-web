export interface CoinProps {
  symbol: string
  avatar: string
  chainId: number | null
  decimals: number
  rpcUrl: string
  explorerUrl: string
}

export interface AmountInputType {
  symbol: 'usd' | string
  defaultValue: string
  decimals: number
  convertCoins: (_amount: number, _usdPerCoin: number) => number
  currency?: string
  reverseSymbol?: string
}

export interface TransactionProps {
  usdAmount: number
  coinAmount: number
  to: string
}

export interface HandleSendTransactionProps {
  chainId: number | null
  rpcUrl: string
  symbol: string
  amount: number
  to: string
}
