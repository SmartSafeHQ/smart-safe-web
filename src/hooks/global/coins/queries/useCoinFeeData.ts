import { useQuery } from '@tanstack/react-query'
import { providers } from 'ethers'

import { DEFAULT_GAS_LIMIT } from '@utils/global/constants/variables'

interface FetchCoinFeeDataInput {
  rpcUrl: string
  coinDecimals: number
}

interface FetchCoinFeeDataResponse {
  valueInCoin: string
  valueInWei: string
}

async function fetchCoinFeeData({
  rpcUrl,
  coinDecimals
}: FetchCoinFeeDataInput): Promise<FetchCoinFeeDataResponse> {
  const provider = new providers.JsonRpcProvider(rpcUrl)

  const gasEstimate = await provider.getGasPrice()

  const gasCostInWei = gasEstimate.mul(DEFAULT_GAS_LIMIT)
  const gasCostInCoin = gasCostInWei.toNumber() / coinDecimals

  return {
    valueInWei: gasCostInWei.toString(),
    valueInCoin: gasCostInCoin.toString()
  }
}

export function useCoinFeeData(rpcUrl: string, coinDecimals: number) {
  return useQuery({
    queryKey: ['coinFeeData', rpcUrl],
    queryFn: () => fetchCoinFeeData({ rpcUrl, coinDecimals }),
    staleTime: 1000 * 60 * 1 // 1 minutes
  })
}
