import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'
import { tokenverseApi } from '@lib/axios'

import { MobileBridgeCommunication } from '@decorators/MobileBridgeCommunication'

import {
  fetchAccountWallets,
  FetchAccountWalletsResponse
} from '@hooks/accounts/queries/useAccountWallets'

import type { WalletKeypair } from '@/utils/global/types'

interface LoginFunctionInput {
  email: string
  password: string
}

interface LoginFunctionOutput {
  cognitoUser: any
  customer?: {
    id: number
    cognitoId: string
    name: string
    email: string
    wallets: {
      evm: WalletKeypair
      solana: WalletKeypair
      bitcoin: WalletKeypair
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

  if (response.signInUserSession) {
    const accessToken = response.signInUserSession.idToken.jwtToken

    tokenverseApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    const accountWallets =
      await queryClient.ensureQueryData<FetchAccountWalletsResponse>({
        queryKey: ['accountWallets', accessToken],
        queryFn: () => fetchAccountWallets(accessToken)
      })

    const sessionData = response.attributes

    customer = {
      id: accountWallets.id,
      cognitoId: sessionData.sub,
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
