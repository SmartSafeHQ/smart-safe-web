import { useQuery } from '@tanstack/react-query'

import { useContract } from './useContract'

import type { IBRL } from '@utils/web3/typings'

type Props = {
  customerAddress: string
  networkRpcUrl: string
}

export function useGetBalance({ customerAddress, networkRpcUrl }: Props) {
  const { contract } = useContract<IBRL>({
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
