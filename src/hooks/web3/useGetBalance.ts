import { useQuery } from '@tanstack/react-query'
import { utils } from 'ethers'

import { useContract } from './useContract'

import type { BaseContract } from 'ethers'

type Props = {
  customerAddress: string
  networkRpcUrl: string
  contractAddress: string
  contractName: string
}

export function useGetBalance<T extends BaseContract>({
  customerAddress,
  networkRpcUrl,
  contractAddress,
  contractName
}: Props) {
  const { contract } = useContract<T>({
    contractAddress,
    contractName,
    networkRpcUrl
  })

  async function fetchBalance() {
    if (!contract) return utils.formatEther(0)

    const balance = (
      await contract.functions.balanceOf(customerAddress)
    ).toString()

    return utils.formatEther(balance)
  }

  return useQuery({
    queryFn: fetchBalance,
    queryKey: ['useGetBalance', contractAddress, contractName],
    enabled: true,
    refetchOnWindowFocus: false
  })
}
