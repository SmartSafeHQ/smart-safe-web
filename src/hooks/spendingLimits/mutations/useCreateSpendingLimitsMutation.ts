import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'
import { EIP1193Provider } from '@web3-onboard/core'

import { createTransactionProposal } from '@utils/web3/transactions/createTransactionProposal'
import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'
import { SelectedSpendingLimitsProps } from '@contexts/SpendingLimitsContext'

import { queryClient } from '@lib/reactQuery'
import { formatWalletAddress } from '@utils/web3'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { AUTOMATION_TRIGGERS } from '@utils/web3/transactions/transactionQueue'

interface CreateSpendingLimitsFunctionInput {
  provider: EIP1193Provider
  to: string
  safeAddress: string
  amount: number
  trigger: number
  chainId: string
}

interface CreateSpendingLimitsFunctionOutput {
  transactionHash: string
}

async function createSpendingLimitsFunction(
  input: CreateSpendingLimitsFunctionInput
): Promise<CreateSpendingLimitsFunctionOutput> {
  console.log(input)
  const provider = new ethers.BrowserProvider(input.provider)

  const signer = await provider.getSigner()
  const contract = SmartSafe.connect(input.safeAddress, signer)
  const transactionNonce = (
    await contract.getFunction('transactionNonce')()
  ).toString()

  const amountInWei = ethers.parseEther(String(input.amount))

  const txData = '0x'

  const transaction = {
    chainId: parseInt(input.chainId, 16),
    from: input.safeAddress,
    to: input.to,
    transactionNonce: Number(transactionNonce),
    value: amountInWei.toString(),
    data: ethers.keccak256(txData)
  }

  const { signedTypedDataHash } = await createTransactionProposal({
    signer,
    transaction
  })

  const proposal = await contract.getFunction('createTransactionProposal')(
    input.to,
    amountInWei.toString(),
    txData,
    input.trigger,
    await signer.getAddress(),
    signedTypedDataHash,
    { value: amountInWei.toString() }
  )

  await proposal.wait()

  return {
    transactionHash: proposal.hash
  }
}

export function useCreateSpendingLimitsMutation() {
  return useMutation({
    mutationKey: ['createSpendingLimits'],
    mutationFn: (input: CreateSpendingLimitsFunctionInput) =>
      createSpendingLimitsFunction(input),

    onSuccess: async (data, variables) => {
      queryClient.cancelQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
      queryClient.cancelQueries({
        queryKey: ['safeTxNonce', variables.safeAddress]
      })

      await queryClient.cancelQueries({
        queryKey: ['spendingLimits', variables.safeAddress]
      })

      const checkTokenExists = CHAINS_ATTRIBUTES.find(
        token => token.chainId === variables.chainId
      )

      if (!checkTokenExists) {
        return
      }

      const prev = queryClient.getQueryData<SelectedSpendingLimitsProps[]>([
        'spendingLimits',
        variables.safeAddress
      ])

      const created = {
        coinAmount: variables.amount,
        trigger: {
          id: variables.trigger,
          title:
            AUTOMATION_TRIGGERS.get(variables.trigger)?.title ?? 'unknown type'
        },
        coin: {
          symbol: checkTokenExists.symbol,
          avatar: checkTokenExists.icon,
          address: checkTokenExists.rpcUrl
        },
        wallet: {
          address: variables.to,
          formattedAddress: formatWalletAddress({
            walletAddress: variables.to
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
      queryClient.setQueryData(['safeTxQueue', variables.safeAddress], context)
      queryClient.setQueryData(['safeTxNonce', variables.safeAddress], context)
      queryClient.setQueryData(
        ['spendingLimits', variables.safeAddress],
        context
      )
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['safeTxNonce', variables.safeAddress]
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['spendingLimits', variables.safeAddress]
      // })
    }
  })
}
