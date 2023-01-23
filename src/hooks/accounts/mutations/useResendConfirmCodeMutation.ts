import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'

interface ResendConfirmCodeFunctionInput {
  email: string
}

async function resendConfirmCodeFunction(
  input: ResendConfirmCodeFunctionInput
): Promise<void> {
  console.log(input)
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
