import { useMutation } from '@tanstack/react-query'

import { SelectedSpendingLimitsProps } from '@contexts/SpendingLimitsContext'

import { queryClient } from '@lib/reactQuery'
import { ChainSettings } from '@utils/web3/chains/supportedChains'
import { formatWalletAddress } from '@utils/web3'

interface CreateSpendingLimitsFunctionInput {
  safeAddress: string
  contactAddress: string
  coin: ChainSettings
  amount: number
  fromDate: string
  recipientName?: string
}

interface CreateSpendingLimitsFunctionOutput {
  index: number
}

export interface CreateSpendingLimitsApiResponse {
  id: number
}

async function createSpendingLimitsFunction(
  input: CreateSpendingLimitsFunctionInput
): Promise<CreateSpendingLimitsFunctionOutput> {
  console.log(input)
  // const provider = new providers.JsonRpcProvider(CHAINS_ATTRIBUTES[0].rpcUrl)
  // const signer = new Wallet(input.customerWalletPrivateKey, provider)

  // const contract = new Contract(
  //   input.address,
  //   ACCOUNT_ABSTRACTION_ABI,
  //   signer
  // )

  // const fromDateInSeconds = dayjs(input.fromDate).unix()
  // const amountInWei = ethers.utils
  //   .parseUnits(String(input.amount), 18)
  //   .toString()

  // await contract.functions.addAuthorizedUser({
  //   userAddress: input.contactAddress,
  //   tokenAddress: input.coin.contractAddress,
  //   tokenAmount: amountInWei,
  //   startDate: fromDateInSeconds
  // })

  // const totalAuthorizations = await contract.functions.totalAuthorizations()

  // const createdAuthIndex = +totalAuthorizations.toString()

  return { index: 0 }
}

export function useCreateSpendingLimitsMutation() {
  return useMutation({
    mutationKey: ['createSpendingLimits'],
    mutationFn: (input: CreateSpendingLimitsFunctionInput) =>
      createSpendingLimitsFunction(input),
    onSuccess: async (data, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['spendingLimits', variables.safeAddress]
      })

      const prev = queryClient.getQueryData<SelectedSpendingLimitsProps[]>([
        'spendingLimits',
        variables.safeAddress
      ])

      const created = {
        index: data.index,
        recipientName: variables.recipientName,
        coinAmount: variables.amount,
        dateFrom: variables.fromDate,
        coin: {
          symbol: variables.coin.symbol,
          avatar: variables.coin.icon,
          address: variables.coin.rpcUrl
        },
        wallet: {
          address: variables.contactAddress,
          formattedAddress: formatWalletAddress({
            walletAddress: variables.contactAddress
          })
        }
      }

      queryClient.setQueryData<SelectedSpendingLimitsProps[]>(
        ['spendingLimits', variables.safeAddress],
        () => {
          const updattedLimits = [...(prev ?? []), created]

          return updattedLimits
        }
      )

      return prev
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        ['spendingLimits', variables.safeAddress],
        context
      )
    },
    onSettled: (_data, _error) => {
      // queryClient.invalidateQueries({
      //   queryKey: ['spendingLimits', variables.safeAddress]
      // })
    }
  })
}
