import { useQuery } from '@tanstack/react-query'
import { Contract, providers, utils } from 'ethers'

import IBRL_ABI from '@utils/web3/ABIs/IBRL.json'
import IEUR_ABI from '@utils/web3/ABIs/IEUR.json'

export const abis = new Map([
  ['ibrl', IBRL_ABI],
  ['ieur', IEUR_ABI]
])

interface FetchBalanceProps {
  networkRpcUrl: string
  contractAddress: string
  contractName: string
  customerAddress?: string
}

async function fetchBalance({
  networkRpcUrl,
  contractAddress,
  contractName,
  customerAddress
}: FetchBalanceProps) {
  if (!customerAddress) {
    throw new Error('account is required')
  }

  const ABI = abis.get(contractName.toLowerCase())

  if (!ABI) {
    throw new Error('stable coin not valid')
  }

  const provider = new providers.JsonRpcProvider(networkRpcUrl)
  const contract = new Contract(contractAddress, ABI, provider)

  const balance = await contract.functions.balanceOf(customerAddress)

  return utils.formatEther(balance.toString())
}

interface UseGetBalanceProps {
  customerAddress?: string
  networkRpcUrl: string
  contractAddress: string
  contractName: string
}

export function useGetBalance({
  customerAddress,
  networkRpcUrl,
  contractAddress,
  contractName
}: UseGetBalanceProps) {
  return useQuery({
    queryKey: ['useGetBalance', customerAddress, contractAddress],
    queryFn: () =>
      fetchBalance({
        networkRpcUrl,
        contractAddress,
        contractName,
        customerAddress
      }),
    enabled: !!customerAddress,
    refetchOnWindowFocus: false
  })
}
