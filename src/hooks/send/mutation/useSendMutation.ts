import { providers, Wallet, utils } from 'ethers'
import {
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
  clusterApiUrl,
  Connection,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL
} from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { DEFAULT_GAS_LIMIT } from '@utils/global/constants/variables'

import type { FetchCoinsBalanceInUsdResponse } from '@hooks/global/coins/queries/useCoinsBalanceInUsd'
import type { FetchCoinPortfolioResponse } from '@hooks/global/coins/queries/useCoinPortfolio'
import type { FetchCoinFeeDataResponse } from '@hooks/global/coins/queries/useCoinFeeData'
import type { SupportedNetworks } from '@/utils/global/types'

interface SendFunctionInput {
  to: string
  fromWalletPrivateKey: string
  amount: number
  chainId: number | null
  symbol: string
  rpcUrl: string
  networkType: SupportedNetworks
}

export interface SendFunctionOutput {
  transactionHash: string
}

async function sendFunction(
  input: SendFunctionInput
): Promise<SendFunctionOutput> {
  if (input.networkType === 'solana') {
    const transaction = new Transaction()

    // we're receiving the private as a string like so: '22, 59, 265, 100'
    // without brackets. This is why we're creating the below string inside `JSON.pase()`
    const privateKeyFromStringToArray: number[] = JSON.parse(
      `[${input.fromWalletPrivateKey}]`
    )
    const privateKeyFromArrayToUin8Array = Uint8Array.from(
      privateKeyFromStringToArray
    )
    const keyPair = Keypair.fromSecretKey(privateKeyFromArrayToUin8Array)

    const transfer = SystemProgram.transfer({
      fromPubkey: keyPair.publicKey,
      toPubkey: new PublicKey(input.to),
      lamports: BigInt(input.amount * LAMPORTS_PER_SOL)
    })

    transaction.add(transfer)

    const rpcEndpoint = input.rpcUrl.includes('test')
      ? clusterApiUrl('testnet')
      : input.rpcUrl

    const client = new Connection(rpcEndpoint)

    const response = await sendAndConfirmTransaction(client, transaction, [
      keyPair
    ])

    return {
      transactionHash: response
    }
  }

  if (input.networkType === 'bitcoin') {
    return { transactionHash: '' }
  }

  if (input.networkType === 'evm') {
    const provider = new providers.JsonRpcProvider(input.rpcUrl)
    const wallet = new Wallet(input.fromWalletPrivateKey, provider)

    const amountToSend = utils.parseEther(input?.amount.toFixed(6))

    const nonce = await wallet.getTransactionCount()

    const gasPrice = await provider.getGasPrice()

    const signedTransaction = await wallet.signTransaction({
      from: wallet.address,
      to: input?.to,
      value: amountToSend,
      nonce,
      chainId: input?.chainId as number,
      gasLimit: DEFAULT_GAS_LIMIT,
      gasPrice
    })

    const transaction = await provider.sendTransaction(signedTransaction)
    const response = await transaction.wait()

    return {
      transactionHash: response.transactionHash
    }
  }

  throw new Error('[SEND TRANSACTION] Unsupported network: ', input.networkType)
}

export function useSendMutation() {
  return useMutation({
    mutationKey: ['send'],
    mutationFn: (input: SendFunctionInput) => sendFunction(input),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(['send'])

      const gasFeeUsed =
        await queryClient.ensureQueryData<FetchCoinFeeDataResponse>([
          'coinFeeData',
          variables.rpcUrl
        ])

      const txAmountWithFee = variables.amount + Number(gasFeeUsed.valueInCoin)

      queryClient.setQueryData<FetchCoinPortfolioResponse>(
        ['coinPortfolio', variables.rpcUrl],
        prevCoin => {
          if (!prevCoin) return

          const newBalance = prevCoin.balance - txAmountWithFee

          return {
            balance: Number(newBalance.toFixed(6)),
            changePercent: prevCoin.changePercent
          }
        }
      )

      queryClient.setQueryData<FetchCoinsBalanceInUsdResponse>(
        ['coinsBalanceInUsd'],
        prevBalance => {
          if (!prevBalance) return

          const prevCoinIndex = prevBalance.coinsBalance.findIndex(
            prevCoin => prevCoin.coinSymbol === variables.symbol
          )

          const prevCoinBalance = prevBalance.coinsBalance[prevCoinIndex]

          const newBalance = prevCoinBalance.amount - txAmountWithFee

          const updattedCoin = {
            coinSymbol: prevCoinBalance.coinSymbol,
            amount: newBalance,
            valueInUsd: prevCoinBalance.valueInUsd
          }

          const updattedCoins = prevBalance.coinsBalance
          updattedCoins[prevCoinIndex] = updattedCoin

          const updattedBalanceAmount =
            (prevBalance.balanceTotal ?? 0) - txAmountWithFee

          return {
            balanceTotal: updattedBalanceAmount,
            coinsBalance: updattedCoins
          }
        }
      )
    }
  })
}
