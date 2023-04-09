import { useMutation } from '@tanstack/react-query'

import { tokenverseApi } from '@/lib/axios'
// import { queryClient } from '@/lib/reactQuery'

export interface MintStableCoinPayload {
  amount: string
  userAddress: string
  contractAddress: string
}

async function burnStableCoin({
  amount,
  userAddress,
  contractAddress
}: MintStableCoinPayload): Promise<string> {
  const { data: transactionHash } = await tokenverseApi.post(
    '/widget/burnStableCoin',
    {
      amount,
      userAddress,
      contractAddress
    }
  )

  return transactionHash
}

export function useBurnStableCoin() {
  return useMutation({
    mutationKey: ['useBurnStableCoin'],
    mutationFn: burnStableCoin
    // onSuccess(data, variables, context) {
    //   queryClient.setQueryData(['coinsBalanceInUsd'])
    // },
  })
}
