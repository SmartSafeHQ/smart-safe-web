import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { createTransactionProposal } from '@utils/web3/transactions/createTransactionProposal'

import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'

export type ChangeThresholdInput = {
  safeAddress: string
  newThreshold: number
  transactionNonce: number
}

async function changeThrehold({
  safeAddress,
  newThreshold,
  transactionNonce
}: ChangeThresholdInput) {
  if (!safeAddress) {
    throw new Error('safe address required')
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = SmartSafe.connect(safeAddress, signer)

  const changeThresholdCallEncoded = contract.interface.encodeFunctionData(
    'changeThreshold',
    [newThreshold]
  )

  const chainId = Number((await provider.getNetwork()).chainId)

  const signaturePayload = {
    chainId,
    transactionNonce,
    from: safeAddress,
    to: safeAddress,
    value: '0',
    data: ethers.keccak256(changeThresholdCallEncoded),
    signer: signer.address
  }

  const { signedTypedDataHash } = await createTransactionProposal({
    signer,
    transaction: signaturePayload
  })

  const transaction = await contract.getFunction('createTransactionProposal')(
    safeAddress,
    '0',
    changeThresholdCallEncoded,
    signer.address,
    signedTypedDataHash
  )

  return transaction
}

export function useChangeThreshold() {
  return useMutation({
    mutationKey: ['useChangeThreshold'],
    mutationFn: (input: ChangeThresholdInput) => changeThrehold(input),
    onSuccess: async (_, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['useGetTransactionNonce', variables.safeAddress]
      })
      await queryClient.cancelQueries({
        queryKey: ['useGetThreshold', variables.safeAddress]
      })
      await queryClient.cancelQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        ['useGetTransactionNonce', variables.safeAddress],
        context
      )
      queryClient.setQueryData(
        ['useGetThreshold', variables.safeAddress],
        context
      )
      queryClient.setQueryData(['safeTxQueue', variables.safeAddress], context)
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetTransactionNonce', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['useGetThreshold', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
    }
  })
}
