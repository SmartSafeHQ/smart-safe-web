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
  wallets: {
    evm: {
      address: string
      privateKey: string
    }
    solana: {
      address: string
      privateKey: string
    }
  }
}

export interface FetchEndUserWalletsResponse {
  evm: { address: string; privateKey: string }[]
  solana: { address: string; privateKey: string }[]
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
    '/widget/wallets?privateKey=true'
  )

  const sessionData = response.attributes

  return {
    cognitoId: sessionData.sub,
    name: sessionData.name,
    wallets: {
      evm: {
        address: apiResponse.data.evm[0].address,
        privateKey: apiResponse.data.evm[0].privateKey
      },
      solana: {
        address: apiResponse.data.solana[0].address,
        privateKey: apiResponse.data.solana[0].privateKey
      }
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
