import { providers, Contract, utils } from 'ethers'
import { useMutation } from '@tanstack/react-query'
import { EIP1193Provider } from '@web3-onboard/core'

import SMART_SAFE_ABI from '@utils/web3/ABIs/SmartSafe.json'

interface SendFunctionInput {
  provider: EIP1193Provider
  to: string
  fromSafe: string
  fromWallet: string
  amount: number
  chainId: string
  chainName: string
  symbol: string
  rpcUrl: string
}

export interface SendFunctionOutput {
  transactionHash: string
}

async function sendFunction(
  input: SendFunctionInput
): Promise<SendFunctionOutput> {
  const provider = new providers.Web3Provider(input.provider, {
    chainId: parseInt(input.chainId, 16),
    name: input.chainName
  })

  const signer = provider.getSigner()
  const contract = new Contract(input.fromSafe, SMART_SAFE_ABI, signer)
  const amountInWei = utils.parseEther(String(input.amount))
  const txData = '0x'

  const proposal = await contract.functions.createTransactionProposal(
    input.fromWallet,
    input.to,
    amountInWei,
    txData,
    signer._address
  )

  console.log(proposal)

  // const provider = new providers.JsonRpcProvider(input.rpcUrl)
  // const wallet = new Wallet(input.fromSafe, provider)

  // const amountToSend = utils.parseEther(input?.amount.toFixed(6))

  // const nonce = await wallet.getTransactionCount()

  // const gasPrice = await provider.getGasPrice()

  // const signedTransaction = await wallet.signTransaction({
  //   from: wallet.address,
  //   to: input?.to,
  //   value: amountToSend,
  //   nonce,
  //   chainId: +input?.chainId,
  //   gasLimit: 21000,
  //   gasPrice
  // })

  // const transaction = await provider.sendTransaction(signedTransaction)
  // const response = await transaction.wait()

  return {
    transactionHash: 'response.transactionHash'
  }
}

export function useSendMutation() {
  return useMutation({
    mutationKey: ['send'],
    mutationFn: (input: SendFunctionInput) => sendFunction(input)
  })
}
