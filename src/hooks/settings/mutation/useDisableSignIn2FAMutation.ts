import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

interface DisableSignIn2FAFunctionInput {
  cognitoUser: any
  code: string
}

async function disableSignIn2FAFunction(
  input: DisableSignIn2FAFunctionInput
): Promise<void> {
  await Auth.verifyTotpToken(input.cognitoUser, input.code.replace(/\s/g, ''))
  Auth.setPreferredMFA(input.cognitoUser, 'NOMFA')
}

export function useDisableSignIn2FAMutation() {
  return useMutation({
    mutationKey: ['disableSignIn2FA'],
    mutationFn: (input: DisableSignIn2FAFunctionInput) =>
      disableSignIn2FAFunction(input)
  })
}
