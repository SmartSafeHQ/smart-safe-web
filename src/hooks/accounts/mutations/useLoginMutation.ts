import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'

interface LoginFunctionInput {
  email: string
  password: string
}

interface LoginFunctionOutput {
  cognitoId: string
  name: string
  email: string
}

async function loginFunction(
  input: LoginFunctionInput
): Promise<LoginFunctionOutput> {
  console.log(input)

  return {
    cognitoId: 'mock',
    name: 'mock',
    email: 'mock'
  }
}

export function useLoginMutation() {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (input: LoginFunctionInput) => loginFunction(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['login'])
    }
  })
}
