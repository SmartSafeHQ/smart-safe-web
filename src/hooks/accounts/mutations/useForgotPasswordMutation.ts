import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'

interface ForgotPasswordFunctionInput {
  email: string
}

async function forgotPasswordFunction(
  input: ForgotPasswordFunctionInput
): Promise<void> {
  await Auth.forgotPassword(input.email)
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
