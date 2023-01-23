import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'

interface SignupActivateFunctionInput {
  code: string
  email: string
}

async function signupActivateFunction(
  input: SignupActivateFunctionInput
): Promise<void> {
  await Auth.confirmSignUp(input.email, input.code)
}

export function useSignupActivateMutation() {
  return useMutation({
    mutationKey: ['signupActivate'],
    mutationFn: (input: SignupActivateFunctionInput) =>
      signupActivateFunction(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['signupActivate'])
    }
  })
}
