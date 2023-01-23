import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { queryClient } from '@lib/reactQuery'

interface ResendConfirmCodeFunctionInput {
  email: string
}

async function resendConfirmCodeFunction(
  input: ResendConfirmCodeFunctionInput
): Promise<void> {
  await Auth.resendSignUp(input.email)
}

export function useResendConfirmCodeMutation() {
  return useMutation({
    mutationKey: ['resendConfirmCode'],
    mutationFn: (input: ResendConfirmCodeFunctionInput) =>
      resendConfirmCodeFunction(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['resendConfirmCode'])
    }
  })
}
