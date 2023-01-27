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
  wallet: {
    address: string
  }
}

export interface FetchEndUserWalletsResponse {
  wallets: { address: string }[]
}

async function loginFunction(
  input: LoginFunctionInput
): Promise<LoginFunctionOutput> {
  const response = await Auth.signIn({
    username: input.email,
    password: input.password
  })

  const accessToken = response.signInUserSession.idToken.jwtToken

  tokenverseApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`

  const apiResponse = await tokenverseApi.get<FetchEndUserWalletsResponse>(
    '/widget/wallets'
  )

  const sessionData = response.attributes

  return {
    cognitoId: sessionData.sub,
    name: sessionData.name,
    wallet: apiResponse.data.wallets[0],
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
