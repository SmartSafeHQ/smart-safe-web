import { ethers } from 'ethers'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { createTransactionProposal } from '@/utils/web3/transactions/createTransactionProposal'

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
}: ChangeThresholdInput): Promise<void> {
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

  const response = await contract.getFunction('createTransactionProposal')(
    safeAddress,
    '0',
    changeThresholdCallEncoded,
    signer.address,
    signedTypedDataHash
  )

  console.log({ response })
}

export function useChangeThreshold() {
  return useMutation({
    mutationKey: ['useChangeThreshold'],
    mutationFn: (input: ChangeThresholdInput) => changeThrehold(input),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [
          'useGetTransactionNonce',
          'useGetThreshold',
          variables.safeAddress
        ]
      })
    }
  })
}
