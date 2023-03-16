import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'

interface EnableSend2FAFunctionInput {
  cognitoUser: any
  code: string
}

async function enableSend2FAFunction(
  input: EnableSend2FAFunctionInput
): Promise<void> {
  await Auth.verifyTotpToken(input.cognitoUser, input.code.replace(/\s/g, ''))

  console.log('enableSend2FA on db')
}

export function useEnableSend2FAMutation() {
  return useMutation({
    mutationKey: ['enableSend2FA'],
    mutationFn: (input: EnableSend2FAFunctionInput) =>
      enableSend2FAFunction(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['enableSend2FA'])
    }
  })
}
