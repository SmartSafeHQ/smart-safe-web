import { useMutation } from '@tanstack/react-query'

import { smartSafeApi } from '@lib/axios'

export type DeploySafeFunctionInput = {
  safeName: string
  safeNetwork: string
  requiredSignaturesCount: number
  owners: {
    address: string
    name: string
  }[]
}

interface DeploySafeFunctionOutput {
  id: string
}

export interface DeploySafeApiResponse {
  id: string
}

async function deploySafeFunction(
  input: DeploySafeFunctionInput
): Promise<DeploySafeFunctionOutput> {
  const response = await smartSafeApi.post<DeploySafeApiResponse>('/safe', {
    safeName: input.safeName,
    safeAddress: '0x701dfd1cb16664cdf1e47988a3faf979f48e3d71',
    safeNetwork: input.safeNetwork,
    owners: input.owners
  })

  return { id: response.data.id }
}

export function useDeploySafeMutation() {
  return useMutation({
    mutationKey: ['deploySafe'],
    mutationFn: (input: DeploySafeFunctionInput) => deploySafeFunction(input)
  })
}
