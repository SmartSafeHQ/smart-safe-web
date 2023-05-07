import { useMutation } from '@tanstack/react-query'

export type DeploySafeFunctionInput = {
  name: string
  owners: {
    address: string
    name: string
  }[]
  requiredSignaturesCount: number
}

async function deploySafeFunction(
  input: DeploySafeFunctionInput
): Promise<void> {
  console.log(input)
}

export function useDeploySafeMutation() {
  return useMutation({
    mutationKey: ['deploySafe'],
    mutationFn: (input: DeploySafeFunctionInput) => deploySafeFunction(input)
  })
}
