import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'

import {
  getCoinWindowPriceUrl,
  getTransactionTimestampDate,
  getWeiToCoinValue
} from '@utils/global/coins'

import type { WalletKeypair } from '@utils/global/types'
import type {
  FetchAllNetworksTransactionsInput,
  FetchAllNetworksTransactionsResponse,
  GetCoinWindowPriceResponse,
  GetNetworkTrasactionResponse,
  TransactionProps,
  TransactionCoinProps,
  ParsedLamportTransfer,
  ParsedLamportTransferWithType,
  ParsedLamportTransferWithHash,
  ParsedLamportTransferWithTokenInfo
} from '@hooks/home/queries/interfaces'
import type {
  ParsedInstruction,
  ParsedTransactionWithMeta
} from '@solana/web3.js'

async function fetchAllNetworksTransactions({
  accounts,
  coins
}: FetchAllNetworksTransactionsInput): Promise<FetchAllNetworksTransactionsResponse> {
  if (!accounts?.evm.address || !accounts.solana.address) {
    throw new Error('account is required')
  }

  if (!coins) {
    throw new Error('coins are required')
  }

  const formattedTransactions: TransactionProps[] = []

  const transactionsPromise = coins.map(async coin => {
    if (coin.symbol === 'sol') {
      const walletAddress = new PublicKey(accounts.solana.address)

      const connection = new Connection(
        process.env.NODE_ENV === 'development'
          ? clusterApiUrl('testnet')
          : coin.rpcUrl
      )

      const transactions = await connection.getSignaturesForAddress(
        walletAddress
      )

      const parsedTransactions = await connection.getParsedTransactions(
        transactions.map(({ signature }) => signature)
      )

      const parseTransfers = (
        parsedTransaction: ParsedTransactionWithMeta | null
      ): ParsedLamportTransfer => {
        if (parsedTransaction) {
          const instuctionData = parsedTransaction.transaction.message
            .instructions[0] as ParsedInstruction
          const isLamportTransaction = instuctionData.parsed.type === 'transfer'

          if (isLamportTransaction) {
            const timestamp = getTransactionTimestampDate(
              String(parsedTransaction.blockTime)
            )
            const transactionData = instuctionData.parsed.info

            const transferData = {
              transactedAt: timestamp,
              sender: transactionData.source as string,
              receiver: transactionData.destination as string,
              amount: transactionData.lamports as string
            }

            return { originalData: parsedTransaction, parsedData: transferData }
          }
        }
      }

      const parseTransferType = (
        transferData: ParsedLamportTransfer
      ): ParsedLamportTransferWithType => {
        if (transferData) {
          const transferCategory =
            transferData.parsedData.sender.toLowerCase() ===
            accounts.solana.address.toLowerCase()
              ? 'debit'
              : 'credit'

          return {
            ...transferData,
            parsedData: {
              ...transferData.parsedData,
              category: transferCategory
            }
          }
        }
      }

      const parseTransactionHash = (
        transferData: ParsedLamportTransferWithType
      ): ParsedLamportTransferWithHash => {
        if (transferData) {
          const testnetSolanaCluster =
            process.env.NODE_ENV === 'development'
              ? '?cluster=testnet'
              : undefined

          return {
            ...transferData,
            parsedData: {
              ...transferData.parsedData,
              transactionLink: `${coin.explorerUrl}/tx/${transferData.originalData.transaction.signatures[0]}${testnetSolanaCluster}`
            }
          }
        }
      }

      const parseTransferTokenInfo = (
        transferData: ParsedLamportTransferWithHash
      ): ParsedLamportTransferWithTokenInfo => {
        if (transferData) {
          return {
            ...transferData,
            parsedData: {
              ...transferData.parsedData,
              token: {
                symbol: coin.symbol,
                avatar: coin.avatar,
                networkType: coin.networkType
              }
            }
          }
        }
      }

      const parseTransferAmounts = async (
        transferData: ParsedLamportTransferWithTokenInfo
      ): Promise<TransactionProps | undefined> => {
        if (transferData) {
          const coinWindowPriceUrl = getCoinWindowPriceUrl(
            coin.symbol,
            transferData.parsedData.transactedAt
          )

          let transactionUsdValue = 0

          if (coinWindowPriceUrl) {
            try {
              const { data } = await axios.get<GetCoinWindowPriceResponse>(
                coinWindowPriceUrl
              )

              transactionUsdValue = data.market_data.current_price.usd
            } catch (error) {
              console.log(error)
            }
          }

          return {
            ...transferData.parsedData,
            value: {
              valueInDollar: Number(transactionUsdValue.toFixed(2)),
              valueInTokens: getWeiToCoinValue(
                transferData.parsedData.amount,
                coin.decimals
              )
            }
          }
        }
      }

      const lamportTransfers = parsedTransactions
        .map(parseTransfers)
        .map(parseTransferType)
        .map(parseTransactionHash)
        .map(parseTransferTokenInfo)
        .map(parseTransferAmounts)

      const transfers = (await Promise.all(
        lamportTransfers
      )) as TransactionProps[]

      formattedTransactions.push(...transfers)

      return
    }

    if (coin.symbol === 'btc') return

    const { data } = await axios.get<GetNetworkTrasactionResponse>(
      coin.scanUrl,
      {
        params: {
          module: 'account',
          action: 'txlist',
          address: accounts.evm.address,
          page: 1,
          offset: 10,
          sort: 'desc'
        }
      }
    )

    const transactionsPromise = data.result.map<Promise<TransactionProps>>(
      async tx => {
        const transactedAt = getTransactionTimestampDate(tx.timeStamp)

        const coinWindowPriceUrl = getCoinWindowPriceUrl(
          coin.symbol,
          transactedAt
        )

        let transactionUsdValue = 0

        if (coinWindowPriceUrl) {
          try {
            const { data } = await axios.get<GetCoinWindowPriceResponse>(
              coinWindowPriceUrl
            )

            transactionUsdValue = data.market_data.current_price.usd
          } catch (error) {
            console.log(error)
          }
        }

        const txCategory =
          tx.from.toLowerCase() === accounts.evm.address.toLowerCase()
            ? 'debit'
            : 'credit'

        return {
          transactedAt,
          category: txCategory,
          transactionLink: `${coin.explorerUrl}/tx/${tx.hash}`,
          sender: tx.from,
          receiver: tx.to,
          token: {
            symbol: coin.symbol,
            avatar: coin.avatar,
            networkType: 'evm'
          },
          value: {
            valueInDollar: Number(transactionUsdValue.toFixed(2)),
            valueInTokens: getWeiToCoinValue(tx.value, coin.decimals)
          }
        }
      }
    )

    const transactions = await Promise.all(transactionsPromise)

    formattedTransactions.push(...transactions)
  })

  await Promise.all(transactionsPromise)

  return {
    transactions: formattedTransactions,
    totalCount: formattedTransactions.length
  }
}

export function useAllNetworksTransactions(
  coins?: TransactionCoinProps[],
  accounts?: { evm: WalletKeypair; solana: WalletKeypair },
  enabled = true
) {
  return useQuery({
    queryKey: ['allNetworksTransactions', accounts],
    queryFn: () => fetchAllNetworksTransactions({ accounts, coins }),
    enabled: enabled && !!accounts && !!coins,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
