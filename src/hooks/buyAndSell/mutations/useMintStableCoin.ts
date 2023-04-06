import { useMutation } from '@tanstack/react-query'

import { tokenverseApi } from '@/lib/axios'
// import { queryClient } from '@/lib/reactQuery'

export interface MintStableCoinPayload {
  amount: string
  userAddress: string
  contractAddress: string
}

async function mintStableCoin({
  amount,
  userAddress,
  contractAddress
}: MintStableCoinPayload): Promise<string> {
  const { data: transactionHash } = await tokenverseApi.post(
    '/widget/mintStableCoin',
    {
      amount,
      userAddress,
      contractAddress
    }
  )

  return transactionHash
}

export function useMintStableCoin() {
  return useMutation({
    mutationKey: ['useMintStableCoin'],
    mutationFn: mintStableCoin
    // onSuccess(data, variables, context) {
    //   queryClient.setQueryData(['coinsBalanceInUsd'])
    // },
  })
}
