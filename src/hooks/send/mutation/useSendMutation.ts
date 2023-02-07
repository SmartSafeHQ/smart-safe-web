import { providers, Wallet, utils, BigNumber } from 'ethers'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'

interface SendFunctionInput {
  to: string
  fromWalletAddress: string
  fromWalletPrivateKey: string
  amount: number
  chainId: number
  rpcUrl: string
}

interface SendFunctionOutput {
  transactionHash: string
}

async function sendFunction(
  input: SendFunctionInput
): Promise<SendFunctionOutput> {
  const provider = new providers.JsonRpcProvider(input.rpcUrl)
  const wallet = new Wallet(input.fromWalletPrivateKey, provider)

  const nonce = await wallet.getTransactionCount()

  const { maxFeePerGas, maxPriorityFeePerGas } = await provider.getFeeData()

  console.log(input)

  const signedTransaction = await wallet.signTransaction({
    from: wallet.address,
    to: input?.to,
    value: BigNumber.from(input?.amount),
    nonce,
    chainId: input?.chainId,
    gasLimit: '21000',
    maxPriorityFeePerGas: maxPriorityFeePerGas || utils.parseUnits('5', 'gwei'),
    maxFeePerGas: maxFeePerGas || utils.parseUnits('5', 'gwei'),
    type: 2
  })

  const transaction = await provider.sendTransaction(signedTransaction)
  const response = await transaction.wait()

  return { transactionHash: response.transactionHash }
}

export function useSendMutation() {
  return useMutation({
    mutationKey: ['send'],
    mutationFn: (input: SendFunctionInput) => sendFunction(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['send'])
    }
  })
}
