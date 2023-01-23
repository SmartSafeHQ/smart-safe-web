import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'

interface SignupFunctionInput {
  name: string
  email: string
  password: string
  confirmPassword: string
}

async function signupFunction(input: SignupFunctionInput): Promise<void> {
  await Auth.signUp({
    username: input.email,
    password: input.password,
    attributes: {
      name: input.name
    },
    autoSignIn: {
      enabled: false
    }
  })
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
