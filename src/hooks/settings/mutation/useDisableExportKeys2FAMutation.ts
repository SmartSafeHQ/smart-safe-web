import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'

interface DisableExportKeys2FAFunctionInput {
  cognitoUser: any
  code: string
}

async function disableExportKeys2FAFunction(
  input: DisableExportKeys2FAFunctionInput
): Promise<void> {
  await Auth.verifyTotpToken(input.cognitoUser, input.code.replace(/\s/g, ''))

  console.log('disableExportKeys save on db')
}

export function useDisableExportKeys2FAMutation() {
  return useMutation({
    mutationKey: ['disableExportKeys2FA'],
    mutationFn: (input: DisableExportKeys2FAFunctionInput) =>
      disableExportKeys2FAFunction(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['disableExportKeys2FA'])
    }
  })
}
