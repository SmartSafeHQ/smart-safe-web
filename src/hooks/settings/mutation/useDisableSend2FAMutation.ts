import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'

interface DisableSend2FAFunctionInput {
  cognitoUser: any
  code: string
}

async function disableSend2FAFunction(
  input: DisableSend2FAFunctionInput
): Promise<void> {
  await Auth.verifyTotpToken(input.cognitoUser, input.code.replace(/\s/g, ''))

  console.log('disableSend2FA on db')
}

export function useDisableSend2FAMutation() {
  return useMutation({
    mutationKey: ['disableSend2FA'],
    mutationFn: (input: DisableSend2FAFunctionInput) =>
      disableSend2FAFunction(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['disableSend2FA'])
    }
  })
}
