import { useMutation } from '@tanstack/react-query'

import { smartSafeApi } from '@lib/axios'
import { queryClient } from '@lib/reactQuery'

export type DeploySafeFunctionInput = {
  safeName: string
  smartSafeProxyAddress: string
  deployWalletAddress: string
  chainId: string
  owners: {
    address: string
    name: string
  }[]
}

interface DeploySafeFunctionOutput {
  safeAddress: string
}

export interface DeploySafeApiResponse {
  id: string
}

async function saveSmartSafeProxyData(
  input: DeploySafeFunctionInput
): Promise<DeploySafeFunctionOutput> {
  await smartSafeApi.post<DeploySafeApiResponse>('/safe', {
    safeName: input.safeName,
    safeAddress: input.smartSafeProxyAddress,
    safeNetwork: input.chainId,
    owners: input.owners
  })

  return { safeAddress: input.smartSafeProxyAddress }
}

export function useSaveSmartSafeProxyData() {
  return useMutation({
    mutationKey: ['saveSmartSafeProxyData'],
    mutationFn: (input: DeploySafeFunctionInput) =>
      saveSmartSafeProxyData(input),
    onSuccess: async (_, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['addressSafes', variables.deployWalletAddress]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        ['addressSafes', variables.deployWalletAddress],
        context
      )
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['addressSafes', variables.deployWalletAddress]
      })
    }
  })
}
