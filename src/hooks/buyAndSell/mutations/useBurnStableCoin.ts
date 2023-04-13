import { utils } from 'ethers'
import { useMutation } from '@tanstack/react-query'

import { tokenverseApi } from '@/lib/axios'
import { queryClient } from '@/lib/reactQuery'

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
    mutationFn: burnStableCoin,
    onSuccess: async (_, variables) => {
      const currentStableCoinAmount = await queryClient.ensureQueryData<string>(
        {
          queryKey: [
            'useGetBalance',
            variables.userAddress,
            variables.contractAddress
          ]
        }
      )

      const formattedSoldAmount = +utils.formatEther(variables.amount)

      queryClient.setQueryData<string>(
        ['useGetBalance', variables.userAddress, variables.contractAddress],
        prevBalance => {
          if (!prevBalance) {
            const updattedAmount =
              +currentStableCoinAmount - formattedSoldAmount

            return String(updattedAmount)
          }

          const updattedAmount = +prevBalance - formattedSoldAmount

          return String(updattedAmount)
        }
      )
    }
  })
}
