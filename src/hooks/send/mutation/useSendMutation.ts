import { useMutation } from '@tanstack/react-query'
// import { providers, Wallet, BigNumber, utils } from 'ethers'

import { queryClient } from '@lib/reactQuery'

interface SendFunctionInput {
  to: string
  fromWalletAddress: string
  fromWalletPrivateKey: string
  amount: number
  chainId: number
  rpcUrl: string
}

async function sendFunction(input: SendFunctionInput): Promise<void> {
  // const provider = new providers.JsonRpcProvider(input.rpcUrl)
  // const userWallet = new Wallet(input.fromWalletAddress, provider)
  // const nonce = await userWallet.getTransactionCount()
  // const { maxFeePerGas, maxPriorityFeePerGas } = await provider.getFeeData()
  // const signedTransaction = await userWallet.signTransaction({
  //   from: userWallet.address,
  //   to: input?.to,
  //   value: BigNumber.from(input?.amount),
  //   nonce,
  //   chainId: input?.chainId,
  //   gasLimit: '21000',
  //   maxPriorityFeePerGas: maxPriorityFeePerGas || utils.parseUnits('5', 'gwei'),
  //   maxFeePerGas: maxFeePerGas || utils.parseUnits('5', 'gwei'),
  //   type: 2
  // })
  // await provider.sendTransaction(signedTransaction)

  console.log({ chainId: input.chainId })
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
