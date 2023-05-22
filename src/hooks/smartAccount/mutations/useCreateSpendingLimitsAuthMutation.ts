import { useMutation } from '@tanstack/react-query'

import { SelectedSpendingLimitsProps } from '@contexts/smart-account/SpendingLimitsAuthContext'

import { queryClient } from '@lib/reactQuery'
import { ChainSettings } from '@utils/web3/chains/supportedChains'
import { formatWalletAddress } from '@utils/web3'

interface CreateSpendingLimitsAuthFunctionInput {
  smartAccountAddress: string
  customerWalletPrivateKey: string
  contactAddress: string
  coin: ChainSettings
  amount: number
  fromDate: Date
  recipientName?: string
}

interface CreateSpendingLimitsAuthFunctionOutput {
  index: number
}

export interface CreateSpendingLimitsAuthApiResponse {
  id: number
}

async function createSpendingLimitsAuthFunction(
  input: CreateSpendingLimitsAuthFunctionInput
): Promise<CreateSpendingLimitsAuthFunctionOutput> {
  console.log(input)
  // const provider = new providers.JsonRpcProvider(CHAINS_ATTRIBUTES[0].rpcUrl)
  // const signer = new Wallet(input.customerWalletPrivateKey, provider)

  // const contract = new Contract(
  //   input.smartAccountAddress,
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

export function useCreateWithdrawalAuthMutation() {
  return useMutation({
    mutationKey: ['createSpendingLimitsAuth'],
    mutationFn: (input: CreateSpendingLimitsAuthFunctionInput) =>
      createSpendingLimitsAuthFunction(input),
    onSuccess: async (data, variables) => {
      await queryClient.cancelQueries({
        queryKey: [
          'smartAccountSpendingLimitsAuths',
          variables.smartAccountAddress
        ]
      })

      const prevAuths = queryClient.getQueryData<SelectedSpendingLimitsProps[]>(
        ['smartAccountSpendingLimitsAuths', variables.smartAccountAddress]
      )

      const createdAuth = {
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
        ['smartAccountSpendingLimitsAuths', variables.smartAccountAddress],
        () => {
          prevAuths?.push(createdAuth)

          return prevAuths
        }
      )

      return prevAuths
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        ['smartAccountSpendingLimitsAuths', variables.smartAccountAddress],
        context
      )
    },
    onSettled: (_data, _error, variables) => {
      const timeout = setTimeout(
        () =>
          queryClient.invalidateQueries({
            queryKey: [
              'smartAccountSpendingLimitsAuths',
              variables.smartAccountAddress
            ]
          }),
        5000
      )

      clearTimeout(timeout)
    }
  })
}
