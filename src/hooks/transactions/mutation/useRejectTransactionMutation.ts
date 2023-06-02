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
import { createTransactionProposal } from '@utils/web3/transactions/createTransactionProposal'
import { TransactionApprovalStatus } from '@hooks/transactions/useTransactionsQueue'

export type RejectTransactionFunctionInput = {
  provider: Eip1193Provider
  chainId: string
  safeAddress: string
  ownerAddress: string
  to: string
  data: string
  amount: number
}

async function rejectTransactionFunction(
  input: RejectTransactionFunctionInput
): Promise<void> {
  if (!input.safeAddress || !input.chainId) {
    throw new Error('safe address and chain id required')
  }

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

  const threshold = await contract.getFunction('threshold')()

  if (Number(threshold) <= 1) {
    const removeRransaction = await contract.getFunction('removeTransaction')()
    await removeRransaction.wait()
    return
  }

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
  )(input.ownerAddress, TransactionApprovalStatus.REJECTED, signedTypedDataHash)

  await transactionSignature.wait()
}

export function useRejectTransactionMutation() {
  return useMutation({
    mutationKey: ['rejectTransaction'],
    mutationFn: (input: RejectTransactionFunctionInput) =>
      rejectTransactionFunction(input),
    onSuccess: (_, variables) => {
      queryClient.cancelQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
      queryClient.cancelQueries({
        queryKey: ['safeTxNonce', variables.safeAddress]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(['safeTxQueue', variables.safeAddress], context)
      queryClient.setQueryData(['safeTxNonce', variables.safeAddress], context)
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['safeTxNonce', variables.safeAddress]
      })
    }
  })
}
