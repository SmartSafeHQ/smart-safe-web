import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

interface EnableSignIn2FAFunctionInput {
  cognitoUser: any
  code: string
}

async function enableSignIn2FAFunction(
  input: EnableSignIn2FAFunctionInput
): Promise<void> {
  await Auth.verifyTotpToken(input.cognitoUser, input.code.replace(/\s/g, ''))
  Auth.setPreferredMFA(input.cognitoUser, 'TOTP')
}

export function useEnableSignIn2FAMutation() {
  return useMutation({
    mutationKey: ['enableSignIn2FA'],
    mutationFn: (input: EnableSignIn2FAFunctionInput) =>
      enableSignIn2FAFunction(input)
  })
}
