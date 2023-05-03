import { useMutation } from '@tanstack/react-query'
import { Contract, Wallet, ethers, providers } from 'ethers'
import dayjs from 'dayjs'

import { queryClient } from '@lib/reactQuery'

import { SelectedWithdrawalProps } from '@contexts/SAWithdrawalAuthContext'

import { formatWalletAddress } from '@utils/web3Utils'
import ACCOUNT_ABSTRACTION_ABI from '@utils/web3/ABIs/AccountAbstraction.json'
import {
  STABLE_COINS,
  StableCoinsProps
} from '@utils/global/coins/stableCoinsConfig'

interface CreateWithdrawalAuthFunctionInput {
  smartAccountAddress: string
  customerWalletPrivateKey: string
  contactAddress: string
  coin: StableCoinsProps
  amount: number
  fromDate: Date
  recipientName?: string
}

interface CreateWithdrawalAuthFunctionOutput {
  index: number
}

export interface CreateWithdrawalAuthApiResponse {
  id: number
}

async function createWithdrawalAuthFunction(
  input: CreateWithdrawalAuthFunctionInput
): Promise<CreateWithdrawalAuthFunctionOutput> {
  const provider = new providers.JsonRpcProvider(STABLE_COINS[0].rpcUrl)
  const signer = new Wallet(input.customerWalletPrivateKey, provider)

  const contract = new Contract(
    input.smartAccountAddress,
    ACCOUNT_ABSTRACTION_ABI,
    signer
  )

  const fromDateInSeconds = dayjs(input.fromDate).unix()
  const amountInWei = ethers.utils
    .parseUnits(String(input.amount), input.coin.decimals)
    .toString()

  await contract.functions.addAuthorizedUser({
    userAddress: input.contactAddress,
    tokenAddress: input.coin.contractAddress,
    tokenAmount: amountInWei,
    startDate: fromDateInSeconds
  })

  const totalAuthorizations = await contract.functions.totalAuthorizations()

  const createdAuthIndex = +totalAuthorizations.toString()

  return { index: createdAuthIndex }
}

export function useCreateWithdrawalAuthMutation() {
  return useMutation({
    mutationKey: ['createWithdrawalAuth'],
    mutationFn: (input: CreateWithdrawalAuthFunctionInput) =>
      createWithdrawalAuthFunction(input),
    onSuccess: async (data, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['smartAccountWithdrawalAuths', variables.smartAccountAddress]
      })

      const prevAuths = queryClient.getQueryData<SelectedWithdrawalProps[]>([
        'smartAccountWithdrawalAuths',
        variables.smartAccountAddress
      ])

      const createdAuth = {
        index: data.index,
        recipientName: variables.recipientName,
        coinAmount: variables.amount,
        dateFrom: variables.fromDate,
        coin: {
          symbol: variables.coin.symbol,
          avatar: variables.coin.avatar,
          address: variables.coin.contractAddress
        },
        wallet: {
          address: variables.contactAddress,
          formattedAddress: formatWalletAddress({
            network: 'evm',
            walletAddress: variables.contactAddress
          })
        }
      }

      queryClient.setQueryData<SelectedWithdrawalProps[]>(
        ['smartAccountWithdrawalAuths', variables.smartAccountAddress],
        () => {
          prevAuths?.push(createdAuth)

          return prevAuths
        }
      )

      return prevAuths
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        ['smartAccountWithdrawalAuths', variables.smartAccountAddress],
        context
      )
    },
    onSettled: (_data, _error, variables) => {
      const timeout = setTimeout(
        () =>
          queryClient.invalidateQueries({
            queryKey: [
              'smartAccountWithdrawalAuths',
              variables.smartAccountAddress
            ]
          }),
        5000
      )

      clearTimeout(timeout)
    }
  })
}
