import { useQuery } from '@tanstack/react-query'
import { Contract, providers, utils } from 'ethers'

import SMART_SAFE_FACTORY_PROXY_ABI from '@utils/web3/ABIs/SmartSafeProxyFactory.json'
import { SMART_SAFE_FACTORY_CHAINS_ADRESSES } from '@utils/web3/ABIs/adresses'

interface FetchDeploySmartSafeFeeInput {
  rpcUrl: string
  chainSymbol: string
  owners: string[]
}

export interface FetchDeploySmartSafeFeeResponse {
  valueInCoin: string
}

async function fetchDeploySmartSafeProxyFee({
  rpcUrl,
  chainSymbol,
  owners
}: FetchDeploySmartSafeFeeInput): Promise<FetchDeploySmartSafeFeeResponse> {
  const smartSafeProxyFactoryAddress =
    SMART_SAFE_FACTORY_CHAINS_ADRESSES.get(chainSymbol)

  if (!smartSafeProxyFactoryAddress) throw new Error('Chain not supported')

  const provider = new providers.JsonRpcProvider(rpcUrl)

  const contract = new Contract(
    smartSafeProxyFactoryAddress,
    SMART_SAFE_FACTORY_PROXY_ABI,
    provider
  )

  const gasPrice = await provider.getGasPrice()

  const estimatedGas = await contract.estimateGas.deploySmartSafeProxy(
    owners,
    1
  )

  const gasFee = estimatedGas.mul(gasPrice)
  const gasCostInCoin = utils.formatUnits(gasFee, 'ether')

  return {
    valueInCoin: gasCostInCoin.toString()
  }
}

export function useDeploySmartSafeProxyFee(
  rpcUrl: string,
  chainSymbol: string,
  owners: string[],
  enabled = true
) {
  return useQuery({
    queryKey: ['deploySmartSafeFee', rpcUrl],
    queryFn: () =>
      fetchDeploySmartSafeProxyFee({ rpcUrl, chainSymbol, owners }),
    enabled,
    staleTime: 1000 * 60 * 1 // 1 minute
  })
}
