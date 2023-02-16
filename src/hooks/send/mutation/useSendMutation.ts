import { providers, Wallet, utils } from 'ethers'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'
import { DEFAULT_GAS_LIMIT } from '@utils/global/constants/variables'

interface SendFunctionInput {
  to: string
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

  const amountToSend = utils.parseEther(input?.amount.toFixed(6))

  const nonce = await wallet.getTransactionCount()

  const gasPrice = await provider.getGasPrice()

  const signedTransaction = await wallet.signTransaction({
    from: wallet.address,
    to: input?.to,
    value: amountToSend,
    nonce,
    chainId: input?.chainId,
    gasLimit: DEFAULT_GAS_LIMIT,
    gasPrice
  })

  const transaction = await provider.sendTransaction(signedTransaction)
  const response = await transaction.wait()

  return {
    transactionHash: response.transactionHash
  }
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
