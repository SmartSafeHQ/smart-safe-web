import { BrowserProvider, ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'
import { EIP1193Provider } from '@web3-onboard/core'

import {
  createTransactionProposal,
  registerScheduleTxUpKeep
} from '@utils/web3/transactions/createTransactionProposal'
import { queryClient } from '@lib/reactQuery'
import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'

interface CreateAutomationFunctionInput {
  provider: EIP1193Provider
  to: string
  safeAddress: string
  amount: number
  trigger: number
  chainId: string
  ownerAddress: string
  threshold: number
}

interface CreateAutomationFunctionOutput {
  transactionHash: string
}

async function createAutomationFunction(
  input: CreateAutomationFunctionInput
): Promise<CreateAutomationFunctionOutput> {
  const safeChain = CHAINS_ATTRIBUTES.find(
    chain => chain.chainId === input.chainId
  )

  if (!safeChain) throw new Error('Chain not supported')

  const provider = new BrowserProvider(input.provider, {
    chainId: parseInt(input.chainId, 16),
    name: safeChain.networkName
  })

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

  if (input.threshold === 1) {
    const registerUpKeepResponse = await registerScheduleTxUpKeep({
      signer,
      symbol: safeChain.symbol,
      safeAddress: input.safeAddress,
      ownerAddress: input.ownerAddress,
      txNonce: +transactionNonce
    })

    await registerUpKeepResponse.wait()
  }

  return {
    transactionHash: proposal.hash
  }
}

export function useCreateAutomationMutation() {
  return useMutation({
    mutationKey: ['createScheduledAutomation'],
    mutationFn: (input: CreateAutomationFunctionInput) =>
      createAutomationFunction(input),

    onSuccess: async (data, variables) => {
      queryClient.cancelQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
      queryClient.cancelQueries({
        queryKey: ['safeTxNonce', variables.safeAddress]
      })

      queryClient.cancelQueries({
        queryKey: ['scheduledAutomations', variables.safeAddress]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(['safeTxQueue', variables.safeAddress], context)
      queryClient.setQueryData(['safeTxNonce', variables.safeAddress], context)
      queryClient.setQueryData(
        ['scheduledAutomations', variables.safeAddress],
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
      queryClient.invalidateQueries({
        queryKey: ['scheduledAutomations', variables.safeAddress]
      })
    }
  })
}
