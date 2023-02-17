import { providers, Wallet, utils } from 'ethers'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { DEFAULT_GAS_LIMIT } from '@utils/global/constants/variables'
import { FetchCoinsBalanceInUsdResponse } from '@hooks/global/coins/queries/useCoinsBalanceInUsd'
import { FetchCoinPortfolioResponse } from '@hooks/global/coins/queries/useCoinPortfolio'
import { FetchCoinFeeDataResponse } from '@hooks/global/coins/queries/useCoinFeeData'

interface SendFunctionInput {
  to: string
  fromWalletPrivateKey: string
  amount: number
  chainId: number
  symbol: string
  rpcUrl: string
}

interface SendFunctionOutput {
  transactionHash: string
}

async function sendFunction(
  input: SendFunctionInput
): Promise<SendFunctionOutput> {
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
    chainId: input?.chainId,
    gasLimit: DEFAULT_GAS_LIMIT,
    gasPrice
  })

  const transaction = await provider.sendTransaction(signedTransaction)
  const response = await transaction.wait()

  return {
    transactionHash: response.transactionHash
  }
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
