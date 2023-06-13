import { useMutation } from '@tanstack/react-query'

interface DeleteAutomationFunctionInput {
  safeAddress: string
  customerWalletPrivateKey: string
}

async function deleteAutomationFunction(
  input: DeleteAutomationFunctionInput
): Promise<void> {
  console.log(input)
}

export function useDeleteAutomationMutation() {
  return useMutation({
    mutationKey: ['deleteScheduledAutomation'],
    mutationFn: (input: DeleteAutomationFunctionInput) =>
      deleteAutomationFunction(input)
  })
}
