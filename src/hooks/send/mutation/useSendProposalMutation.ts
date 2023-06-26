import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'
import { EIP1193Provider } from '@web3-onboard/core'

import { createTransactionProposal } from '@utils/web3/transactions/createTransactionProposal'
import { queryClient } from '@lib/reactQuery'
import { CHAINS_ATTRIBUTES } from '@utils/web3/chains/supportedChains'
import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'

interface SendProposalFunctionInput {
  provider: EIP1193Provider
  to: string
  safeAddress: string
  tokenContractAddress: string
  symbol: string
  amount: number
  chainId: string
}

export interface SendProposalFunctionOutput {
  transactionHash: string
}

async function sendProposalFunction(
  input: SendProposalFunctionInput
): Promise<SendProposalFunctionOutput> {
  const chain = CHAINS_ATTRIBUTES.find(chain => input.chainId === chain.chainId)

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
    0,
    await signer.getAddress(),
    signedTypedDataHash,
    { value: tokenData.amountInWei.toString() }
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
