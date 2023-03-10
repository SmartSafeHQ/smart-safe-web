import { useQuery } from '@tanstack/react-query'
import { providers } from 'ethers'
import {
  Transaction,
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL
} from '@solana/web3.js'

import { DEFAULT_GAS_LIMIT } from '@utils/global/constants/variables'
import { queryClient } from '@lib/reactQuery'
import { FetchCoinValueInUsdResponse } from '@hooks/global/coins/queries/useCoinValueInUsd'

interface FetchCoinFeeDataInput {
  rpcUrl: string
  symbol: string
  coinDecimals: number
  solanaWallet?: string
}

export interface FetchCoinFeeDataResponse {
  valueInCoin: string
  valueInWei: string
  feeInUSD: string
}

async function fetchCoinFeeData({
  rpcUrl,
  symbol,
  coinDecimals,
  solanaWallet
}: FetchCoinFeeDataInput): Promise<FetchCoinFeeDataResponse> {
  if (symbol === 'sol' && solanaWallet) {
    const rpcEndpoint =
      process.env.NODE_ENV === 'development' ? clusterApiUrl('testnet') : rpcUrl

    const client = new Connection(rpcEndpoint)

    const blockHash = await client.getLatestBlockhash('finalized')

    const feeData = (await new Transaction({
      recentBlockhash: blockHash.blockhash,
      feePayer: new PublicKey(solanaWallet)
    }).getEstimatedFee(client)) as number

    const coinValueInUsd =
      await queryClient.ensureQueryData<FetchCoinValueInUsdResponse>({
        queryKey: ['coinValueInUsd', symbol]
      })

    return {
      valueInWei: String(feeData / LAMPORTS_PER_SOL),
      valueInCoin: String(feeData / LAMPORTS_PER_SOL),
      feeInUSD: String((feeData / LAMPORTS_PER_SOL) * coinValueInUsd.valueInUsd)
    }
  }

  const provider = new providers.JsonRpcProvider(rpcUrl)

  const gasEstimate = await provider.getGasPrice()

  const gasCostInWei = gasEstimate.mul(DEFAULT_GAS_LIMIT)
  const gasCostInCoin = gasCostInWei.toNumber() / 10 ** coinDecimals

  const coinValueInUsd =
    await queryClient.ensureQueryData<FetchCoinValueInUsdResponse>({
      queryKey: ['coinValueInUsd', symbol]
    })

  const feeInUSD = gasCostInCoin * coinValueInUsd.valueInUsd

  return {
    valueInWei: gasCostInWei.toString(),
    valueInCoin: gasCostInCoin.toString(),
    feeInUSD: feeInUSD.toString()
  }
}

export function useCoinFeeData(
  rpcUrl: string,
  symbol: string,
  coinDecimals: number,
  solanaWallet?: string
) {
  return useQuery({
    queryKey: ['coinFeeData', rpcUrl],
    queryFn: () =>
      fetchCoinFeeData({ rpcUrl, coinDecimals, symbol, solanaWallet }),
    staleTime: 1000 * 60 * 1 // 1 minute
  })
}
