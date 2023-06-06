import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'
import { EIP1193Provider } from '@web3-onboard/core'

import { createTransactionProposal } from '@utils/web3/transactions/createTransactionProposal'

import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'

export type RemoveOwnerFunctionInput = {
  provider: EIP1193Provider
  safeAddress: string
  removeOwnerAddress: string
  transactionNonce: number
}

async function removeOwnerFunction(
  input: RemoveOwnerFunctionInput
): Promise<void> {
  const provider = new ethers.BrowserProvider(input.provider)
  const signer = await provider.getSigner()
  const contract = SmartSafe.connect(input.safeAddress, signer)

  const removeOwnerCallEncoded = contract.interface.encodeFunctionData(
    'removeOwner',
    [input.removeOwnerAddress, '']
  )

  const chainId = Number((await provider.getNetwork()).chainId)

  const signaturePayload = {
    chainId,
    transactionNonce: input.transactionNonce,
    from: input.safeAddress,
    to: input.safeAddress,
    value: '0',
    data: ethers.keccak256(removeOwnerCallEncoded),
    signer: signer.address
  }

  const { signedTypedDataHash } = await createTransactionProposal({
    signer,
    transaction: signaturePayload
  })

  const response = await contract.getFunction('createTransactionProposal')(
    input.safeAddress,
    '0',
    removeOwnerCallEncoded,
    0,
    signer.address,
    signedTypedDataHash
  )

  console.log({ response })
}

export function useRemoveOwner() {
  return useMutation({
    mutationKey: ['removeOwner'],
    mutationFn: (input: RemoveOwnerFunctionInput) => removeOwnerFunction(input)
  })
}
