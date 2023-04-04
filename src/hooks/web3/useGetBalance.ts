import { useQuery } from '@tanstack/react-query'

import { useContract } from './useContract'
import { BaseContract } from 'ethers'

type Props = {
  customerAddress: string
  networkRpcUrl: string
}

export function useGetBalance<T extends BaseContract>({
  customerAddress,
  networkRpcUrl
}: Props) {
  const { contract } = useContract<T>({
    contractAddress: '0x78487e03f5e30aA3B6F72105cE247dEC80554418',
    contractName: 'IBRL',
    networkRpcUrl
  })

  async function fetchBalance() {
    if (!contract) return

    const balance = (
      await contract.functions.balanceOf(customerAddress)
    ).toString()

    return balance
  }

  return useQuery({
    queryFn: fetchBalance,
    queryKey: ['useGetBalance'],
    enabled: !!contract
  })
}
