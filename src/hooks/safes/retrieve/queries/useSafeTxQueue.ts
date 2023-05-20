import { useQuery } from '@tanstack/react-query'

import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { OwnerApproveStatus } from '@hooks/transactions/useTransactionsQueue'

interface FetchSafeTxQueueInput {
  address?: string
  chainId?: string
}

export interface FetchSafeSendTxProps {
  nonce: number
  type: 'SEND'
  amount: number
  createdAt: Date
  signatures: { status: OwnerApproveStatus; address: string }[]
  toAddress: string
  toFormattedAddress: string
  txHash: string
  token: {
    symbol: string
    icon: string
  }
}

export interface FetchSafeTxQueueOutput {
  toApprove?: FetchSafeSendTxProps
  pending: FetchSafeSendTxProps[]
}

export async function fetchSafeTxQueue(
  input: FetchSafeTxQueueInput
): Promise<FetchSafeTxQueueOutput> {
  if (!input.address || !input.chainId) {
    throw new Error('wallet address and chain id required')
  }

  const safeChain = CHAINS_ATTRIBUTES.find(
    chain => chain.chainId === input.chainId
  )

  if (!safeChain) throw new Error('Chain not supported')

  return {
    toApprove: {
      nonce: 1,
      type: 'SEND',
      amount: 0.1,
      createdAt: new Date(),
      signatures: [
        {
          address: '0x45e99255C041b69C8e3771b286Cae2EDA5622fA1',
          status: 'approved'
        },
        {
          address: '0x45e99255C041b69G8e3771b286Cae2EDA5622fA1',
          status: 'rejected'
        }
      ],
      toAddress: '0x7f79b85B062a81197196b33EB573D0B98973781A',
      toFormattedAddress: '0x7f7...781A',
      txHash:
        '0x5f195e0bbeb09b1bbf89b3917d57be79a9c20237379fb392af7ac6beb901de4d',
      token: {
        symbol: 'matic',
        icon: '/networks/polygon-logo.svg'
      }
    },
    pending: []
  }
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
