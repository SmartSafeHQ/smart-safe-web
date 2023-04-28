import { useSetChain } from '@web3-onboard/react'

import { COINS_ATTRIBUTES } from '@/utils/web3/supportedChains'

export function UnsupportedNetwork() {
  const [, setChain] = useSetChain()

  const ethereumChainId = COINS_ATTRIBUTES.find(
    chain => chain.chainId === '0x1'
  )?.chainId

  return (
    <button
      onClick={async () =>
        await setChain({ chainId: ethereumChainId as string })
      }
    >
      Switch to Ethereum
    </button>
  )
}
