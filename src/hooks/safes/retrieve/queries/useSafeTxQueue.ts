import { useQuery } from '@tanstack/react-query'

import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'

interface FetchSafeTxQueueInput {
  address?: string
  chainId?: string
}

export interface FetchSafeSendTxQueueOutput {
  nonce: number
  type: 'SEND'
  amount: number
  createdAt: Date
  signatures: string[]
  toAddress: string
  txHash: string
  token: {
    symbol: string
    icon: string
  }
}

export async function fetchSafeTxQueue(
  input: FetchSafeTxQueueInput
): Promise<FetchSafeSendTxQueueOutput[]> {
  if (!input.address || !input.chainId) {
    throw new Error('wallet address and chain id required')
  }

  const safeChain = CHAINS_ATTRIBUTES.find(
    chain => chain.chainId === input.chainId
  )

  if (!safeChain) throw new Error('Chain not supported')

  return [
    {
      nonce: 1,
      type: 'SEND',
      amount: 1,
      createdAt: new Date(),
      signatures: ['0x701dFD1CB16664CdF1e47988a3fAf979F48e3d71'],
      toAddress: '0x7f79b85B062a81197196b33EB573D0B98973781A',
      txHash:
        '0x5f195e0bbeb09b1bbf89b3917d57be79a9c20237379fb392af7ac6beb901de4d',
      token: {
        symbol: 'matic',
        icon: '/networks/polygon-logo.svg'
      }
    }
  ]
}

export function useSafeTxQueue(
  address?: string,
  chainId?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['safeTxQueue', address],
    queryFn: () => fetchSafeTxQueue({ address, chainId }),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
