import { providers, Contract, utils } from 'ethers'
import { useMutation } from '@tanstack/react-query'
import { EIP1193Provider } from '@web3-onboard/core'

import { createTransactionProposal } from '@utils/web3/transactions/createTransactionProposal'
import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

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
  const provider = new providers.Web3Provider(input.provider, {
    chainId: parseInt(input.chainId, 16),
    name: input.chainName
  })

  const signer = provider.getSigner()
  const smartSafeProxy = new Contract(input.fromSafe, SMART_SAFE_ABI, signer)
  const transactionNonce = (
    await smartSafeProxy.functions.transactionNonce()
  ).toString()

  const amountInWei = utils.parseEther(String(input.amount))

  const txData = '0x'
  const domain = {
    chainId: parseInt(input.chainId),
    verifyingContract: input.fromSafe
  }

  const transaction = {
    from: input.fromSafe,
    to: input.to,
    transactionNonce: Number(transactionNonce),
    value: amountInWei.toString(),
    data: utils.keccak256(txData)
  }

  const { signedTypedDataHash, typedDataHash } =
    await createTransactionProposal({
      domain,
      signer,
      transaction
    })

  const proposal = await smartSafeProxy.functions.createTransactionProposal(
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
      sendProposalFunction(input)
  })
}
