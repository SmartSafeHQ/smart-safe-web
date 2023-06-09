import { useMutation } from '@tanstack/react-query'
import {
  BrowserProvider,
  Contract,
  Eip1193Provider,
  keccak256,
  parseEther
} from 'ethers'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'
import { queryClient } from '@lib/reactQuery'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import {
  createTransactionProposal,
  registerScheduleTxUpKeep
} from '@utils/web3/transactions/createTransactionProposal'
import { TransactionApprovalStatus } from '@hooks/transactions/useTransactionsQueue'

export type ApproveTransactionFunctionInput = {
  provider: Eip1193Provider
  chainId: string
  safeAddress: string
  ownerAddress: string
  to: string
  nonce: number
  data: string
  amount: number
  isScheduledApprove: boolean
}

async function approveTransactionFunction(
  input: ApproveTransactionFunctionInput
): Promise<void> {
  const safeChain = CHAINS_ATTRIBUTES.find(
    chain => chain.chainId === input.chainId
  )

  if (!safeChain) throw new Error('Chain not supported')

  const provider = new BrowserProvider(input.provider, {
    chainId: parseInt(input.chainId, 16),
    name: safeChain.networkName
  })

  const signer = await provider.getSigner()
  const contract = new Contract(input.safeAddress, SMART_SAFE_ABI, signer)

  const transactionNonce = await contract.getFunction(
    'requiredTransactionNonce'
  )()

  const amountInWei = parseEther(String(input.amount))

  const transaction = {
    chainId: parseInt(input.chainId, 16),
    from: input.safeAddress,
    to: input.to,
    transactionNonce: Number(transactionNonce),
    value: amountInWei.toString(),
    data: keccak256(input.data)
  }

  const { signedTypedDataHash } = await createTransactionProposal({
    signer,
    transaction
  })

  const transactionSignature = await contract.getFunction(
    'addTransactionSignature'
  )(input.ownerAddress, TransactionApprovalStatus.APPROVED, signedTypedDataHash)

  await transactionSignature.wait()

  if (input.isScheduledApprove) {
    const registerUpKeepResponse = await registerScheduleTxUpKeep({
      signer,
      networkName: safeChain.networkName,
      safeAddress: input.safeAddress,
      ownerAddress: input.ownerAddress,
      txNonce: input.nonce
    })

    await registerUpKeepResponse.wait()
  }
}

export function useApproveTransactionMutation() {
  return useMutation({
    mutationKey: ['approveTransaction'],
    mutationFn: (input: ApproveTransactionFunctionInput) =>
      approveTransactionFunction(input),
    onSuccess: (_, variables) => {
      queryClient.cancelQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
      queryClient.cancelQueries({
        queryKey: ['safeTxNonce', variables.safeAddress]
      })
      queryClient.cancelQueries({
        queryKey: ['safeOwners', variables.safeAddress]
      })
      queryClient.cancelQueries({
        queryKey: ['safeOwnersCount', variables.safeAddress]
      })
      queryClient.cancelQueries({
        queryKey: ['safeThreshold', variables.safeAddress]
      })
      queryClient.cancelQueries({
        queryKey: ['scheduledAutomations', variables.safeAddress]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(['safeTxQueue', variables.safeAddress], context)
      queryClient.setQueryData(['safeTxNonce', variables.safeAddress], context)
      queryClient.setQueryData(['safeOwners', variables.safeAddress], context)
      queryClient.setQueryData(
        ['safeOwnersCount', variables.safeAddress],
        context
      )
      queryClient.setQueryData(
        ['safeThreshold', variables.safeAddress],
        context
      )
      queryClient.setQueryData(
        ['scheduledAutomations', variables.safeAddress],
        context
      )
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['safeTokenBalance', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['safeTxNonce', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['safeOwners', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['safeOwnersCount', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['safeThreshold', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['scheduledAutomations', variables.safeAddress]
      })
    }
  })
}
