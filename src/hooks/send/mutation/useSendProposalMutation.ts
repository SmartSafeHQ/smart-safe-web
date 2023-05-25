import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'
import { EIP1193Provider } from '@web3-onboard/core'

import { createTransactionProposal } from '@utils/web3/transactions/createTransactionProposal'
import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'
import { queryClient } from '@lib/reactQuery'

interface SendProposalFunctionInput {
  provider: EIP1193Provider
  to: string
  fromSafe: string
  fromWallet: string
  amount: number
  chainId: string
  chainName: string
  symbol: string
  rpcUrl: string
}

export interface SendProposalFunctionOutput {
  transactionHash: string
}

async function sendProposalFunction(
  input: SendProposalFunctionInput
): Promise<SendProposalFunctionOutput> {
  const provider = new ethers.BrowserProvider(input.provider, {
    chainId: parseInt(input.chainId, 16),
    name: input.chainName
  })

  const signer = await provider.getSigner()
  const smartSafeProxy = new ethers.Contract(
    input.fromSafe,
    SMART_SAFE_ABI,
    signer
  )
  const transactionNonce = (
    await smartSafeProxy.getFunction('transactionNonce')()
  ).toString()

  const amountInWei = ethers.parseEther(String(input.amount))

  const txData = '0x'

  const transaction = {
    chainId: parseInt(input.chainId, 16),
    from: input.fromSafe,
    to: input.to,
    transactionNonce: Number(transactionNonce),
    value: amountInWei.toString(),
    data: ethers.keccak256(txData)
  }

  const { signedTypedDataHash, typedDataHash } =
    await createTransactionProposal({
      signer,
      transaction
    })

  const proposal = await smartSafeProxy.getFunction(
    'createTransactionProposal'
  )(
    input.to,
    amountInWei.toString(),
    txData,
    await signer.getAddress(),
    typedDataHash,
    signedTypedDataHash
  )

  return {
    transactionHash: proposal.hash
  }
}

export function useSendProposalMutation() {
  return useMutation({
    mutationKey: ['sendProposal'],
    mutationFn: (input: SendProposalFunctionInput) =>
      sendProposalFunction(input),
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
