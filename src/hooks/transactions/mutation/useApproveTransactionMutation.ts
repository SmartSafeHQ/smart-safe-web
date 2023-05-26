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

export type ApproveTransactionFunctionInput = {
  provider: Eip1193Provider
  chainId: string
  fromSafe: string
  ownerAddress: string
  to: string
  data: string
  amount: number
}

async function approveTransactionFunction(
  input: ApproveTransactionFunctionInput
): Promise<void> {
  if (!input.fromSafe || !input.chainId) {
    throw new Error('safe address and chain id required')
  }

  console.log(input)

  const safeChain = CHAINS_ATTRIBUTES.find(
    chain => chain.chainId === input.chainId
  )

  if (!safeChain) throw new Error('Chain not supported')

  const provider = new BrowserProvider(input.provider, {
    chainId: parseInt(input.chainId, 16),
    name: safeChain.networkName
  })

  const signer = await provider.getSigner()
  const contract = new Contract(input.fromSafe, SMART_SAFE_ABI, signer)

  const transactionNonce = await contract.getFunction(
    'requiredTransactionNonce'
  )()

  const amountInWei = parseEther(String(input.amount))

  const transaction = {
    chainId: parseInt(input.chainId, 16),
    from: input.fromSafe,
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
}

export function useApproveTransactionMutation() {
  return useMutation({
    mutationKey: ['approveTransaction'],
    mutationFn: (input: ApproveTransactionFunctionInput) =>
      approveTransactionFunction(input),
    onSuccess: async (_, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['safeTxQueue', variables.fromSafe]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(['safeTxQueue', variables.fromSafe], context)
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['safeTxQueue', variables.fromSafe]
      })
    }
  })
}
