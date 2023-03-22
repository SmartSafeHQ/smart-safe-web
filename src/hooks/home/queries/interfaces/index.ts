import type { ParsedTransactionWithMeta } from '@solana/web3.js'
import type { SupportedNetworks, WalletKeypair } from '@utils/global/types'

export interface TransactionCoinProps {
  scanUrl: string
  explorerUrl: string
  symbol: string
  avatar: string
  decimals: number
  rpcUrl: string
  networkType: SupportedNetworks
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
    networkType: SupportedNetworks
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

export type ParsedLamportTransfer =
  | {
      originalData: ParsedTransactionWithMeta
      parsedData: {
        amount: string
        receiver: string
        sender: string
        transactedAt: Date
      }
    }
  | undefined

export type ParsedLamportTransferWithType =
  | (ParsedLamportTransfer & {
      parsedData: {
        category: 'debit' | 'credit'
      }
    })
  | undefined

export type ParsedLamportTransferWithHash =
  | (ParsedLamportTransferWithType & {
      parsedData: { transactionLink: string }
    })
  | undefined

export type ParsedLamportTransferWithTokenInfo =
  | (ParsedLamportTransferWithHash & {
      parsedData: {
        token: {
          symbol: string
          avatar: string
          networkType: SupportedNetworks
        }
      }
    })
  | undefined
