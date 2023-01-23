import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'

interface SignupFunctionInput {
  name: string
  email: string
  password: string
  confirmPassword: string
}

async function signupFunction(input: SignupFunctionInput): Promise<void> {
  console.log(input)
}

export function useSignupMutation() {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: (input: SignupFunctionInput) => signupFunction(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['signup'])
    }
  })
}
