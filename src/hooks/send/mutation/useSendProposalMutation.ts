import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'
import { EIP1193Provider } from '@web3-onboard/core'

import { createTransactionProposal } from '@utils/web3/transactions/createTransactionProposal'
import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'
import { queryClient } from '@lib/reactQuery'

interface SendProposalFunctionInput {
  provider: EIP1193Provider
  to: string
  safeAddress: string
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
    input.safeAddress,
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

  const proposal = await smartSafeProxy.getFunction(
    'createTransactionProposal'
  )(
    input.to,
    amountInWei.toString(),
    txData,
    await signer.getAddress(),
    signedTypedDataHash,
    { value: amountInWei.toString() }
  )

  await proposal.wait()

  return {
    transactionHash: proposal.hash
  }
}

export function useSendProposalMutation() {
  return useMutation({
    mutationKey: ['sendProposal'],
    mutationFn: (input: SendProposalFunctionInput) =>
      sendProposalFunction(input),
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
