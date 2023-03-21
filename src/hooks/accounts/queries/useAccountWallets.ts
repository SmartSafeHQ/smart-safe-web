import { useQuery } from '@tanstack/react-query'

import { tokenverseApi } from '@lib/axios'
import { FetchEndUserWalletsResponse } from '@utils/global/types'
import { formatWalletAddress } from '@utils/web3Utils'

interface FetchAccountWalletsInput {
  accessToken: string
}

export interface FetchAccountWalletsResponse {
  id: number
  evm: {
    address: string
    formattedAddress: string
    privateKey: string
  }
  solana: {
    address: string
    formattedAddress: string
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

  const evmInfos = apiResponse.data.evm[0]
  const solanaInfos = apiResponse.data.solana[0]

  const evmFormattedAddress = formatWalletAddress(evmInfos.address)
  const solanaFormattedAddress = formatWalletAddress(solanaInfos.address, 4)

  return {
    id: apiResponse.data.id,
    evm: {
      address: evmInfos.address,
      formattedAddress: evmFormattedAddress,
      privateKey: evmInfos.privateKey
    },
    solana: {
      address: solanaInfos.address,
      formattedAddress: solanaFormattedAddress,
      privateKey: solanaInfos.privateKey
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
