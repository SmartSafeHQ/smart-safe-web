import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'
import { tokenverseApi } from '@lib/axios'

import {
  fetchAccountWallets,
  FetchAccountWalletsResponse
} from '@hooks/accounts/queries/useAccountWallets'

interface SignIn2FAFunctionInput {
  cognitoUser: any
  code: string
  mfaType?: 'SOFTWARE_TOKEN_MFA' | 'SMS_MFA'
}

interface SignIn2FAFunctionOutput {
  cognitoUser: any
  customer: {
    id: number
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
}

async function signIn2FAFunction({
  cognitoUser,
  code,
  mfaType = 'SOFTWARE_TOKEN_MFA'
}: SignIn2FAFunctionInput): Promise<SignIn2FAFunctionOutput> {
  const response = await Auth.confirmSignIn(cognitoUser, code, mfaType)

  const sessionData = response.signInUserSession.idToken.payload

  const accessToken = response.signInUserSession.idToken.jwtToken

  tokenverseApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`

  const accountWallets =
    await queryClient.ensureQueryData<FetchAccountWalletsResponse>({
      queryKey: ['accountWallets', accessToken],
      queryFn: () => fetchAccountWallets(accessToken)
    })

  const customer = {
    id: accountWallets.id,
    cognitoId: sessionData.sub,
    name: sessionData.name,
    email: sessionData.email,
    wallets: accountWallets
  }

  return {
    customer,
    cognitoUser: response
  }
}

export function useSignIn2FAMutation() {
  return useMutation({
    mutationKey: ['signIn2FA'],
    mutationFn: (input: SignIn2FAFunctionInput) => signIn2FAFunction(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['signIn2FA'])
    }
  })
}
