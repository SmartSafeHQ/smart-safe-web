import { useQuery } from '@tanstack/react-query'

import { tokenverseApi } from '@lib/axios'
import { FetchEndUserWalletsResponse } from '@utils/global/types'
import { formatWalletAddress } from '@utils/web3Utils'
import type { WalletKeypair } from '@utils/global/types'

interface FetchAccountWalletsInput {
  accessToken: string
}

export interface FetchAccountWalletsResponse {
  id: number
  evm: WalletKeypair & {
    formattedAddress: string
  }
  solana: WalletKeypair & {
    formattedAddress: string
  }
  bitcoin: WalletKeypair & {
    formattedAddress: string
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

  const evmAddresses = apiResponse.data.evm[0]
  const solanaAddresses = apiResponse.data.solana[0]
  const bitcoinAddresses = apiResponse.data.bitcoin[0]

  const evmFormattedAddress = formatWalletAddress({
    walletAddress: evmAddresses.address,
    network: 'evm'
  })
  const solanaFormattedAddress = formatWalletAddress({
    walletAddress: solanaAddresses.address,
    network: 'solana'
  })
  const bitcoinFormattedAddress = formatWalletAddress({
    walletAddress: bitcoinAddresses.address,
    network: 'bitcoin'
  })

  return {
    id: apiResponse.data.id,
    evm: {
      address: evmAddresses.address,
      formattedAddress: evmFormattedAddress,
      privateKey: evmAddresses.privateKey
    },
    solana: {
      address: solanaAddresses.address,
      formattedAddress: solanaFormattedAddress,
      privateKey: solanaAddresses.privateKey
    },
    bitcoin: {
      address: bitcoinAddresses.address,
      formattedAddress: bitcoinFormattedAddress,
      privateKey: bitcoinAddresses.privateKey
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
