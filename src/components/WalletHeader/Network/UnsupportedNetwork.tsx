import { useSetChain } from '@web3-onboard/react'

export function UnsupportedNetwork() {
  const [, setChain] = useSetChain()

  return (
    <button onClick={async () => await setChain({ chainId: '0x1' })}>
      Switch to Ethereum
    </button>
  )
}
