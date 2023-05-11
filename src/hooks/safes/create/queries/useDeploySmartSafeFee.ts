import { useQuery } from '@tanstack/react-query'
import { Contract, providers, utils } from 'ethers'

import SMART_SAFE_FACTORY_ABI from '@utils/web3/ABIs/SmartSafeFactory.json'
import { SMART_SAFE_FACTORY_ADDRESS } from '@utils/web3/ABIs/adresses'

interface FetchDeploySmartSafeFeeInput {
  rpcUrl: string
  owners: string[]
}

export interface FetchDeploySmartSafeFeeResponse {
  valueInCoin: string
}

async function fetchDeploySmartSafeFee({
  rpcUrl,
  owners
}: FetchDeploySmartSafeFeeInput): Promise<FetchDeploySmartSafeFeeResponse> {
  const provider = new providers.JsonRpcProvider(rpcUrl)

  const contract = new Contract(
    SMART_SAFE_FACTORY_ADDRESS,
    SMART_SAFE_FACTORY_ABI,
    provider
  )

  const ownersAdressesList = owners.map(owner => owner)

  const gasPrice = await provider.getGasPrice()

  const estimatedGas = await contract.estimateGas.deploySmartSafe(
    ownersAdressesList,
    1
  )

  const gasFee = estimatedGas.mul(gasPrice)
  const gasCostInCoin = utils.formatUnits(gasFee, 'ether')

  return {
    valueInCoin: gasCostInCoin.toString()
  }
}

export function useDeploySmartSafeFee(
  rpcUrl: string,
  owners: string[],
  enabled = true
) {
  return useQuery({
    queryKey: ['deploySmartSafeFee', rpcUrl],
    queryFn: () => fetchDeploySmartSafeFee({ rpcUrl, owners }),
    enabled,
    staleTime: 1000 * 60 * 1 // 1 minute
  })
}
