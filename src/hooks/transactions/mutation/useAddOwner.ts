import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'

import { createTransactionProposal } from '@utils/web3/transactions/createTransactionProposal'
import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'
import { queryClient } from '@lib/reactQuery'

export type AddOwnerFunctionInput = {
  safeAddress: string
  ownerAddress: string
  newThreshold: number
  transactionNonce: number
}

async function addOwnerFunction({
  safeAddress,
  ownerAddress,
  newThreshold,
  transactionNonce
}: AddOwnerFunctionInput) {
  if (!safeAddress) {
    throw new Error('safe address required')
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = SmartSafe.connect(safeAddress, signer)

  const addOwnerCallEncoded = contract.interface.encodeFunctionData(
    'addNewOwner',
    [ownerAddress, newThreshold]
  )

  const chainId = Number((await provider.getNetwork()).chainId)

  const signaturePayload = {
    chainId,
    transactionNonce,
    from: safeAddress,
    to: safeAddress,
    value: '0',
    data: ethers.keccak256(addOwnerCallEncoded),
    signer: signer.address
  }

  const { signedTypedDataHash } = await createTransactionProposal({
    signer,
    transaction: signaturePayload
  })

  const transaction = await contract.getFunction('createTransactionProposal')(
    safeAddress,
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
