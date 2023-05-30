import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'

import { createTransactionProposal } from '@utils/web3/transactions/createTransactionProposal'
import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'
import { queryClient } from '@lib/reactQuery'

export type AddNewOwnerInput = {
  safeAddress: string
  ownerAddress: string
  newThreshold: number
  transactionNonce: number
}

async function addNewOwner({
  safeAddress,
  ownerAddress,
  newThreshold,
  transactionNonce
}: AddNewOwnerInput) {
  if (!safeAddress) {
    throw new Error('safe address required')
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = SmartSafe.connect(safeAddress, signer)

  const addNewOwnerCallEncoded = contract.interface.encodeFunctionData(
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
    data: ethers.keccak256(addNewOwnerCallEncoded),
    signer: signer.address
  }

  const { signedTypedDataHash } = await createTransactionProposal({
    signer,
    transaction: signaturePayload
  })

  const transaction = await contract.getFunction('createTransactionProposal')(
    safeAddress,
    '0',
    addNewOwnerCallEncoded,
    signer.address,
    signedTypedDataHash
  )

  return transaction
}

export function useAddNewOwner() {
  return useMutation({
    mutationKey: ['useAddNewOwner'],
    mutationFn: (input: AddNewOwnerInput) => addNewOwner(input),
    onSuccess: async (_, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['useGetOwners', variables.safeAddress]
      })
      await queryClient.cancelQueries({
        queryKey: ['useGetOwnersCount', variables.safeAddress]
      })
      await queryClient.cancelQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(['useGetOwners', variables.safeAddress], context)
      queryClient.setQueryData(
        ['useGetOwnersCount', variables.safeAddress],
        context
      )
      queryClient.setQueryData(['safeTxQueue', variables.safeAddress], context)
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetOwners', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['useGetOwnersCount', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
    }
  })
}
