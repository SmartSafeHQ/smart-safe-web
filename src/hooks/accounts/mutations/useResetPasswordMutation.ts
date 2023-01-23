import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'

interface ResetPasswordFunctionInput {
  code: string
  email: string
  password: string
}

async function resetPasswordFunction(
  input: ResetPasswordFunctionInput
): Promise<void> {
  await Auth.forgotPasswordSubmit(input.email, input.code, input.password)
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: (input: ResetPasswordFunctionInput) =>
      resetPasswordFunction(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['resetPassword'])
    }
  })
}
