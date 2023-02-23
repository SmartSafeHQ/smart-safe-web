import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'
import { tokenverseApi } from '@lib/axios'

import { MobileBridgeCommunication } from '@/decorators/MobileBridgeCommunication'

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
    privateKey: string
  }
}

export interface FetchEndUserWalletsResponse {
  wallets: { address: string; private_key: string }[]
}

async function loginFunction(
  input: LoginFunctionInput
): Promise<LoginFunctionOutput> {
  const response = await Auth.signIn({
    username: input.email,
    password: input.password
  })

  MobileBridgeCommunication.initialize().saveBiometric()

  const accessToken = response.signInUserSession.idToken.jwtToken

  tokenverseApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`

  const apiResponse = await tokenverseApi.get<FetchEndUserWalletsResponse>(
    '/widget/wallets'
  )

  const sessionData = response.attributes

  return {
    cognitoId: sessionData.sub,
    name: sessionData.name,
    wallet: {
      address: apiResponse.data.wallets[0].address,
      privateKey: apiResponse.data.wallets[0].private_key
    },
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
