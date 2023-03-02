import type { WalletKeypair } from '@utils/global/types'

export interface TransactionCoinProps {
  scanUrl: string
  explorerUrl: string
  symbol: string
  avatar: string
  decimals: number
}

export interface TransactionProps {
  transactionLink: string
  transactedAt: Date
  category: 'debit' | 'credit'
  sender: string
  receiver: string
  token: {
    symbol: string
    avatar: string
  }
  value: {
    valueInDollar: number
    valueInTokens: number
  }
}

export interface FetchAllNetworksTransactionsInput {
  coins?: TransactionCoinProps[]
  accounts?: {
    solana: WalletKeypair
    evm: WalletKeypair
  }
}

export interface GetNetworkTrasactionResponse {
  result: {
    timeStamp: string
    hash: string
    from: string
    to: string
    value: string
  }[]
}

export interface GetCoinWindowPriceResponse {
  market_data: {
    current_price: {
      usd: number
    }
  }
}

export type FetchAllNetworksTransactionsResponse = {
  transactions: TransactionProps[]
  totalCount: number
}
