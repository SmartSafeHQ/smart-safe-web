import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'
import { tokenverseApi } from '@lib/axios'

interface EnableSend2FAFunctionInput {
  id: number
  cognitoUser: any
  code: string
}

async function enableSend2FAFunction(
  input: EnableSend2FAFunctionInput
): Promise<void> {
  await Auth.verifyTotpToken(input.cognitoUser, input.code.replace(/\s/g, ''))

  await tokenverseApi.patch(`/widget/settings/enable2fa/${input.id}`, {
    fieldToEnable: 'send'
  })
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
