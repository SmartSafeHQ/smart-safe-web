import { useQuery } from '@tanstack/react-query'

import { tokenverseApi } from '@lib/axios'
import { FetchEndUserWalletsResponse } from '@utils/global/types'

interface FetchAccountWalletsInput {
  accessToken: string
}

export interface FetchAccountWalletsResponse {
  id: number
  evm: {
    address: string
    privateKey: string
  }
  solana: {
    address: string
    privateKey: string
  }
  bitcoin: {
    address: string
    privateKey: string
  }
}

export async function fetchAccountWallets({
  accessToken
}: FetchAccountWalletsInput): Promise<FetchAccountWalletsResponse> {
  if (accessToken) {
    throw new Error('User not authenticated')
  }

  const apiResponse = await tokenverseApi.get<FetchEndUserWalletsResponse>(
    '/widget/wallets?privateKey=true'
  )

  return {
    id: apiResponse.data.id,
    evm: {
      address: apiResponse.data.evm[0].address,
      privateKey: apiResponse.data.evm[0].privateKey
    },
    solana: {
      address: apiResponse.data.solana[0].address,
      privateKey: apiResponse.data.solana[0].privateKey
    },
    bitcoin: {
      address: apiResponse.data.bitcoin[0].address,
      privateKey: apiResponse.data.bitcoin[0].privateKey
    }
  }
}

export function useAccountWallets(accessToken: string) {
  return useQuery({
    queryKey: ['accountWallets', accessToken],
    queryFn: () => fetchAccountWallets({ accessToken }),
    staleTime: 1000 * 60 * 10 // 10 minutes
  })
}
