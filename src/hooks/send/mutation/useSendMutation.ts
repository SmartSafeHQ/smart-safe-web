import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@lib/reactQuery'

interface SendFunctionInput {
  sendWallet: string
  amount: number
  chainId: number
  rpcUrl: string
}

async function sendFunction(input: SendFunctionInput): Promise<void> {
  console.log(input)

  // const customer = await mutateAsync(data)

  // const provider = new ethers.providers.Web3Provider(library)
  //   const signer = provider.getSigner()
  //   const tx = await signer.sendTransaction({
  //     to: destination,
  //     value: ethers.utils.parseEther(amount)
  //   })
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
