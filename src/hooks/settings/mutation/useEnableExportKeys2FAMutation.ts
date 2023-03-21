import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'
import { tokenverseApi } from '@lib/axios'

interface EnableExportKeys2FAFunctionInput {
  id: number
  cognitoUser: any
  code: string
}

async function enableExportKeys2FAFunction(
  input: EnableExportKeys2FAFunctionInput
): Promise<void> {
  await Auth.verifyTotpToken(input.cognitoUser, input.code.replace(/\s/g, ''))

  await tokenverseApi.patch(`/widget/settings/enable2fa/${input.id}`, {
    fieldToEnable: 'export-keys'
  })
}

export function useEnableExportKeys2FAMutation() {
  return useMutation({
    mutationKey: ['enableExportKeys2FA'],
    mutationFn: (input: EnableExportKeys2FAFunctionInput) =>
      enableExportKeys2FAFunction(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['enableExportKeys2FA'])
    }
  })
}
