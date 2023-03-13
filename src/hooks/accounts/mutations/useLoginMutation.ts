import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'
import { tokenverseApi } from '@lib/axios'

import { MobileBridgeCommunication } from '@decorators/MobileBridgeCommunication'

import {
  fetchAccountWallets,
  FetchAccountWalletsResponse
} from '@hooks/accounts/queries/useAccountWallets'

interface LoginFunctionInput {
  email: string
  password: string
}

interface LoginFunctionOutput {
  cognitoUser: any
  customer?: {
    cognitoId: string
    enabled2fa: boolean
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
}

async function loginFunction(
  input: LoginFunctionInput
): Promise<LoginFunctionOutput> {
  const response = await Auth.signIn({
    username: input.email,
    password: input.password
  })

  MobileBridgeCommunication.initialize().saveBiometric()

  let customer

  if (response.preferredMFA === 'NOMFA') {
    const accessToken = response.signInUserSession.idToken.jwtToken

    tokenverseApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    const accountWallets =
      await queryClient.ensureQueryData<FetchAccountWalletsResponse>({
        queryKey: ['accountWallets', accessToken],
        queryFn: () => fetchAccountWallets(accessToken)
      })

    const sessionData = response.attributes

    customer = {
      cognitoId: sessionData.sub,
      enabled2fa: false,
      name: sessionData.name,
      email: sessionData.email,
      wallets: accountWallets
    }
  }

  return {
    customer,
    cognitoUser: response
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
