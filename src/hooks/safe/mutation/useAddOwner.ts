import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'
import { EIP1193Provider } from '@web3-onboard/core'

import { createTransactionProposal } from '@utils/web3/transactions/createTransactionProposal'
import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'
import { queryClient } from '@lib/reactQuery'

export type AddOwnerFunctionInput = {
  provider: EIP1193Provider
  safeAddress: string
  ownerAddress: string
  newThreshold: number
  transactionNonce: number
}

async function addOwnerFunction(input: AddOwnerFunctionInput) {
  const provider = new ethers.BrowserProvider(input.provider)
  const signer = await provider.getSigner()
  const contract = SmartSafe.connect(input.safeAddress, signer)

  const addOwnerCallEncoded = contract.interface.encodeFunctionData(
    'addNewOwner',
    [input.ownerAddress, input.newThreshold]
  )

  const chainId = Number((await provider.getNetwork()).chainId)

  const signaturePayload = {
    chainId,
    transactionNonce: input.transactionNonce,
    from: input.safeAddress,
    to: input.safeAddress,
    value: '0',
    data: ethers.keccak256(addOwnerCallEncoded),
    signer: signer.address
  }

  const { signedTypedDataHash } = await createTransactionProposal({
    signer,
    transaction: signaturePayload
  })

  const transaction = await contract.getFunction('createTransactionProposal')(
    input.safeAddress,
    '0',
    addOwnerCallEncoded,
    signer.address,
    signedTypedDataHash
  )

  return transaction
}

export function useAddOwner() {
  return useMutation({
    mutationKey: ['addOwner'],
    mutationFn: (input: AddOwnerFunctionInput) => addOwnerFunction(input),
    onSuccess: async (_, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['safeOwners', variables.safeAddress]
      })
      await queryClient.cancelQueries({
        queryKey: ['safeOwnersCount', variables.safeAddress]
      })
      await queryClient.cancelQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
      await queryClient.cancelQueries({
        queryKey: ['safeTxNonce', variables.safeAddress]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(['safeOwners', variables.safeAddress], context)
      queryClient.setQueryData(
        ['safeOwnersCount', variables.safeAddress],
        context
      )
      queryClient.setQueryData(['safeTxQueue', variables.safeAddress], context)
      queryClient.setQueryData(['safeTxNonce', variables.safeAddress], context)
    },
    onSettled: async (_data, _error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['safeOwners', variables.safeAddress]
      })
      await queryClient.invalidateQueries({
        queryKey: ['safeOwnersCount', variables.safeAddress]
      })
      await queryClient.invalidateQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
      await queryClient.invalidateQueries({
        queryKey: ['safeTxNonce', variables.safeAddress]
      })
    }
  })
}
