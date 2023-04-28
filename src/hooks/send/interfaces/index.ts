import type { SupportedNetworks } from '@/utils/global/types'

export interface CoinProps {
  symbol: string
  avatar: string
  chainId: number | null
  decimals: number
  rpcUrl: string
  explorerUrl: string
  networkName: string
  networkType: SupportedNetworks
  contractAddress?: string
  contractName?: string
}

export interface FormData {
  sendWallet: string
  amount: string
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
  usdAmount: string
  coinAmount: number
  to: string
  formattedTo: string
  formattedCoinAmount: string
}

export interface HandleSendTransactionProps {
  chainId: number | null
  networkType: SupportedNetworks
  rpcUrl: string
  symbol: string
  amount: number
  to: string
}
