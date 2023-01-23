import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'
import { tokenverseApi } from '@lib/axios'

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
  const response = await Auth.signIn({
    username: input.email,
    password: input.password
  })

  console.log(response)

  const accessToken = response.signInUserSession.accessToken.jwtToken

  tokenverseApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`

  const sessionData = response.attributes

  return {
    cognitoId: sessionData.sub,
    name: sessionData.name,
    email: sessionData.email
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
