import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'
import { EIP1193Provider } from '@web3-onboard/core'

import { queryClient } from '@lib/reactQuery'
import { createTransactionProposal } from '@utils/web3/transactions/createTransactionProposal'

import { SmartSafe__factory as SmartSafe } from '@utils/web3/typings/factories/SmartSafe__factory'

export type ChangeThreholdFunctionInput = {
  provider: EIP1193Provider
  safeAddress: string
  newThreshold: number
  transactionNonce: number
}

async function changeThreholdFunction(input: ChangeThreholdFunctionInput) {
  const provider = new ethers.BrowserProvider(input.provider)
  const signer = await provider.getSigner()
  const contract = SmartSafe.connect(input.safeAddress, signer)

  const changeThresholdCallEncoded = contract.interface.encodeFunctionData(
    'changeThreshold',
    [input.newThreshold]
  )

  const chainId = Number((await provider.getNetwork()).chainId)

  const signaturePayload = {
    chainId,
    transactionNonce: input.transactionNonce,
    from: input.safeAddress,
    to: input.safeAddress,
    value: '0',
    data: ethers.keccak256(changeThresholdCallEncoded),
    signer: signer.address
  }

  const { signedTypedDataHash } = await createTransactionProposal({
    signer,
    transaction: signaturePayload
  })

  const transaction = await contract.getFunction('createTransactionProposal')(
    input.safeAddress,
    '0',
    changeThresholdCallEncoded,
    signer.address,
    signedTypedDataHash
  )

  return transaction
}

export function useChangeThreshold() {
  return useMutation({
    mutationKey: ['changeThreshold'],
    mutationFn: (input: ChangeThreholdFunctionInput) =>
      changeThreholdFunction(input),
    onSuccess: async (_, variables) => {
      await queryClient.cancelQueries({
        queryKey: ['safeTxNonce', variables.safeAddress]
      })
      await queryClient.cancelQueries({
        queryKey: ['safeThreshold', variables.safeAddress]
      })
      await queryClient.cancelQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
    },
    onError: async (_, variables, context) => {
      await queryClient.setQueryData(
        ['safeTxNonce', variables.safeAddress],
        context
      )
      await queryClient.setQueryData(
        ['safeThreshold', variables.safeAddress],
        context
      )
      await queryClient.setQueryData(
        ['safeTxQueue', variables.safeAddress],
        context
      )
    },
    onSettled: async (_data, _error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['safeTxNonce', variables.safeAddress]
      })
      await queryClient.invalidateQueries({
        queryKey: ['safeThreshold', variables.safeAddress]
      })
      await queryClient.invalidateQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
    }
  })
}
