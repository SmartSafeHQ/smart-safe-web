import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'

import { createTransactionProposal } from '@/utils/web3/transactions/createTransactionProposal'

import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'

export type RemoveOwnerInput = {
  safeAddress: string
  removeOwnerAddress: string
  transactionNonce: number
}

async function removeOwner({
  safeAddress,
  removeOwnerAddress,
  transactionNonce
}: RemoveOwnerInput): Promise<void> {
  if (!safeAddress) {
    throw new Error('safe address required')
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = SmartSafe.connect(safeAddress, signer)

  const removeOwnerCallEncoded = contract.interface.encodeFunctionData(
    'removeOwner',
    [removeOwnerAddress, '']
  )

  const chainId = Number((await provider.getNetwork()).chainId)

  const signaturePayload = {
    chainId,
    transactionNonce,
    from: safeAddress,
    to: safeAddress,
    value: '0',
    data: ethers.keccak256(removeOwnerCallEncoded),
    signer: signer.address
  }

  const { signedTypedDataHash } = await createTransactionProposal({
    signer,
    transaction: signaturePayload
  })

  const response = await contract.getFunction('createTransactionProposal')(
    safeAddress,
    '0',
    removeOwnerCallEncoded,
    signer.address,
    signedTypedDataHash
  )

  console.log({ response })
}

export function useRemoveOwner() {
  return useMutation({
    mutationKey: ['useRemoveOwner'],
    mutationFn: (input: RemoveOwnerInput) => removeOwner(input)
  })
}
