import { ethers } from 'ethers'
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
  symbol: string
  tokenContractAddress: string
  safeAddress: string
  amount: number
  intervalInSeconds: number
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
  const chain = CHAINS_ATTRIBUTES.find(chain => chain.chainId === input.chainId)

  if (!chain) throw new Error('Chain not supported')

  const provider = new ethers.BrowserProvider(input.provider, {
    chainId: parseInt(chain.chainId, 16),
    name: chain.name
  })

  const signer = await provider.getSigner()
  const contract = SmartSafe.connect(input.safeAddress, signer)

  const transactionNonce = (
    await contract.getFunction('transactionNonce')()
  ).toString()

  const IERC20 = ['function transfer(address _to, uint256 _amount)']

  const amountInWei = ethers.parseEther(String(input.amount))

  const tokenData =
    input.symbol === chain.symbol
      ? {
          toAddress: input.to,
          amountInWei,
          data: '0x'
        }
      : {
          toAddress: input.tokenContractAddress,
          amountInWei: 0,
          data: new ethers.Interface(IERC20).encodeFunctionData('transfer', [
            input.to,
            amountInWei
          ])
        }

  const transaction = {
    chainId: parseInt(chain.chainId, 16),
    from: input.safeAddress,
    to: tokenData.toAddress,
    transactionNonce: Number(transactionNonce),
    value: tokenData.amountInWei.toString(),
    data: ethers.keccak256(tokenData.data)
  }

  const { signedTypedDataHash } = await createTransactionProposal({
    signer,
    transaction
  })

  const proposal = await contract.getFunction('createTransactionProposal')(
    tokenData.toAddress,
    tokenData.amountInWei.toString(),
    tokenData.data,
    input.intervalInSeconds,
    await signer.getAddress(),
    signedTypedDataHash,
    { value: tokenData.amountInWei.toString() }
  )

  await proposal.wait()

  if (input.threshold === 1) {
    const registerUpKeepResponse = await registerScheduleTxUpKeep({
      signer,
      symbol: input.symbol,
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
