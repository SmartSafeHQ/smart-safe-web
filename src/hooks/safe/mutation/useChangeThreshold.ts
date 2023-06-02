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
    onSuccess: (_, variables) => {
      queryClient.cancelQueries({
        queryKey: ['safeTxNonce', variables.safeAddress]
      })
      queryClient.cancelQueries({
        queryKey: ['safeThreshold', variables.safeAddress]
      })
      queryClient.cancelQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(['safeTxNonce', variables.safeAddress], context)
      queryClient.setQueryData(
        ['safeThreshold', variables.safeAddress],
        context
      )
      queryClient.setQueryData(['safeTxQueue', variables.safeAddress], context)
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['safeTxNonce', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['safeThreshold', variables.safeAddress]
      })
      queryClient.invalidateQueries({
        queryKey: ['safeTxQueue', variables.safeAddress]
      })
    }
  })
}
