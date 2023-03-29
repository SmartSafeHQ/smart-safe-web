import { useQuery } from '@tanstack/react-query'

import { useContract } from './useContract'

import type { IBRL } from '@/utils/web3/typings'

type Props = {
  customerAddress: string
  networkRpcUrl: string
}

export function useGetBalance({ customerAddress, networkRpcUrl }: Props) {
  const { contract } = useContract<IBRL>({
    contractAddress: '0xfC28Ef7C5ff2f5EA55E70E3944041718Df42A371',
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
