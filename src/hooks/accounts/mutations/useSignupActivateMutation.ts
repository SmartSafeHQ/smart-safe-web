import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'

interface SignupActivateFunctionInput {
  code: string
  email: string
}

async function signupActivateFunction(
  input: SignupActivateFunctionInput
): Promise<void> {
  console.log(input)
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
