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

export type RejectTransactionFunctionInput = {
  provider: Eip1193Provider
  chainId: string
  fromSafe: string
  ownerAddress: string
  to: string
  data: string
  amount: number
}

async function rejectTransactionFunction(
  input: RejectTransactionFunctionInput
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

  const domain = {
    chainId: parseInt(input.chainId, 16),
    verifyingContract: input.fromSafe
  }

  const transaction = {
    from: input.fromSafe,
    to: input.to,
    transactionNonce: Number(transactionNonce),
    value: amountInWei.toString(),
    data: keccak256(input.data)
  }

  const { signedTypedDataHash, typedDataHash } =
    await createTransactionProposal({
      domain,
      signer,
      transaction
    })

  await contract.getFunction('addTransactionSignature')(
    input.ownerAddress,
    false,
    typedDataHash,
    signedTypedDataHash
  )
}

export function useRejectTransactionMutation() {
  return useMutation({
    mutationKey: ['rejectTransaction'],
    mutationFn: (input: RejectTransactionFunctionInput) =>
      rejectTransactionFunction(input),
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
