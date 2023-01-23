import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'

interface ForgotPasswordFunctionInput {
  email: string
}

async function forgotPasswordFunction(
  input: ForgotPasswordFunctionInput
): Promise<void> {
  console.log(input)
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: (input: ForgotPasswordFunctionInput) =>
      forgotPasswordFunction(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['forgotPassword'])
    }
  })
}
