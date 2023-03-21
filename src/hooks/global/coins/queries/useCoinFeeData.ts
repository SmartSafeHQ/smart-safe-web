import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { providers } from 'ethers'
import {
  Transaction,
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL
} from '@solana/web3.js'

import {
  DEFAULT_GAS_LIMIT,
  SATOSHI_PER_BITCOIN
} from '@utils/global/constants/variables'
import { queryClient } from '@lib/reactQuery'
import { FetchCoinValueInUsdResponse } from '@hooks/global/coins/queries/useCoinValueInUsd'

import type { SupportedNetworks } from '@/utils/global/types'

interface BitcoinFeeDataResponse {
  hash: string
  height: number
  high_fee_per_kb: number
  last_fork_hash: string
  last_fork_height: number
  latest_url: string
  low_fee_per_kb: number
  medium_fee_per_kb: number
  name: string
  peer_count: number
  previous_hash: string
  previous_url: string
  time: string
  unconfirmed_count: number
}

interface FetchCoinFeeDataInput {
  rpcUrl: string
  symbol: string
  network: SupportedNetworks
  coinDecimals: number
  walletAddress?: string
}

export interface FetchCoinFeeDataResponse {
  valueInCoin: string
  valueInWei: string
  feeInUSD: string
}

async function fetchCoinFeeData({
  rpcUrl,
  symbol,
  network,
  coinDecimals,
  walletAddress
}: FetchCoinFeeDataInput): Promise<FetchCoinFeeDataResponse> {
  if (network === 'solana' && walletAddress) {
    const rpcEndpoint =
      process.env.NODE_ENV === 'development' ? clusterApiUrl('testnet') : rpcUrl

    const client = new Connection(rpcEndpoint)

    const blockHash = await client.getLatestBlockhash('finalized')

    const feeData = (await new Transaction({
      recentBlockhash: blockHash.blockhash,
      feePayer: new PublicKey(walletAddress)
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

  if (network === 'bitcoin' && walletAddress) {
    const { data } = await axios.get<BitcoinFeeDataResponse>(rpcUrl)

    const feeData = data.medium_fee_per_kb

    const coinValueInUsd =
      await queryClient.ensureQueryData<FetchCoinValueInUsdResponse>({
        queryKey: ['coinValueInUsd', symbol]
      })

    return {
      valueInWei: String(feeData / SATOSHI_PER_BITCOIN),
      valueInCoin: String(feeData / SATOSHI_PER_BITCOIN),
      feeInUSD: String(
        (feeData / SATOSHI_PER_BITCOIN) * coinValueInUsd.valueInUsd
      )
    }
  }

  if (network === 'evm') {
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

  return { valueInWei: '', valueInCoin: '', feeInUSD: '' }
}

export function useCoinFeeData({
  rpcUrl,
  symbol,
  network,
  coinDecimals,
  walletAddress
}: FetchCoinFeeDataInput) {
  return useQuery({
    queryKey: ['coinFeeData', rpcUrl],
    queryFn: () =>
      fetchCoinFeeData({
        rpcUrl,
        coinDecimals,
        network,
        symbol,
        walletAddress
      }),
    staleTime: 1000 * 60 * 1 // 1 minute
  })
}
