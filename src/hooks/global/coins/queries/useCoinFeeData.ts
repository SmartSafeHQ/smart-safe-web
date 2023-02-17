import { useQuery } from '@tanstack/react-query'
import { providers } from 'ethers'

import { DEFAULT_GAS_LIMIT } from '@utils/global/constants/variables'
import { queryClient } from '@lib/reactQuery'
import { FetchCoinValueInUsdResponse } from '@hooks/global/coins/queries/useCoinValueInUsd'

interface FetchCoinFeeDataInput {
  rpcUrl: string
  symbol: string
  coinDecimals: number
}

export interface FetchCoinFeeDataResponse {
  valueInCoin: string
  valueInWei: string
  feeInUSD: string
}

async function fetchCoinFeeData({
  rpcUrl,
  symbol,
  coinDecimals
}: FetchCoinFeeDataInput): Promise<FetchCoinFeeDataResponse> {
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
  coinDecimals: number
) {
  return useQuery({
    queryKey: ['coinFeeData', rpcUrl],
    queryFn: () => fetchCoinFeeData({ rpcUrl, coinDecimals, symbol }),
    staleTime: 1000 * 60 * 1 // 1 minutes
  })
}
